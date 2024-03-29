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
    classEvent = await prisma.classEvent.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: 'Failed to update class',
    }
  }

  return {
    success: true,
    message: 'Class successfully updated',
    payload: classEvent,
  }
}

export async function getClass(
  userId: number,
  period: { start: Date; end: Date }
): Promise<ServerResponse> {
  const { start, end } = period

  console.log(start)
  let classEvents
  try {
    classEvents = await prisma.classEvent.findMany({
      where: {
        ownerId: userId,
        startDate: {
          gte: start,
          lte: end,
        },
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
