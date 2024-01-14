'use client'

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import EventCard from './EventCard'
import DroppableSpace, { DroppableData } from './DroppableSpace'
import DraggableEvent, { DraggableClassEventData } from './DraggableEvent'
import { useEffect, useMemo, useState } from 'react'
import { useScheduleContext } from '@/context/ScheduleContext'
import { cn } from '@/lib/utils'
import { TIME_ARRAY } from '../(lib)/times'
import { useRef } from 'react'
import {
  createInitialSchedule,
  createOccupyList,
  getMonday,
  getWeekRange,
  isToday,
} from '@/utils/scheduleHelpers'
import { Info } from 'luxon'
import EditClassModal from './EditClassModal'
import { ClassEvent } from '@prisma/client'
import { useElementSize, useWindowSize } from 'usehooks-ts'
import { createCalendarModifier } from '@/utils/dndModifier'
import LoadingPage from '@/components/ui/loading-page'
import { getSession } from '@/actions/session'
import { getClass } from '@/actions/schedule'
import { AnimatePresence } from 'framer-motion'

const WeekSchedule = () => {
  const { width: windowWidth } = useWindowSize()
  const [calendarRef, { width }] = useElementSize()
  const timeWidth = 100 //w-24
  const dayColumnWidth = (width - timeWidth) / 7
  const minDayColumnWidth = 100
  const [openEdit, setOpenEdit] = useState(false)
  const { classEvents, updateClassEvents, currentDay } = useScheduleContext()
  const [activeId, setActiveId] = useState<null | string>(null)

  const renderCounter = useRef(0)
  renderCounter.current = renderCounter.current + 1
  console.log(renderCounter)

  const [previousClassEvent, setPreviousClassEvent] =
    useState<null | ClassEvent>(null)
  const [activeClassEvent, setActiveClassEvent] = useState<null | ClassEvent>(
    null
  )
  const snapToCalendarModifier = createCalendarModifier(dayColumnWidth, 20)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    const activeEvent = classEvents.find(
      (classEvent) => classEvent.id === event.active.id
    )

    if (activeEvent) setActiveClassEvent(activeEvent)
  }

  //Date handles
  const monday = getMonday(currentDay)

  const totalWeekdays = Array.from(Array(7).keys())

  const displayWeekdays = useMemo(
    () =>
      Array.from(Array(7)).map((item, index) => {
        const newDate = new Date(monday)
        newDate.setDate(newDate.getDate() + index)
        console.log(newDate)
        return newDate
      }),
    [monday]
  )

  useEffect(() => {
    const updateClass = async () => {
      const session = await getSession()
      const weekRange = getWeekRange(currentDay)
      const newClassEvents = await getClass(session?.userId || -1, weekRange)
      updateClassEvents(newClassEvents.payload)
    }
    updateClass()
  }, [currentDay])

  const schedule = useMemo(() => {
    return createInitialSchedule(classEvents, 7)
  }, [classEvents])

  const occupyList = useMemo(() => {
    return createOccupyList(classEvents, 7)
  }, [classEvents])

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    const { id } = active

    const {
      weekdayIndex: prevWeekdayIndex,
      timeIndex: prevTimeIndex,
      duration,
    } = active.data.current as DraggableClassEventData

    const { weekdayIndex: newWeekdayIndex, timeIndex: newTimeIndex } = over
      ?.data.current as DroppableData

    if (prevWeekdayIndex == newWeekdayIndex && prevTimeIndex == newTimeIndex)
      return

    for (let i = newTimeIndex; i <= newTimeIndex + duration; i++) {
      if (occupyList[newWeekdayIndex][i].id === id) continue
      if (occupyList[newWeekdayIndex][i].isOccupied) return
    }

    const newclassEvents = classEvents.map((classEvent) => {
      if (classEvent.id === id) {
        setPreviousClassEvent(structuredClone(classEvent))
        classEvent.startDate.setDate(monday.getDate() + newWeekdayIndex)
        classEvent.startDate.setHours(newTimeIndex)
        return classEvent
      } else {
        return classEvent
      }
    })

    updateClassEvents(newclassEvents)
    setActiveId(null)
    setOpenEdit(true)
  }

  const revertClassEventUpdate = () => {
    const newClassEvents = classEvents.map((classEvent) => {
      if (classEvent.id === previousClassEvent?.id) {
        return previousClassEvent
      } else {
        return classEvent
      }
    })
    updateClassEvents(newClassEvents)
  }

  if (windowWidth == 0) return <LoadingPage />

  return (
    <DndContext
      id="dnd-context-id"
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      modifiers={[snapToCalendarModifier]}
    >
      <EditClassModal
        classEvent={activeClassEvent}
        open={openEdit}
        setOpen={setOpenEdit}
        revertClassEventUpdate={revertClassEventUpdate}
      />
      <div
        ref={calendarRef}
        className="overflow-x-auto h-[calc(100%-72px)] box-border"
      >
        <div className="inline-flex ">
          <div className="" style={{ width: timeWidth }}></div>
          {displayWeekdays.map((weekday, index) => (
            <div
              key={weekday.toString()}
              className="relative flex flex-col items-center text-gray-400"
              style={{ width: dayColumnWidth, minWidth: minDayColumnWidth }}
            >
              <p
                className={cn(
                  'text-md font-bold px-4 rounded-lg',
                  isToday(weekday) && 'bg-purple-500 text-white'
                )}
              >
                {Info.weekdays('short')[index]} {weekday.getDate()}
              </p>
            </div>
          ))}
        </div>
        <div className="inline-flex flex-col relative overflow-y-auto h-[calc(100%-40px)] scrollbar-hide">
          {TIME_ARRAY.map((time, index) => (
            <div className="flex flex-col" key={time}>
              <div className="w-full flex">
                <div
                  className={cn(
                    'border-b-[1px] border-gray-300',
                    index == 0 && 'border-t-[1px]'
                  )}
                  style={{ width: timeWidth }}
                >
                  <p className="text-xs text-secondary-900">{time}</p>
                </div>
                {totalWeekdays.map((weekday, weekdayIndex) => (
                  <div
                    className="relative border-[1px] border-gray-200 h-20"
                    style={{
                      width: dayColumnWidth,
                      minWidth: minDayColumnWidth,
                    }}
                    key={weekday}
                  >
                    <DroppableSpace
                      occupied={occupyList[weekdayIndex][index].isOccupied}
                      id={`${weekday.toString()}-${time}`}
                      weekdayIndex={weekdayIndex}
                      timeIndex={index}
                    >
                      <></>
                    </DroppableSpace>
                    <AnimatePresence mode="wait">
                      {schedule[weekdayIndex][index] && (
                        <DraggableEvent
                          id={schedule[weekdayIndex][index].id}
                          weekdayIndex={weekdayIndex}
                          timeIndex={index}
                          duration={schedule[weekdayIndex][index].duration}
                          classEvent={schedule[weekdayIndex][index]}
                        >
                          <EventCard
                            classEvent={schedule[weekdayIndex][index]}
                            numSlots={3}
                          />
                        </DraggableEvent>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <DragOverlay dropAnimation={null}>
            {activeId ? (
              <EventCard
                numSlots={3}
                classEvent={activeClassEvent}
                title={activeClassEvent?.title || ''}
                className="bg-sky-400 shadow-secondary-900 shadow-2xl"
              />
            ) : null}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  )
}

export default WeekSchedule
