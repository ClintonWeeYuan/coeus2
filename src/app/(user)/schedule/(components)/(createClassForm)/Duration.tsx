import { FormControl } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

const DurationField = () => {
  const { setValue, watch } = useFormContext()

  const watchStartTime = watch('startDate')

  const hourOptions = ['1', '2', '3', '4']
  const minuteOptions = ['0', '30']

  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)

  useEffect(() => {
    const newEndTime = new Date(watchStartTime)
    newEndTime.setHours(
      newEndTime.getHours() + hour,
      newEndTime.getMinutes() + minute,
      0,
      0
    )
    setValue('endDate', newEndTime)
  }, [hour, minute, setValue, watchStartTime])

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="duration" className="text-right">
        Duration
      </Label>
      <div className="col-span-3 flex items-center">
        <Select onValueChange={(e) => setHour(parseInt(e))} defaultValue="1">
          <FormControl>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {hourOptions.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="mx-2">Hours</p>
        <Select onValueChange={(e) => setMinute(parseInt(e))} defaultValue="0">
          <FormControl>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {minuteOptions.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="ml-2">Minutes</p>
      </div>
    </div>
  )
}

export default DurationField
