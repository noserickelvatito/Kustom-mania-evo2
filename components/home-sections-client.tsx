'use client'

import { ScrollReveal } from './scroll-reveal'
import type { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  delay?: number
}

export function StatsSection({ children }: SectionWrapperProps) {
  return (
    <ScrollReveal>
      {children}
    </ScrollReveal>
  )
}

export function MotorcyclesSection({ children }: SectionWrapperProps) {
  return (
    <ScrollReveal delay={100}>
      {children}
    </ScrollReveal>
  )
}

export function WhyKustomSection({ children }: SectionWrapperProps) {
  return (
    <ScrollReveal delay={150}>
      {children}
    </ScrollReveal>
  )
}

export function HowItWorksSection({ children }: SectionWrapperProps) {
  return (
    <ScrollReveal delay={100}>
      {children}
    </ScrollReveal>
  )
}

export function FAQSectionWrapper({ children }: SectionWrapperProps) {
  return (
    <ScrollReveal delay={100}>
      {children}
    </ScrollReveal>
  )
}

export function FinalCTASection({ children }: SectionWrapperProps) {
  return (
    <ScrollReveal delay={150}>
      {children}
    </ScrollReveal>
  )
}
