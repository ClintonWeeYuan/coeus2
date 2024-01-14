import { toast } from '@/components/ui/use-toast'

export type ServerResponse = {
  success: boolean
  message: string
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  payload?: any
}

export const getErrorMessage = (error: unknown) => {
  let message: string

  if (error instanceof Error && error.message) {
    message = error.message
  } else {
    message = 'Something went wrong'
  }

  return message
}

export const handleServerResponse = (response: ServerResponse) => {
  const { success, message } = response
  if (success) {
    toast({
      title: message,
      description: 'Friday, February 10, 2023 at 5:57 PM',
      variant: 'default',
    })
  } else {
    toast({
      title: message,
      description: 'Friday, February 10, 2023 at 5:57 PM',
      variant: 'destructive',
    })
  }
}
