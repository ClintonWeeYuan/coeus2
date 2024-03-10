import { cn } from '@/lib/utils'
import { formatInterval } from '@/utils/dateFormatters'
import { ClassEvent } from '@prisma/client'

interface Props {
  className?: string
  classEvent: ClassEvent | null
}

function EventCard({ className, classEvent }: Props) {
  if (classEvent == null) return null

  const displayTimeDuration = formatInterval(
    classEvent.startDate,
    classEvent.endDate
  )
  const duration =
    classEvent.endDate.getHours() - classEvent.startDate.getHours()
  const height = duration * 80

  return (
    <div
      key={classEvent.id}
      style={{ height }}
      className={cn(
        'w-full bg-sky-300 rounded-lg  shadow text-left px-2 py-2 ',
        className
      )}
    >
      <p className="text-xs text-gray-500">{displayTimeDuration} </p>
      <p>{classEvent.title}</p>
    </div>
  )
}

export default EventCard
