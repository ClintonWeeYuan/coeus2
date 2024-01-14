import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import EditClassForm from './(editClassForm)/EditClassForm'
import { ClassEvent } from '@prisma/client'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  classEvent: ClassEvent | null
  revertClassEventUpdate: () => void
}

const EditClassModal = ({
  open,
  setOpen,
  classEvent,
  revertClassEventUpdate,
}: Props) => {
  const handleClose = (close: boolean) => {
    setOpen(close)
    revertClassEventUpdate()
  }
  if (classEvent) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <EditClassForm
            closeModal={() => setOpen(false)}
            classEvent={classEvent}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

export default EditClassModal
