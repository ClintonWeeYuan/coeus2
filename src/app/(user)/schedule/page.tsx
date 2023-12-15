import { getSession } from '@/actions/session'
import { getClass } from '@/actions/schedule'
import ScheduleContainer from './(components)/ScheduleContainer'

const Page = async () => {
  // const { user } = useUser()

  // const { data, isLoading } = useSWR(`/schedule/api/${user.id}`, fetcher)
  const session = await getSession()
  const data = await getClass(session?.userId || -1)

  return <ScheduleContainer initialSchedule={data.payload} />
}

export default Page
