import { DateTime } from 'luxon'

const HOUR_ARRAY = Array.from(Array(24).keys())

export const TIME_ARRAY = HOUR_ARRAY.flatMap((hour) => {
  const times = []
  const date = new Date()
  date.setHours(hour, 0, 0)

  times.push(DateTime.fromJSDate(date).toFormat('HH:mm'))
  date.setMinutes(30)
  times.push(DateTime.fromJSDate(date).toFormat('HH:mm'))

  return times
})
