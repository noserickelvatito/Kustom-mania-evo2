"use client"

import { useEffect, useCallback, useRef } from "react"
import {
  trackEvent,
  trackViewItem,
  trackGenerateLead,
  trackFormSubmit,
  trackSearch,
  trackScroll,
  trackViewItemList,
  type GAEventParams,
  type GAProductParams,
  type GASearchParams,
} from "@/lib/analytics"

/**
 * Custom hook for Google Analytics 4 tracking
 */
export function useAnalytics() {
  return {
    trackEvent,
    trackViewItem,
    trackGenerateLead,
    trackFormSubmit,
    trackSearch,
    trackScroll,
    trackViewItemList,
  }
}

/**
 * Hook to track scroll depth
 * Tracks at 25%, 50%, 75%, and 100% scroll
 */
export function useScrollTracking(pagePath: string) {
  const scrollTrackedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)

      // Track at key milestones
      const milestones = [25, 50, 75, 100]
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !scrollTrackedRef.current.has(milestone)) {
          scrollTrackedRef.current.add(milestone)
          trackScroll({
            percent: milestone,
            page_path: pagePath,
          })
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pagePath])
}

/**
 * Hook to track product view on mount
 */
export function useProductView(product: GAProductParams | null) {
  const trackedRef = useRef(false)

  useEffect(() => {
    if (product && !trackedRef.current) {
      trackedRef.current = true
      trackViewItem(product)
    }
  }, [product])
}

/**
 * Hook to track search/filter changes
 */
export function useSearchTracking() {
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  const trackSearchDebounced = useCallback((params: GASearchParams) => {
    // Debounce search tracking to avoid too many events
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      trackSearch(params)
    }, 1000)
  }, [])

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  return trackSearchDebounced
}
