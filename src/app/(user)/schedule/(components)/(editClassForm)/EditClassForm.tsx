import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DialogFooter } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { existingClassSchema } from '@/lib/zodSchema'
import { updateClass } from '@/actions/schedule'
import { handleServerResponse } from '@/utils/errorHandling'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import TitleField from '../(createClassForm)/Title'
import FormHeader from './FormHeader'
import ClassTypeField from '../(createClassForm)/ClassType'
import DurationField from '../(createClassForm)/Duration'
import StudentNameField from '../(createClassForm)/StudentName'
import AlertField from '../(createClassForm)/Alert'
import LinkField from '../(createClassForm)/Link'
import StartTimeField from '../(createClassForm)/StartTime'
import useUser from '@/components/hooks/useUser'
import { useEffect } from 'react'
import { ClassEvent } from '@prisma/client'

interface Props {
  classEvent: ClassEvent
  closeModal: () => void
}

const EditClassForm = ({ classEvent, closeModal }: Props) => {
  const { user } = useUser()

  const form = useForm<ClassEvent>({
    resolver: zodResolver(existingClassSchema),
    defaultValues: {
      ...classEvent,
    },
  })

  useEffect(() => {
    form.setValue('ownerId', user.id)
  }, [user, form])

  const onSubmit: SubmitHandler<ClassEvent> = async (data) => {
    const result = await updateClass(data)
    if (result.success) {
      handleServerResponse(result)
      closeModal()
    }
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
            <Button type="submit">Update Class</Button>
            <Button type="button" onClick={() => console.log(form.getValues())}>
              Errors
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </Form>
  )
}

export default EditClassForm
