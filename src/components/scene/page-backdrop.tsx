"use client"

import dynamic from "next/dynamic"

const BackdropCanvas = dynamic(() => import("@/components/scene/backdrop-canvas"), {
  ssr: false,
})

export function PageBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent,black_64px,black_94%,transparent)]"
    >
      <BackdropCanvas />
    </div>
  )
}
