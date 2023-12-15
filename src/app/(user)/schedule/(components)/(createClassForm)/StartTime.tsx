import DateTimePicker from '@/components/ui/datetime-picker'
import { FormField, FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'

const StartTimeField = () => {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="start-time" className="text-right">
        Start
      </Label>
      <FormField
        control={control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="flex flex-col col-span-3">
            <DateTimePicker
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          </FormItem>
        )}
      />
    </div>
  )
}

export default StartTimeField
