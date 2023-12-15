'use client'

import { ClassEvent } from '@prisma/client'
import Header from './Header'
import ScheduleTable from './ScheduleTable'
import ScheduleContextProvider from '@/context/ScheduleContextProvider'

interface Props {
  initialSchedule: ClassEvent[]
}

const ScheduleContainer = ({ initialSchedule }: Props) => {
  return (
    <ScheduleContextProvider initialClassEvents={initialSchedule}>
      <div className="p-6 overflow-hidden h-screen">
        <Header />
        <ScheduleTable />
      </div>
    </ScheduleContextProvider>
  )
}

export default ScheduleContainer
