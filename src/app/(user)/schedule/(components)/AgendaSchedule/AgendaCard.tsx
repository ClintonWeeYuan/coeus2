import { Button } from '@/components/ui/button'
import { formatInterval } from '@/utils/dateFormatters'
import { ClassEvent } from '@prisma/client'
import { Clock5, MapPin } from 'lucide-react'

interface Props {
  classEvent: ClassEvent
}
const AgendaCard = ({ classEvent }: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center cursor-pointer p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex flex-col items-center md:items-start mr-6 mb-2 md:mb-0 md:col-span-3 lg:col-span-2">
        <div className="flex items-center mb-2">
          <Clock5 size="15" className="mr-1" />
          <h4 className="text-sm">
            {formatInterval(classEvent.startDate, classEvent.endDate)}
          </h4>
        </div>
        <div className="flex items-center">
          <MapPin size="15" className="mr-1" />
          <h4 className="text-sm">Online</h4>
        </div>
      </div>

      <div className="flex flex-col md:flex-row grow justify-between items-center col-span-7 md:col-span-9">
        <div className="flex mr-2 mb-2 md:mb-0">
          <h4 className="font-bold">
            {classEvent.title + ' '}
            <span className="text-gray-500 text-sm">
              with {classEvent.studentName}
            </span>
          </h4>
        </div>
        <Button className="w-full md:w-auto">Edit</Button>
      </div>
    </div>
  )
}

export default AgendaCard
