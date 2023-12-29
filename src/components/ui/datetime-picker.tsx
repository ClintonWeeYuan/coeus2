import { CalendarIcon } from 'lucide-react'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { FormControl } from './form'
import { Calendar } from './calendar'
import TimePicker from './time-picker'
import { cn } from '@/lib/utils'
import { DateTime } from 'luxon'

interface Props {
  value: Date
  onChange: (date: Date) => void
}

const formatDate = (date: Date): string => {
  const newDate = new Date(date)
  const formattedDate = DateTime.fromJSDate(newDate).toFormat(
    'dd MMM yyyy, hh:mm a'
  )
  return formattedDate
}

const DateTimePicker = ({ value, onChange }: Props) => {
  const handleDaySelect = (date: Date | undefined) => {
    if (!date) return
    const hours = value.getHours()
    const minutes = value.getMinutes()
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    )
    onChange(newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            {value ? formatDate(value) : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDaySelect}
          disabled={(date) =>
            date < new Date() || date < new Date('1900-01-01')
          }
          initialFocus
        />
        <TimePicker onChange={onChange} value={value} />
      </PopoverContent>
    </Popover>
  )
}

export default DateTimePicker
