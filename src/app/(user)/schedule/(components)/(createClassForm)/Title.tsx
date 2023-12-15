import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'

const TitleField = () => {
  const { register } = useFormContext()

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="student" className="text-right">
        Title
      </Label>
      <Input
        {...register('title')}
        placeholder="Class with Max"
        className="col-span-3"
      />
    </div>
  )
}

export default TitleField
