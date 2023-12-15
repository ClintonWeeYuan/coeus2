'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { List, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react'
import { useScheduleContext } from '@/context/ScheduleContext'
import { DateTime } from 'luxon'
import CreateClassModal from './CreateClassModal'

const Header = () => {
  const { currentDay, updateCurrentDay } = useScheduleContext()

  const handleDayChange = (movement: number) => {
    const newDay = new Date(currentDay)
    newDay.setDate(newDay.getDate() + 7 * movement)
    updateCurrentDay(newDay)
  }

  return (
    <div className="flex justify-between items-center mb-8 h-[40px]">
      <div>
        <p className="text-2xl font-semibold">
          {DateTime.fromISO(currentDay.toISOString()).toFormat('LLLL kkkk')}
        </p>
      </div>
      <div className="flex">
        <Button onClick={() => handleDayChange(-1)} variant="ghost" size="icon">
          <ChevronLeft />
        </Button>
        <div className="flex items-center justify-center px-2 border border-stone-200 rounded-lg mx-2">
          Today
        </div>
        <Button onClick={() => handleDayChange(1)} variant="ghost" size="icon">
          <ChevronRight />
        </Button>

        <Button className="ml-6 mr-2">Filter</Button>
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
