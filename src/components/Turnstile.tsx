"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

interface TurnstileProps {
  onToken: (token: string) => void
}

export default function Turnstile({ onToken }: TurnstileProps) {
  const ref = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey) {
      console.warn("[Turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set — skipping widget render.")
      return
    }

    const renderWidget = () => {
      if (!window.turnstile || widgetId.current) return
      try {
        widgetId.current = window.turnstile.render(el, {
          sitekey: siteKey,
          callback: (token: string) => onToken(token),
          "refresh-expired": "auto",
        })
      } catch (err) {
        console.error("[Turnstile] Failed to render widget:", err)
      }
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval)
          renderWidget()
        }
      }, 100)
      return () => clearInterval(interval)
    }

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [onToken])

  return <div ref={ref} />
}
