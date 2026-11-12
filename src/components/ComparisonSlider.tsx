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
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-img shadow-card-xl border-4 border-white aspect-[4/3] cursor-ew-resize select-none touch-pan-y"
      onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); handleMove(e.clientX) }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX) }}
    >
      {/* AFTER — full width base layer */}
      <img src={afterImage} alt={`${afterAlt} — after`} className="absolute inset-0 block w-full h-full object-cover object-top" draggable={false} />

      {/* BEFORE — same box as AFTER, revealed with clip-path so both images stay aligned */}
      <div
        className="absolute inset-0 z-20"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${afterAlt} — before`}
          className="block w-full h-full object-cover object-top"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute top-6 left-6 bg-brand-charcoal/80 text-white px-4 py-2 rounded-btn font-bold text-xs-fine tracking-widest z-30">
          BEFORE
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-[25] w-1 bg-brand-cta pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      />

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
