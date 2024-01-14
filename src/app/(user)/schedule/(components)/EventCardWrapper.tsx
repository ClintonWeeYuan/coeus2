import { motion } from 'framer-motion'
import EventCard from './EventCard'
import { ClassEvent } from '@prisma/client'

interface Props {
  className?: string
  classEvent: ClassEvent | null
  animate: boolean
}

const EventCardWrapper = (props: Props) => {
  if (props.classEvent == null) return null

  if (props.animate) {
    return (
      <motion.div
        className="w-full"
        key={props.classEvent.id}
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
      >
        <EventCard {...props} />
      </motion.div>
    )
  } else {
    return <EventCard {...props} />
  }
}

export default EventCardWrapper
