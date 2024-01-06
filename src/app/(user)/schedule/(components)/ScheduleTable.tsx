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
import { useMemo, useState } from 'react'
import { useScheduleContext } from '@/context/ScheduleContext'
import { cn } from '@/lib/utils'
import { TIME_ARRAY } from '../(lib)/times'
import {
  createInitialSchedule,
  createOccupyList,
  getMonday,
  isToday,
} from '@/utils/scheduleHelpers'
import { Info } from 'luxon'
import EditClassModal from './EditClassModal'
import { ClassEvent } from '@prisma/client'
import { useElementSize, useWindowSize } from 'usehooks-ts'
import { createCalendarModifier } from '@/utils/dndModifier'
import LoadingPage from '@/components/ui/loading-page'
import { useMousePosition } from '@/components/hooks/useMousePosition'

const ScheduleTable = () => {
  const { width: windowWidth } = useWindowSize()
  const isMobile = windowWidth > 0 && windowWidth <= 640
  const [calendarRef, { width }] = useElementSize()
  const timeWidth = 70 //w-24
  const dayColumnWidth = (width - timeWidth) / 7
  const [openEdit, setOpenEdit] = useState(false)
  const { classEvents, updateClassEvents, currentDay } = useScheduleContext()
  const [mouseRef, { x: mouseX, y: mouseY }] = useMousePosition()
  console.log(mouseX)
  console.log(mouseY)
  const [activeId, setActiveId] = useState<null | string>(null)
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
  const today = new Date()
  const monday = useMemo(() => getMonday(currentDay), [currentDay])

  const totalWeekdays = Array.from(Array(7)).map((item, index) => {
    const newDate = new Date(monday)
    newDate.setDate(newDate.getDate() + index)
    return newDate
  })

  const singleDay = [today]
  const weekdays = isMobile ? singleDay : totalWeekdays
  const schedule = useMemo(() => {
    const initialSchedule = createInitialSchedule(classEvents, totalWeekdays)
    const displaySchedule = isMobile
      ? [initialSchedule[today.getDay()]]
      : initialSchedule
    return displaySchedule
  }, [classEvents, weekdays])

  const occupyList = useMemo(() => {
    return createOccupyList(classEvents, totalWeekdays)
  }, [classEvents, weekdays])

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    const { id } = active

    const {
      weekdayIndex: prevWeekdayIndex,
      timeIndex: prevTimeIndex,
      duration,
      classEvent,
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
        classEvent.startDate.setDate(monday.getDate() + newWeekdayIndex)
        classEvent.startDate.setHours(newTimeIndex)
        return classEvent
      } else {
        return classEvent
      }
    })

    updateClassEvents(newclassEvents)
    // setSchedule(newSchedule)
    setActiveId(null)
    setOpenEdit(true)
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
      />
      <div
        ref={calendarRef}
        className="overflow-x-auto h-[calc(100%-72px)] box-border "
      >
        <div className="flex pb-4">
          <div className=" hidden md:block" style={{ width: timeWidth }}></div>
          {weekdays.map((weekday, index) => (
            <div
              key={weekday.toString()}
              className="flex flex-col items-center text-gray-400"
              style={{ width: dayColumnWidth }}
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
        <div
          ref={mouseRef}
          className="flex flex-col overflow-y-auto h-[calc(100%-40px)] scrollbar-hide"
        >
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
                {weekdays.map((weekday, weekdayIndex) => (
                  <div
                    className="relative border-[1px] border-gray-200 h-20"
                    style={{ width: dayColumnWidth }}
                    key={weekday.getDate()}
                  >
                    <DroppableSpace
                      occupied={occupyList[weekdayIndex][index].isOccupied}
                      id={`${weekday.toString()}-${time}`}
                      weekdayIndex={weekdayIndex}
                      timeIndex={index}
                    >
                      <></>
                    </DroppableSpace>
                    {schedule[weekdayIndex][index] && (
                      <DraggableEvent
                        id={schedule[weekdayIndex][index].id}
                        weekdayIndex={weekdayIndex}
                        timeIndex={index}
                        duration={schedule[weekdayIndex][index].duration}
                        classEvent={schedule[weekdayIndex][index]}
                      >
                        <EventCard
                          title={schedule[weekdayIndex][index].title}
                          numSlots={3}
                        />
                      </DraggableEvent>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <DragOverlay dropAnimation={null}>
            {activeId ? (
              <EventCard
                numSlots={3}
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

export default ScheduleTable
