import { ClassEvent } from '@prisma/client'

export const getDayIndex = (date: Date) => {
  //In Date object, Sunday is taken as 0, but we want to convert it to Monday as 0

  const initialIndex = date.getDay()
  return initialIndex == 0 ? 6 : initialIndex - 1
}

export const getMonday = (currentDate: Date) => {
  const newDate = new Date(currentDate)
  const currentDay = newDate.getDay()
  const diff = newDate.getDate() - currentDay + (currentDay == 0 ? -6 : 1) // adjust when day is sunday
  newDate.setDate(diff)
  return newDate
}

export const isToday = (date: Date) => {
  const today = new Date()
  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  )
}

export const getWeekRange = (date: Date): { start: Date; end: Date } => {
  const monday = getMonday(date)

  const sundayEnd = new Date(monday)
  sundayEnd.setDate(monday.getDate() + 6)
  sundayEnd.setHours(23, 0, 0, 0)

  return { start: monday, end: sundayEnd }
}

export const createOccupyList = (
  classEvents: ClassEvent[],
  numDays: number
) => {
  const dayArray = Array.from(Array(numDays).keys())
  const initialSchedule = Array.from(dayArray, () =>
    new Array(48).fill({ isOccupied: false, id: 0 })
  )

  classEvents.forEach((slot: ClassEvent) => {
    const { startDate, endDate } = slot
    const day = getDayIndex(startDate)
    const startTime = startDate.getHours()
    const duration = endDate.getHours() - startDate.getHours()

    for (let i = 0; i < duration; i++) {
      initialSchedule[day][startTime + i] = {
        isOccupied: true,
        id: slot.id,
      }
    }
  })

  return initialSchedule
}

export const createInitialSchedule = (
  classEvents: ClassEvent[],
  numDays: number
) => {
  const dayArray = Array.from(Array(numDays).keys())
  const initialSchedule = Array.from(dayArray, () => new Array(48).fill(null))
  classEvents.forEach((slot) => {
    const { startDate, endDate, title } = slot
    const day = getDayIndex(startDate)
    const startTime = startDate.getHours()
    const durationInMinutes =
      endDate.getHours() * 60 +
      endDate.getMinutes() -
      (startDate.getHours() * 60 + startDate.getMinutes())

    const durationInHours = durationInMinutes / 60
    initialSchedule[day][startTime] = {
      classStart: true,
      startDate,
      endDate,
      duration: durationInHours,
      id: slot.id,
      title,
    }
  })

  return initialSchedule
}

export const getNearestHalfHour = (date: Date) => {
  const dateToNearestHalfHour = new Date(date)
  const isPastHalfHourMark = dateToNearestHalfHour.getMinutes() >= 30

  dateToNearestHalfHour.setMinutes(isPastHalfHourMark ? 0 : 30, 0, 0)
  dateToNearestHalfHour.setHours(
    isPastHalfHourMark
      ? dateToNearestHalfHour.getHours() + 1
      : dateToNearestHalfHour.getHours()
  )

  return dateToNearestHalfHour
}

export const getDefaultStartAndEndDates = (): {
  defaultStartDate: Date
  defaultEndDate: Date
} => {
  const today = new Date()

  const defaultStartDate = getNearestHalfHour(today)
  const defaultEndDate = new Date(defaultStartDate)
  defaultEndDate.setHours(defaultEndDate.getHours() + 1)

  return { defaultStartDate, defaultEndDate }
}
