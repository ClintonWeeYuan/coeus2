import { DateTime } from 'luxon'

export const formatInterval = (from: Date, to: Date): string => {
  const fromDate = DateTime.fromJSDate(from)
  const toDate = DateTime.fromJSDate(to)

  return `${fromDate.toLocaleString(
    DateTime.TIME_SIMPLE
  )} - ${toDate.toLocaleString(DateTime.TIME_SIMPLE)}`
}

export const calculateInterval = (from: Date, to: Date): string => {
  const diffInMilliseconds = to.getTime() - from.getTime()
  let diffInMinutes = diffInMilliseconds / 1000 / 60

  const diffInHours = diffInMinutes / 60
  diffInMinutes = diffInMinutes % 60

  return `${diffInHours > 0 ? diffInHours + 'h ' : ''}${
    diffInMinutes > 0 ? diffInMinutes + 'm' : ''
  }`
}

export const formatTime = (date: Date): string => {
  const currentDate = DateTime.fromJSDate(date)

  return currentDate.toLocaleString(DateTime.TIME_SIMPLE)
}
