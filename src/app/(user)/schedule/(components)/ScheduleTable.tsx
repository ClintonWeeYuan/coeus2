import { ScheduleView, useScheduleContext } from '@/context/ScheduleContext'
import WeekSchedule from './WeekSchedule'
import MonthSchedule from './MonthSchedule'

const ScheduleTable = () => {
  const { currentView } = useScheduleContext()

  switch (currentView) {
    case ScheduleView.week:
      return <WeekSchedule />
    case ScheduleView.month:
      return <MonthSchedule />
  }
}

export default ScheduleTable
