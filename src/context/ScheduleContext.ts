import { createContext, useContext } from "react";

export interface ClassSlot {
    id: number,
    day: number;
    start: number;
    duration: number;
    name: string;
}

interface IScheduleContext {
    classSlots: ClassSlot[];
    updateClassSlots: (newClassSlots: ClassSlot[]) => void;
    currentDay: Date;
    updateCurrentDay: (newDate: Date) => void;
}

export const ScheduleContext = createContext<IScheduleContext>(
    {
        classSlots: [],
        updateClassSlots(){},
        currentDay: new Date(),
        updateCurrentDay(){},
    }
)

export const useScheduleContext = () => useContext(ScheduleContext);
