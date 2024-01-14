import { DateTime } from 'luxon'

export const formatTimeDuration = (from: Date, to: Date): string => {
  const fromDate = DateTime.fromJSDate(from)
  const toDate = DateTime.fromJSDate(to)

  return `${fromDate.toLocaleString(
    DateTime.TIME_SIMPLE
  )} - ${toDate.toLocaleString(DateTime.TIME_SIMPLE)}`
}
