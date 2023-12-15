import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const FormHeader = () => {
  return (
    <DialogHeader>
      <DialogTitle>Create New Class</DialogTitle>
      <DialogDescription>
        This class will be saved in the database. Do try to fill in as much of
        the form as possible.
      </DialogDescription>
    </DialogHeader>
  )
}

export default FormHeader
