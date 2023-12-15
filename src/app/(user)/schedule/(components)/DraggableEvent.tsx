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
  // const style = transform ? {
  //     transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  // } : undefined;

  return (
    <button
      ref={setNodeRef}
      className="absolute w-full h-full pt-1 flex justify-center top-0 left-0 z-30 touch-none"
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  )
}

export default DraggableEvent
