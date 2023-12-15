import React, { ReactNode, useState } from 'react'
import { ScheduleContext } from '@/context/ScheduleContext'
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

  const updateCurrentDay = (newDate: Date) => {
    setCurrentDay(newDate)
  }

  return (
    <ScheduleContext.Provider
      value={{
        classEvents,
        updateClassEvents,
        currentDay,
        updateCurrentDay,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export default ScheduleContextProvider
