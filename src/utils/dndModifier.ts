import type { Modifier } from '@dnd-kit/core'

export function createCalendarModifier(
  width: number,
  height: number
): Modifier {
  return ({ transform }) => ({
    ...transform,
    x: Math.ceil(transform.x / width) * width,
    y: Math.ceil(transform.y / height) * height,
  })
}
