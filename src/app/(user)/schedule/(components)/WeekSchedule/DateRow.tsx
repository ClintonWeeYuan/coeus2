import { useScheduleContext } from '@/context/ScheduleContext'
import { cn } from '@/lib/utils'
import { getMonday, isToday } from '@/utils/scheduleHelpers'
import { Info } from 'luxon'
import { useMemo } from 'react'

const DateRow = () => {
  const { currentDay } = useScheduleContext()

  const monday = getMonday(currentDay)

  const displayWeekdays = useMemo(
    () =>
      Array.from(Array(7)).map((_, index) => {
        const newDate = new Date(monday)
        newDate.setDate(newDate.getDate() + index)
        return newDate
      }),
    [monday]
  )

  return (
    <div className="grid grid-cols-weekschedule overflow-auto scrollbar-hide pb-2">
      <div></div>
      {displayWeekdays.map((day, index) => (
        <DateItem key={index} day={day} index={index} />
      ))}
    </div>
  )
}

interface DateItemProps {
  day: Date
  index: number
}

const DateItem = ({ day, index }: DateItemProps) => {
  return (
    <div className="text-center text-gray-400" key={index}>
      <p
        className={cn(
          'text-md font-bold px-4 rounded-lg',
          isToday(day) && 'bg-purple-500 text-white'
        )}
      >
        {Info.weekdays('short')[index]} {day.getDate()}
      </p>
    </div>
  )
}

export default DateRow
