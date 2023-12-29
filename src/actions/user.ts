'use server'
import { prisma } from '@/db'
import { loginSchema, newUserSchema } from '@/lib/zodSchema'
import { z } from 'zod'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getErrorMessage, ServerResponse } from '@/utils/errorHandling'

type NewUser = z.infer<typeof newUserSchema>

export async function createUser(data: NewUser): Promise<ServerResponse> {
  let user

  try {
    user = await prisma.user.create({
      data: {
        ...data,
        weekSchedule: {
          create: {
            schedule: '',
            timezone: '',
          },
        },
      },
    })
  } catch (e) {
    return {
      success: false,
      message: 'Failed to create user',
    }
  }

  return { success: true, message: 'User successfully created', payload: user }
}

type LoginDetails = z.infer<typeof loginSchema>

export async function login(data: LoginDetails): Promise<ServerResponse> {
  const { email, password } = data

  let user
  try {
    user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
  } catch (e) {
    return { success: false, message: getErrorMessage(e) }
  }

  if (!user) {
    // throw new Error("No such (user) exists..." )
    return { success: false, message: 'No such user exists' }
  }

  if (user.password != password) {
    return { success: false, message: 'Incorrect email/password combination' }
  }

  const sessionData = { userId: user.id, dateOfCreation: Date.now() }

  return {
    success: true,
    message: 'Successfully logged in',
    payload: sessionData,
  }
}

export const validateToken = async (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || '123456789'
    ) as JwtPayload

    if (!decoded) {
      return { message: 'Expired', status: 400 }
    } else if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return { message: 'Expired', status: 400 }
    } else {
      // If the token is valid, return some protected data.
      return { data: decoded, status: 200 }
    }
  } catch (e) {
    return { message: 'Please sign in again', status: 400 }
  }
}
