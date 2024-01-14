import React, { ReactNode, useState } from 'react'
import { ScheduleContext, ScheduleView } from '@/context/ScheduleContext'
import { ClassEvent } from '@prisma/client'

interface Props {
  children: ReactNode
  initialClassEvents: ClassEvent[]
}

const ScheduleContextProvider = ({ children, initialClassEvents }: Props) => {
  const [classEvents, setClassEvents] = useState<ClassEvent[]>(
    initialClassEvents || []
  )
  const updateClassEvents = (newClassEvents: ClassEvent[]) => {
    setClassEvents(newClassEvents)
  }

  const [currentDay, setCurrentDay] = useState(new Date())

  const updateCurrentDay = async (newDate: Date) => {
    setCurrentDay(newDate)
  }

  const [currentView, setCurrentView] = useState<ScheduleView>(
    ScheduleView.week
  )
  const updateCurrentView = (newView: ScheduleView) => {
    setCurrentView(newView)
  }

  return (
    <ScheduleContext.Provider
      value={{
        classEvents,
        updateClassEvents,
        currentDay,
        updateCurrentDay,
        currentView,
        updateCurrentView,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export default ScheduleContextProvider
