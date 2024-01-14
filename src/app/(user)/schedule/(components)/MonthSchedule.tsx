import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
const MonthSchedule = () => {
  const [open, setOpen] = useState('hello')
  const helloRef = useRef(0)
  helloRef.current = helloRef.current + 1
  console.log(helloRef.current)

  return (
    <div>
      <button onClick={() => setOpen((open) => open + 'hi there')}>
        Change
      </button>

      <AnimatePresence>
        <motion.div
          key="hello"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-red-500 h-48 w-48"
        >
          {open}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default MonthSchedule
