'use client'

import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

export interface DroppableData {
  weekdayIndex: number
  timeIndex: number
  occupied: boolean
}

interface Props {
  children: ReactNode
  id: string
  weekdayIndex: number
  timeIndex: number
  occupied: boolean
}

function DroppableSpace({
  children,
  id,
  weekdayIndex,
  timeIndex,
  occupied,
}: Props) {
  const { setNodeRef } = useDroppable({
    id: `droppable-${id}`,
    data: {
      weekdayIndex,
      timeIndex,
      occupied,
    } as DroppableData,
  })

  return (
    <div ref={setNodeRef} className="relative w-full h-full">
      {children}
    </div>
  )
}

export default DroppableSpace
