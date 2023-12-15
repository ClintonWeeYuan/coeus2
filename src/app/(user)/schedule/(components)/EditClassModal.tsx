import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import EditClassForm from './(editClassForm)/EditClassForm'
import { ClassEvent } from '@prisma/client'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  classEvent: ClassEvent | null
}

const EditClassModal = ({ open, setOpen, classEvent }: Props) => {
  // const [open, setOpen] = useState(false)

  if (classEvent) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <EditClassForm classEvent={classEvent} />
        </DialogContent>
      </Dialog>
    )
  }
}

export default EditClassModal
