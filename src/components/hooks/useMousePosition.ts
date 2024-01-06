import { useEffect, useState, useRef, useCallback } from 'react'
import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts'
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

  const updateMousePosition = useCallback(
    (ev: MouseEvent) => {
      const topOfElement = ref.getBoundingClientRect().top
      const leftOfElement = ref.getBoundingClientRect().left
      const mouseXPosition = ev.clientX ?? 0
      const mouseYPosition = ev.clientY ?? 0

      const mouseRelativeX = mouseXPosition - leftOfElement
      const mouseRelativeY = mouseYPosition - topOfElement
      setMousePosition({ x: mouseRelativeX, y: mouseRelativeY })
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
