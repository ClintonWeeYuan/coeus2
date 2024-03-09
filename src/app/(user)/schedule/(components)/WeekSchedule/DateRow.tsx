import { useScheduleContext } from '@/context/ScheduleContext'
import { cn } from '@/lib/utils'
import { getMonday, isToday } from '@/utils/scheduleHelpers'
import { Info } from 'luxon'
import { useMemo } from 'react'

interface Props {
  timeWidth: number
  dayColumnWidth: number
  minDayColumnWidth: number
}

const DateRow = ({ timeWidth, dayColumnWidth, minDayColumnWidth }: Props) => {
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
    <div className="inline-flex ">
      <div className="" style={{ width: timeWidth }}></div>
      {displayWeekdays.map((weekday, index) => (
        <DateItem
          key={index}
          index={index}
          weekday={weekday}
          dayColumnWidth={dayColumnWidth}
          minDayColumnWidth={minDayColumnWidth}
        />
      ))}
    </div>
  )
}

interface DateItemProps {
  weekday: Date
  index: number
  dayColumnWidth: number
  minDayColumnWidth: number
}

const DateItem = ({
  weekday,
  index,
  dayColumnWidth,
  minDayColumnWidth,
}: DateItemProps) => {
  return (
    <div
      className="relative flex flex-col items-center text-gray-400"
      style={{ width: dayColumnWidth, minWidth: minDayColumnWidth }}
    >
      <p
        className={cn(
          'text-md font-bold px-4 rounded-lg',
          isToday(weekday) && 'bg-purple-500 text-white'
        )}
      >
        {Info.weekdays('short')[index]} {weekday.getDate()}
      </p>
    </div>
  )
}

export default DateRow
