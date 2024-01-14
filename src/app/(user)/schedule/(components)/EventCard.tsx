import { cn } from '@/lib/utils'
import { formatTimeDuration } from '@/utils/dateFormatters'
import { ClassEvent } from '@prisma/client'
import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  className?: string
  numSlots: number
  classEvent: ClassEvent
}

function EventCard({ className, numSlots, classEvent }: Props) {
  const height = 80 * numSlots - 8
  const displayTimeDuration = formatTimeDuration(
    classEvent.startDate,
    classEvent.endDate
  )
  return (
    <motion.div
      key={classEvent.id}
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      style={{ height }}
      className={cn(
        'w-full bg-sky-300 rounded-lg  shadow text-left px-2 py-2 ',
        className
      )}
    >
      <p className="text-xs text-gray-500">{displayTimeDuration} </p>
      <p>{classEvent.title}</p>
    </motion.div>
  )
}

export default EventCard
