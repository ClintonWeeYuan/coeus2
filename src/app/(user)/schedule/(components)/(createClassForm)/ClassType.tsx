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

const ClassTypeField = () => {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <FormLabel htmlFor="classType" className="text-right">
        Class Type
      </FormLabel>
      <FormField
        control={control}
        name="classType"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="PRIVATE">Private</SelectItem>
                <SelectItem value="GROUP">Group</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  )
}

export default ClassTypeField
