import { cn } from '@/lib/utils'

interface Props {
  className?: string
  numSlots: number
  title: string
}

function EventCard({ className, numSlots, title }: Props) {
  const height = 80 * numSlots - 8

  return (
    <div
      style={{ height }}
      className={cn(
        'w-full bg-sky-300 rounded-lg shadow text-left px-2 py-2',
        className
      )}
    >
      <p className="text-xs text-gray-500">4.30 - 5.30pm </p>
      <p>{title}</p>
    </div>
  )
}

export default EventCard
