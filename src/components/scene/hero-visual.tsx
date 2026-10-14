"use client"

import dynamic from "next/dynamic"

const HeroCanvas = dynamic(() => import("@/components/scene/hero-canvas"), {
  ssr: false,
})

export function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="A three-dimensional network of connected systems"
      className="relative mx-auto aspect-square w-full max-w-[460px]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-card ring-1 ring-foreground/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,color-mix(in_oklch,var(--copper)_24%,transparent),transparent_66%)]" />
        <HeroCanvas />
      </div>
    </div>
  )
}
