'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type Props = {
  afterImage: string
  afterAlt: string
  // beforeImage will come from DB — for now we simulate "before" with a CSS filter
  beforeImage?: string
}

export function ComparisonSlider({ afterImage, afterAlt, beforeImage }: Props) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setContainerWidth(el.offsetWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSliderPosition((x / rect.width) * 100)
  }, [])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (isDragging) handleMove(e.clientX) }
    const onTouchMove = (e: TouchEvent) => { if (isDragging) handleMove(e.touches[0].clientX) }
    const onEnd = () => setIsDragging(false)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('mouseup', onEnd)
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseup', onEnd)
      window.removeEventListener('touchend', onEnd)
    }
  }, [isDragging, handleMove])

  const before = beforeImage ?? afterImage
  const isRealBefore = !!beforeImage

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-img shadow-card-xl border-4 border-white aspect-[4/3] cursor-ew-resize select-none"
      onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); handleMove(e.clientX) }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX) }}
    >
      {/* AFTER — full width base layer */}
      <img src={afterImage} alt={`${afterAlt} — after`} className="block w-full h-full object-cover object-top" />

      {/* BEFORE — clipped overlay */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden z-20 border-r-4 border-brand-cta"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={before}
          alt={`${afterAlt} — before`}
          className={`block h-full object-cover object-top${isRealBefore ? '' : ' grayscale brightness-75'}`}
          style={{ width: containerWidth || '100%', maxWidth: 'none' }}
        />
        <div className="absolute top-6 left-6 bg-brand-charcoal/80 text-white px-4 py-2 rounded-btn font-bold text-xs-fine tracking-widest z-30">
          BEFORE
        </div>
      </div>

      {/* AFTER label */}
      <div className="absolute top-6 right-6 bg-brand-gold text-white px-4 py-2 rounded-btn font-bold text-xs-fine tracking-widest z-30">
        AFTER
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-1/2 z-30 w-12 h-12 bg-brand-cta rounded-full flex items-center justify-center shadow-card-xl pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
      >
        <svg className="w-6 h-6 text-brand-charcoal" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
          <path d="M8.59 16.59L13.17 12 8.61 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </div>
    </div>
  )
}
