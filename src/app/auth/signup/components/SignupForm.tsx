'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RxGithubLogo } from 'react-icons/rx'
import { FcGoogle } from 'react-icons/fc'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newUserSchema } from '@/lib/zodSchema'
import { z } from 'zod'
import { createUser } from '@/actions/user'

type Inputs = z.infer<typeof newUserSchema>

const SignupForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(newUserSchema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const result = await createUser(data)

    if (!result) {
      console.log('Something went wrong')
    }

    console.log('New User Created!')

    setLoading(false)
  }

  return (
    <Card className="w-1/2 max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <RxGithubLogo className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <FcGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input {...register('firstName')} placeholder="Isagi" />
              {errors.firstName && (
                <p className="text-red-800">{errors.firstName.message}</p>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input {...register('lastName')} placeholder="Yoichi" />
              {errors.lastName && (
                <p className="text-red-800">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              type="email"
              placeholder="m@example.com"
            />
            {errors.email && (
              <p className="text-red-800">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input {...register('password')} type="password" />
            {errors.password && (
              <p className="text-red-800">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            {loading ? 'Loading...' : 'Create account'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SignupForm

