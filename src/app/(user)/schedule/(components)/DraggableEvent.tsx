'use client'
import { useDraggable } from '@dnd-kit/core'
import { ClassEvent } from '@prisma/client'

export interface DraggableClassEventData {
  weekdayIndex: number
  timeIndex: number
  duration: number
  classEvent: ClassEvent
}

import { ReactNode } from 'react'

export function DraggableEvent({
  children,
  id,
  weekdayIndex,
  timeIndex,
  duration,
  classEvent,
}: {
  children: ReactNode
  id: number
  weekdayIndex: number
  timeIndex: number
  duration: number
  classEvent: ClassEvent
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: {
      weekdayIndex,
      timeIndex,
      duration,
      classEvent,
    } as DraggableClassEventData,
  })

  return (
    <button
      ref={setNodeRef}
      className="absolute w-full h-full flex justify-center top-0 left-0 z-30 touch-none"
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  )
}

export default DraggableEvent
