import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'

const AlertField = () => {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <FormLabel htmlFor="alert" className="text-right">
        Alert
      </FormLabel>
      <FormField
        control={control}
        name="alert"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1 hour">1 hour</SelectItem>
                <SelectItem value="12 hours">12 hours</SelectItem>
                <SelectItem value="1 day">1 day</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  )
}

export default AlertField
