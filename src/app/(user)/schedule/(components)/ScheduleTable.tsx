import { ScheduleView, useScheduleContext } from '@/context/ScheduleContext'
import WeekSchedule from './WeekSchedule/WeekSchedule'
import MonthSchedule from './MonthSchedule'
import AgendaSchedule from './AgendaSchedule/AgendaSchedule'

const ScheduleTable = () => {
  const { currentView } = useScheduleContext()

  switch (currentView) {
    case ScheduleView.week:
      return <WeekSchedule />
    case ScheduleView.month:
      return <MonthSchedule />
    case ScheduleView.agenda:
      return <AgendaSchedule />
  }
}

export default ScheduleTable
