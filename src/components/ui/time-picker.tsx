import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

const hourArray = Array.from({ length: 12 }, (_, i) => i + 1)
const minuteArray = ['00', '30']
interface Props {
  value: Date
  onChange: (currentValue: Date) => void
}

const TimePicker = ({ value, onChange }: Props) => {
  // const { setValue, watch } = useFormContext()

  // const watchStartDate = watch('startDate')

  const [currentTime, setCurrentTime] = useState({
    hour: 11,
    minute: 0,
    IsAm: false,
  })

  useEffect(() => {
    const startDateTime = new Date(value)
    const startHour = currentTime.hour + (currentTime.IsAm ? 12 : 0)
    startDateTime.setHours(startHour, currentTime.minute, 0, 0)
    onChange(startDateTime)
  }, [value, currentTime, onChange])

  return (
    <div className="flex items-center justify-center pb-4">
      <Select
        onValueChange={(e) =>
          setCurrentTime((prevState) => ({ ...prevState, hour: parseInt(e) }))
        }
      >
        <SelectTrigger className="w-18 border-none shadow-none">
          <SelectValue placeholder="12" />
        </SelectTrigger>
        <SelectContent>
          {hourArray.map((hour) => (
            <SelectItem key={hour} value={hour.toString()}>
              {hour}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="">:</span>
      <Select
        onValueChange={(e) =>
          setCurrentTime((prevState) => ({ ...prevState, minute: parseInt(e) }))
        }
      >
        <SelectTrigger className="w-18 border-none shadow-none">
          <SelectValue placeholder="12" />
        </SelectTrigger>
        <SelectContent>
          {minuteArray.map((minute) => (
            <SelectItem key={minute} value={minute.toString()}>
              {minute}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(e) =>
          setCurrentTime((prevState) => ({ ...prevState, isAm: e == 'AM' }))
        }
      >
        <SelectTrigger className="w-18 border-none shadow-none">
          <SelectValue placeholder="AM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default TimePicker
