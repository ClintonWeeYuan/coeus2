'use client'

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import DroppableSpace, { DroppableData } from '../DroppableSpace'
import DraggableEvent, { DraggableClassEventData } from '../DraggableEvent'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useScheduleContext } from '@/context/ScheduleContext'
import { TIME_ARRAY } from '../../(lib)/times'
import {
  createInitialSchedule,
  createOccupyList,
  getMonday,
  getWeekRange,
} from '@/utils/scheduleHelpers'
import EditClassModal from '../EditClassModal'
import { ClassEvent } from '@prisma/client'
import { useWindowSize } from 'usehooks-ts'
import { createCalendarModifier } from '@/utils/dndModifier'
import LoadingPage from '@/components/ui/loading-page'
import { getSession } from '@/actions/session'
import { getClass } from '@/actions/schedule'
import { AnimatePresence } from 'framer-motion'
import EventCardWrapper from '../EventCardWrapper'
import DateRow from './DateRow'

const WeekSchedule = () => {
  const { width: windowWidth } = useWindowSize()

  const [openEdit, setOpenEdit] = useState(false)
  const { classEvents, updateClassEvents, currentDay } = useScheduleContext()
  const [activeId, setActiveId] = useState<null | string>(null)

  const [previousClassEvent, setPreviousClassEvent] =
    useState<null | ClassEvent>(null)
  const [activeClassEvent, setActiveClassEvent] = useState<null | ClassEvent>(
    null
  )
  const snapToCalendarModifier = createCalendarModifier(150, 40)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    const activeEvent = classEvents.find(
      (classEvent) => classEvent.id === event.active.id
    )

    if (activeEvent) setActiveClassEvent(activeEvent)
  }

  //Date handles
  const monday = getMonday(currentDay)

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

  const displayWeekdays = useMemo(
    () =>
      Array.from(Array(7)).map((_, index) => {
        const newDate = new Date(monday)
        newDate.setDate(newDate.getDate() + index)
        return newDate
      }),
    [monday]
  )

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
      <div className="overflow-x-scroll h-[calc(100%-100px)] box-border">
        <DateRow />
        <div className="grid grid-cols-weekschedule border border-gray-200 w-full overflow-y-auto h-[calc(100%-100px)] scrollbar-hide">
          {TIME_ARRAY.map((time, index) => (
            <Fragment key={time.toString()}>
              <div
                className={`${index % 2 == 0 && 'border-t-[1px]'} border-gray-200`}
              >
                {index % 2 == 0 && (
                  <p className="text-xs text-secondary-900">{time}</p>
                )}
              </div>
              {displayWeekdays.map((day, dayIndex) => (
                <div
                  className={`relative text-center h-10 ${index % 2 == 0 && 'border-t-[1px]'} border-l-[1px] border-gray-200`}
                  key={day.toString()}
                >
                  <DroppableSpace
                    occupied={occupyList[dayIndex][index].isOccupied}
                    id={`${day.toString()}-${time}`}
                    weekdayIndex={dayIndex}
                    timeIndex={index}
                  >
                    <></>
                  </DroppableSpace>
                  <AnimatePresence mode="wait">
                    {schedule[dayIndex][index] && (
                      <DraggableEvent
                        id={schedule[dayIndex][index].id}
                        weekdayIndex={dayIndex}
                        timeIndex={index}
                        duration={schedule[dayIndex][index].duration}
                        classEvent={schedule[dayIndex][index]}
                      >
                        <EventCardWrapper
                          animate={true}
                          classEvent={schedule[dayIndex][index]}
                        />
                      </DraggableEvent>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </Fragment>
          ))}
          <DragOverlay dropAnimation={null}>
            {activeId ? (
              <EventCardWrapper
                classEvent={activeClassEvent}
                animate={false}
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
