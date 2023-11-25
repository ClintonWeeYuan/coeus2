import React, { ReactNode, useState } from 'react';
import { ClassSlot, ScheduleContext } from "@/context/ScheduleContext";

interface Props {
    children: ReactNode;
}

const ScheduleContextProvider = ({ children }: Props) => {

    const [classSlots, setClassSlots] = useState<ClassSlot[]>([
        {
            id: 1,
            day: 0,
            start: 2,
            duration: 5,
            name: "Class with Clinton"
        },
        {
            id: 2,
            day: 1,
            start: 2,
            duration: 3,
            name: "Class with  Zoe"
        }
    ])
    const updateClassSlots = (newClassSlots: ClassSlot[]) => {
        setClassSlots(newClassSlots);
    }

    const [currentDay, setCurrentDay] = useState(new Date());

    const updateCurrentDay = (newDate: Date) => {
        setCurrentDay(newDate);
    }

    return (
        <ScheduleContext.Provider value={{
            classSlots,
            updateClassSlots,
            currentDay,
            updateCurrentDay
        }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export default ScheduleContextProvider;