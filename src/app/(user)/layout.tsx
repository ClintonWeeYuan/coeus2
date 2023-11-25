"use client"

import "@/app/globals.css"
import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";
import ScheduleContextProvider from "@/context/ScheduleContextProvider";


export default function DashboardLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    return (
        <ScheduleContextProvider>
            <div className="flex">
                <Sidebar/>
                <MobileSidebar/>
                <div
                    className="md:ml-96 min-h-screen w-full md:w-[calc(100%-384px)] border-l-2 border-l-stone-200 bg-white">
                    {children}
                </div>
            </div>
        </ScheduleContextProvider>
    )
}
