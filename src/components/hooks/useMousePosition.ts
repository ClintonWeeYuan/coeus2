import { useState, useCallback } from 'react'
import { useEventListener } from 'usehooks-ts'

interface MousePosition {
  x: number | null
  y: number | null
}
export function useMousePosition<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  MousePosition,
] {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  })

  const [ref, setRef] = useState<T | null>(null)

  const snapMouseYPosition = (mouseYPosition: number) => {
    return Math.min(23 * 80, Math.round(mouseYPosition / 40) * 40)
  }

  const updateMousePosition = useCallback(
    (ev: MouseEvent) => {
      const topOfElement = ref?.getBoundingClientRect().top || 0
      const leftOfElement = ref?.getBoundingClientRect().left || 0

      const scrollHeight = ref?.scrollTop || 0

      const mouseXPosition = ev.clientX ?? 0
      const mouseYPosition = ev.clientY ?? 0

      const mouseRelativeX = mouseXPosition - leftOfElement
      const mouseRelativeY = mouseYPosition - topOfElement + scrollHeight

      setMousePosition({
        x: mouseRelativeX,
        y: snapMouseYPosition(mouseRelativeY),
      })
    },
    [ref]
  )

  useEventListener('mousemove', updateMousePosition)
  /*
  useEffect(() => {
    if (!ref) return
    const updateMousePosition = (ev: MouseEvent) => {}

    ref.addEventListener('mousemove', updateMousePosition)
    return () => {
      ref.removeEventListener('mousemove', updateMousePosition)
    }
  }, [ref])
  */

  return [setRef, mousePosition]
}
