import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import CreateClassForm from './(createClassForm)/CreateClassForm'

const CreateClassModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="ml-2 ">
        <Button>Add New Class</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateClassForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateClassModal
