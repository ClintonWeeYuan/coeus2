"use client"

import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
    children: ReactNode,
    id: string,
    weekdayIndex: number,
    timeIndex: number,
    occupied: boolean,
}

function DroppableSpace({ children, id, weekdayIndex, timeIndex,occupied }: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id: `droppable-${id}`,
        data: {
            weekdayIndex,
            timeIndex,
            occupied
        }
    });

    return (
        <div ref={setNodeRef}
             className={cn("relative w-full h-full", isOver && "border-dotted border-2 border-accent-500")}>
            {children}
        </div>
    );
}

export default DroppableSpace