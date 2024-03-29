'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { List, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react'
import { useScheduleContext } from '@/context/ScheduleContext'
import { DateTime } from 'luxon'
import CreateClassModal from './CreateClassModal'
import SelectScheduleView from './SelectScheduleView'

const Header = () => {
  const { currentDay, updateCurrentDay } = useScheduleContext()

  const handleDayChange = (movement: number) => {
    const newDay = new Date(currentDay)
    newDay.setDate(newDay.getDate() + 7 * movement)
    updateCurrentDay(newDay)
  }

  return (
    <div className="grid gap-2 grid-cols-5 mb-8">
      <div className="col-span-3 md:col-span-2 flex items-center">
        <p className="text-md md:text-2xl font-semibold">
          {DateTime.fromISO(currentDay.toISOString()).toFormat('LLLL kkkk')}
        </p>
      </div>
      <div className="col-span-2 md:col-span-1 flex justify-end md:justify-center">
        <Button onClick={() => handleDayChange(-1)} variant="ghost" size="icon">
          <ChevronLeft />
        </Button>
        <div className="flex items-center justify-center px-2 border border-stone-200 rounded-lg mx-2">
          Today
        </div>
        <Button onClick={() => handleDayChange(1)} variant="ghost" size="icon">
          <ChevronRight />
        </Button>
      </div>
      <div className="flex justify-center md:justify-end col-span-5 md:col-span-2">
        <SelectScheduleView />
        <Button variant="outline" size="icon">
          <List />
        </Button>
        <Button variant="outline" size="icon">
          <LayoutGrid />
        </Button>
        <CreateClassModal />
      </div>
    </div>
  )
}

export default Header
