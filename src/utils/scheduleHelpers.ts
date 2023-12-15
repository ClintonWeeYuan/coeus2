import { ClassEvent } from '@prisma/client'

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

export const createOccupyList = (
  classEvents: ClassEvent[],
  weekdays: Date[]
) => {
  const initialSchedule = Array.from(weekdays, () =>
    new Array(24).fill({ isOccupied: false, id: 0 })
  )

  classEvents.forEach((slot: ClassEvent) => {
    const { startDate, endDate } = slot
    const day = startDate.getDay()
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
  weekdays: Date[]
) => {
  const initialSchedule = Array.from(weekdays, () => new Array(24).fill(null))
  classEvents.forEach((slot) => {
    const { startDate, endDate, title } = slot
    const day = startDate.getDay() - 1
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
