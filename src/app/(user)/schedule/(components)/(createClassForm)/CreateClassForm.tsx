import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { DialogFooter } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { newClassSchema } from '@/lib/zodSchema'
import { z } from 'zod'
import { createClass } from '@/actions/schedule'
import { handleServerResponse } from '@/utils/errorHandling'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import TitleField from './Title'
import FormHeader from './FormHeader'
import ClassTypeField from './ClassType'
import DurationField from './Duration'
import StudentNameField from './StudentName'
import AlertField from './Alert'
import LinkField from './Link'
import StartTimeField from './StartTime'
import useUser from '@/components/hooks/useUser'
import { useEffect } from 'react'

type Input = z.infer<typeof newClassSchema>

const CreateClassForm = () => {
  const { user } = useUser()

  const form = useForm<Input>({
    resolver: zodResolver(newClassSchema),
    defaultValues: {
      ownerId: user.id,
      startDate: new Date(),
      endDate: new Date(),
    },
  })

  useEffect(() => {
    form.setValue('ownerId', user.id)
  }, [user, form])

  const onSubmit: SubmitHandler<Input> = async (data) => {
    const result = await createClass(data)
    handleServerResponse(result)
  }

  return (
    <Form {...form}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormHeader />
          <div className="grid gap-4 py-4">
            <TitleField />
            <ClassTypeField />
            <StartTimeField />
            <DurationField />
            <StudentNameField />
            <AlertField />
            <LinkField />
          </div>
          <DialogFooter>
            <Button type="submit">Create Class</Button>
            <Button type="button" onClick={() => console.log(form.getValues())}>
              Errors
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </Form>
  )
}

export default CreateClassForm
