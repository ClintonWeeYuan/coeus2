import { ClassEvent } from '@prisma/client'
import { createContext, useContext } from 'react'

interface IScheduleContext {
  classEvents: ClassEvent[]
  updateClassEvents: (newClassEvents: ClassEvent[]) => void
  currentDay: Date
  updateCurrentDay: (newDate: Date) => void
}

export const ScheduleContext = createContext<IScheduleContext>({
  classEvents: [],
  updateClassEvents() {},
  currentDay: new Date(),
  updateCurrentDay() {},
})

export const useScheduleContext = () => useContext(ScheduleContext)
