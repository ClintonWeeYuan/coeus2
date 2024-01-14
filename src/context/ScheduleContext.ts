import { ClassEvent } from '@prisma/client'
import { createContext, useContext } from 'react'

export enum ScheduleView {
  week = 'week',
  month = 'month',
  agenda = 'agenda',
}

interface IScheduleContext {
  classEvents: ClassEvent[]
  updateClassEvents: (newClassEvents: ClassEvent[]) => void
  currentDay: Date
  updateCurrentDay: (newDate: Date) => void
  currentView: ScheduleView
  updateCurrentView: (newView: ScheduleView) => void
}

export const ScheduleContext = createContext<IScheduleContext>({
  classEvents: [],
  updateClassEvents() {},
  currentDay: new Date(),
  updateCurrentDay() {},
  currentView: ScheduleView.week,
  updateCurrentView() {},
})

export const useScheduleContext = () => useContext(ScheduleContext)
