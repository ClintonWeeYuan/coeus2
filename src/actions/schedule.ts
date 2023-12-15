'use server'

import { ClassEvent, newClassSchema } from '@/lib/zodSchema'
import { ServerResponse } from '@/utils/errorHandling'
import { prisma } from '@/db'
import { z } from 'zod'

type NewClass = z.infer<typeof newClassSchema>

export async function createClass(data: NewClass): Promise<ServerResponse> {
  let classEvent
  try {
    classEvent = await prisma.classEvent.create({
      data: {
        ...data,
      },
    })
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: 'Failed to create class',
    }
  }

  return {
    success: true,
    message: 'Class successfully created',
    payload: classEvent,
  }
}

export async function updateClass(data: ClassEvent): Promise<ServerResponse> {
  let classEvent
  try {
    classEvent = await prisma.classEvent.create({
      data: {
        ...data,
      },
    })
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: 'Failed to create class',
    }
  }

  return {
    success: true,
    message: 'Class successfully created',
    payload: classEvent,
  }
}

export async function getClass(userId: number): Promise<ServerResponse> {
  let classEvents
  try {
    classEvents = await prisma.classEvent.findMany({
      where: {
        ownerId: userId,
      },
    })
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: 'Failed to find classes',
    }
  }

  return {
    success: true,
    message: 'Class successfully created',
    payload: classEvents,
  }
}
