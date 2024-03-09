import { useScheduleContext } from '@/context/ScheduleContext'
import AgendaCard from './AgendaCard'

const AgendaSchedule = () => {
  const { classEvents } = useScheduleContext()

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Today</h2>
      {classEvents.map((classEvent, index) => (
        <AgendaCard classEvent={classEvent} key={index} />
      ))}
    </div>
  )
}

export default AgendaSchedule
