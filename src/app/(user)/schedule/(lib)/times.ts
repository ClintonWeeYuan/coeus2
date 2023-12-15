export const TIME_ARRAY = Array.from(Array(24), (_, index) => {
  if (index == 0) return '12:00 AM'

  return `${index < 10 ? '0' : ''}${index}:00 ${index < 12 ? 'AM' : 'PM'}`
})
