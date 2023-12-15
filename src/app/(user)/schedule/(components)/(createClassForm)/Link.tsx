import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'

const LinkField = () => {
  const { register } = useFormContext()

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="link" className="text-right">
        Zoom Link
      </Label>
      <Input
        {...register('link')}
        id="link"
        defaultValue="https:zoom/my-room"
        className="col-span-3"
      />
    </div>
  )
}

export default LinkField
