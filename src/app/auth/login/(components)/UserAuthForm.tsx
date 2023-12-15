'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FcGoogle } from 'react-icons/fc'
import { login } from '@/actions/user'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from '@/lib/zodSchema'
import { useRouter } from 'next/navigation'
import { handleServerResponse } from '@/utils/errorHandling'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type Input = z.infer<typeof loginSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Input>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const result = await login(data)
    const { success } = result

    handleServerResponse(result)
    if (success) {
      router.push('/dashboard')
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register('email')}
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register('password')}
              type="password"
              disabled={isSubmitting}
            />
          </div>
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Sign In with Email'}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isSubmitting}>
        {isSubmitting ? (
          'Loading...'
        ) : (
          <>
            <FcGoogle className="mr-4 text-black" /> Google
          </>
        )}
      </Button>
    </div>
  )
}

export default UserAuthForm
