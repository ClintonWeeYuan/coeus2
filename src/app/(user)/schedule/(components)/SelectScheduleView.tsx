import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useScheduleContext } from '@/context/ScheduleContext'
import { ScheduleView } from '@/context/ScheduleContext'
const SelectScheduleView = () => {
  const { currentView, updateCurrentView } = useScheduleContext()
  return (
    <Select onValueChange={updateCurrentView} defaultValue={currentView}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Schedule View" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ScheduleView.week}>Week</SelectItem>
        <SelectItem value={ScheduleView.month}>Month</SelectItem>
        <SelectItem value={ScheduleView.agenda}>Agenda</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SelectScheduleView
