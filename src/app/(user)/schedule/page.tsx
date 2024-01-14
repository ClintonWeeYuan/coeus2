import { getSession } from '@/actions/session'
import { getClass } from '@/actions/schedule'
import ScheduleContainer from './(components)/ScheduleContainer'
import { getMonday } from '@/utils/scheduleHelpers'

const Page = async () => {
  const session = await getSession()

  const monday = getMonday(new Date())

  const sundayEnd = new Date(monday)
  sundayEnd.setDate(monday.getDate() + 6)
  sundayEnd.setHours(23, 0, 0, 0)
  const data = await getClass(session?.userId || -1, {
    start: monday,
    end: sundayEnd,
  })

  return <ScheduleContainer initialSchedule={data.payload} />
}

export default Page
