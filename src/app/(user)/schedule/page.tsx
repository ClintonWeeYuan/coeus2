"use client"

import DroppableSpace from "@/components/schedule/DroppableSpace";
import DraggableEvent from "@/components/schedule/DraggableEvent";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import EventCard from "@/components/schedule/EventCard";
import useWindowSize from "@/components/hooks/useWindowSize";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/app/(user)/schedule/Header";
import { useScheduleContext } from "@/context/ScheduleContext";

const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri" ,"Sat", "Sun"]


const Page = () => {
    const isMobile = useWindowSize();
    const { classSlots, updateClassSlots, currentDay } = useScheduleContext()

    const [activeId, setActiveId] = useState<null | string>(null);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string)
    }

    const getMonday = (currentDate: Date) => {
        const newDate = new Date(currentDate);
        const currentDay = newDate.getDay();
        const diff = newDate.getDate() - currentDay + (currentDay == 0 ? -6 : 1); // adjust when day is sunday
        newDate.setDate(diff);
        return newDate;
    }

    //Date handles
    const today = new Date();
    const monday = useMemo(() => getMonday(currentDay), [currentDay]);

    const isToday = (date: Date) => {
        return today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()
    }
    const singleWeekday = [today];
    const totalWeekdays = Array.from(Array(7)).map((item, index) => {
        const newDate = new Date(monday);
        newDate.setDate(newDate.getDate() + index);
        return newDate;
    })
    const weekdays = isMobile ? singleWeekday : totalWeekdays;

    const schedule = useMemo(() => {
        const initialSchedule = Array.from(weekdays, () => new Array(10).fill({
            classStart: false,
            duration: 0,
            id: 0,
        }))

        classSlots.forEach((slot) => {
            const { day, start, duration } = slot;
            initialSchedule[day][start] = { classStart: true, duration, id: slot.id }
        })
        // console.log(initialSchedule)
        return initialSchedule;
    }, [classSlots, weekdays])

    const occupyList = useMemo(() => {
        const initialSchedule  = Array.from(weekdays, () => new Array(10).fill({ isOccupied: false, id: 0 }))
        classSlots.forEach((slot) => {
            const { day, start, duration } = slot;
            for(let i = 0; i < duration; i++){
                initialSchedule[day][start + i] = {
                    isOccupied: true,
                    id:slot.id
                };
            }
        })

        return initialSchedule
    }, [classSlots, weekdays])


    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;
        const id = active.id;
        const { weekdayIndex: prevWeekdayIndex, timeIndex: prevTimeIndex, duration } = active.data.current as {weekdayIndex: number, timeIndex: number, duration: number};
        const { weekdayIndex: newWeekdayIndex, timeIndex: newTimeIndex } = over?.data.current as {weekdayIndex: number, timeIndex: number, occupied: boolean};

        for(let i = newTimeIndex; i <= newTimeIndex + duration; i++){
            if(occupyList[newWeekdayIndex][i].id === id) continue;
            if(occupyList[newWeekdayIndex][i].isOccupied) return;
        }

        const newSchedule = [...schedule];
        newSchedule[prevWeekdayIndex][prevTimeIndex] = { classStart: false, duration: 0 };
        newSchedule[newWeekdayIndex][newTimeIndex] = { classStart: newTimeIndex, duration };
        const newClassSlots = classSlots.map((slot) => {
            if(slot.id === id){
                slot.start = newTimeIndex;
                slot.day = newWeekdayIndex;
                return slot;
            } else {
                return slot;
            }
        })
        updateClassSlots(newClassSlots)
        // setSchedule(newSchedule)
        setActiveId(null)
    }

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="p-6 overflow-hidden h-screen">
                <Header/>
                <div className="overflow-x-auto h-[calc(100%-72px)]">
                    <div className="flex h-[40px]">
                        <div className="w-24 hidden md:block"></div>
                        {weekdays.map((weekday, index) => (
                            <div key={weekday.toString()} className="flex flex-col items-center w-full md:w-[200px] text-gray-400">
                                <p className={cn("text-md font-bold px-4 rounded-lg", isToday(weekday) && "bg-purple-500 text-white")}>{weekdayNames[index]} {weekday.getDate()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col overflow-y-auto h-[calc(100%-40px)] scrollbar-hide">
                        {Array.from(Array(10).keys()).map((item, index) => (
                            <div className="flex flex-col" key={item}>
                                <div className="w-full flex">
                                    <div className={cn("w-24 border-b-[1px] border-gray-300", index == 0 && "border-t-[1px]")}>
                                        <p className="text-xs text-secondary-900">{index + 7}:00 AM</p>
                                    </div>
                                    {weekdays.map((weekday, weekdayIndex) => (
                                        <div className="relative w-[200px] border-[1px] border-gray-200 h-20" key={weekday.getDate()}>
                                            <DroppableSpace occupied={occupyList[weekdayIndex][index].isOccupied} id={`${weekday.toString()}-${item}`} weekdayIndex={weekdayIndex}
                                                            timeIndex={index}>
                                                <></>
                                            </DroppableSpace>
                                            {
                                                schedule[weekdayIndex][index].classStart && (
                                                    <DraggableEvent id={schedule[weekdayIndex][index].id} weekdayIndex={weekdayIndex}
                                                                    timeIndex={index} duration={schedule[weekdayIndex][index].duration}>
                                                        <EventCard numSlots={3}/>
                                                    </DraggableEvent>
                                                )
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <DragOverlay>
                            {activeId ? (
                                <EventCard numSlots={3} className="bg-sky-400 shadow-secondary-900 shadow-2xl"/>
                            ): null}
                        </DragOverlay>
                    </div>
                </div>
            </div>
        </DndContext>
    );
};

export default Page;