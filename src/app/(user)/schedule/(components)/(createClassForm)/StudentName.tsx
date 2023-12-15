import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'

const StudentNameField = () => {
  const { register } = useFormContext()

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="student" className="text-right">
        Student
      </Label>
      <Input
        {...register('studentName')}
        placeholder="Eduardo"
        className="col-span-3"
      />
    </div>
  )
}

export default StudentNameField
