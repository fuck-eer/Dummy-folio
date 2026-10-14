"use client"

import { useEffect, useState } from "react"

export const sceneInput = {
  scroll: 0,
  pointerX: 0,
  pointerY: 0,
  reduced: false,
  compact: false,
  finePointer: false,
}

let started = false

export function ensureSceneInput() {
  if (started || typeof window === "undefined") return
  started = true

  const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)")
  const compactMq = window.matchMedia("(max-width: 767px)")
  const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)")

  const sync = () => {
    sceneInput.reduced = reducedMq.matches
    sceneInput.compact = compactMq.matches
    sceneInput.finePointer = fineMq.matches && !compactMq.matches
    if (!sceneInput.finePointer || sceneInput.reduced) {
      sceneInput.pointerX = 0
      sceneInput.pointerY = 0
    }
  }

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    sceneInput.scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  }

  const onPointer = (event: PointerEvent) => {
    if (!sceneInput.finePointer || sceneInput.reduced) return
    sceneInput.pointerX = (event.clientX / window.innerWidth) * 2 - 1
    sceneInput.pointerY = -((event.clientY / window.innerHeight) * 2 - 1)
  }

  sync()
  onScroll()
  reducedMq.addEventListener("change", sync)
  compactMq.addEventListener("change", sync)
  fineMq.addEventListener("change", sync)
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })
  window.addEventListener("pointermove", onPointer, { passive: true })
}

function readQuality() {
  if (typeof window === "undefined") {
    return { compact: true, reduced: false, ready: false }
  }
  return {
    compact: window.matchMedia("(max-width: 767px)").matches,
    reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ready: true,
  }
}

export function useSceneQuality() {
  const [quality, setQuality] = useState(readQuality)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    ensureSceneInput()
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const compactMq = window.matchMedia("(max-width: 767px)")
    const sync = () => setQuality(readQuality())
    const onVisibility = () => setVisible(!document.hidden)
    reducedMq.addEventListener("change", sync)
    compactMq.addEventListener("change", sync)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      reducedMq.removeEventListener("change", sync)
      compactMq.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return { ...quality, visible }
}
