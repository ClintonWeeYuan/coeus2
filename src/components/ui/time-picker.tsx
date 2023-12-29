import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

const hourArray = Array.from({ length: 12 }, (_, i) => i + 1)
const minuteArray = ['00', '30']

interface Props {
  value: Date
  onChange: (currentValue: Date) => void
}

const TimePicker = ({ value, onChange }: Props) => {
  const [currentTime, setCurrentTime] = useState({
    hour: value.getHours() % 12,
    minute: value.getMinutes(),
    IsAm: value.getHours() < 12,
  })

  const handleHourChange = (newHour: string) => {
    const newDate = new Date(value)
    const startHour = parseInt(newHour) + (currentTime.IsAm ? 12 : 0)
    newDate.setHours(startHour)
    onChange(newDate)
    setCurrentTime((prev) => ({ ...prev, hour: parseInt(newHour) }))
  }

  const handleMinuteChange = (newMinute: string) => {
    const newDate = new Date(value)
    newDate.setMinutes(parseInt(newMinute))
    onChange(newDate)
    setCurrentTime((prev) => ({ ...prev, minute: parseInt(newMinute) }))
  }

  const handleAmPmChange = (amOrPm: string) => {
    const isAm = amOrPm == 'AM'
    const newDate = new Date(value)
    const startHour = currentTime.hour + (isAm ? 0 : 12)
    newDate.setHours(startHour)
    onChange(newDate)
    setCurrentTime((prev) => ({ ...prev, isAm }))
  }

  return (
    <div className="flex items-center justify-center pb-4">
      <Select
        onValueChange={handleHourChange}
        defaultValue={currentTime.hour.toString()}
      >
        <SelectTrigger className="w-18 border-none shadow-none">
          <SelectValue />
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
        onValueChange={handleMinuteChange}
        defaultValue={currentTime.minute == 0 ? '00' : '30'}
      >
        <SelectTrigger className="w-18 border-none shadow-none">
          <SelectValue />
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
        onValueChange={handleAmPmChange}
        defaultValue={currentTime.IsAm ? 'AM' : 'PM'}
      >
        <SelectTrigger className="w-18 border-none shadow-none">
          <SelectValue />
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
