"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"

import { readPalette, type ScenePalette } from "@/components/scene/palette"
import { sceneInput, useSceneQuality } from "@/components/scene/scene-input"

const fieldMotion = { scroll: 0, px: 0, py: 0, time: 0 }

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function Field({
  count,
  seed,
  color,
  size,
  opacity,
  spread,
}: {
  count: number
  seed: number
  color: string
  size: number
  opacity: number
  spread: number
}) {
  const geometry = useMemo(() => {
    const rand = mulberry32(seed)
    const base = new Float32Array(count * 3)
    const phase = new Float32Array(count)
    for (let i = 0; i < count; i += 1) {
      base[i * 3] = (rand() - 0.5) * 18
      base[i * 3 + 1] = (rand() - 0.5) * 11
      base[i * 3 + 2] = (rand() - 0.5) * 7
      phase[i] = rand() * Math.PI * 2
    }
    const next = new THREE.BufferGeometry()
    next.setAttribute("position", new THREE.BufferAttribute(base.slice(), 3))
    next.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 40)
    next.userData.base = base
    next.userData.phase = phase
    return next
  }, [count, seed])

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    [color, opacity, size],
  )

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  useFrame(() => {
    const base = geometry.userData.base as Float32Array
    const phase = geometry.userData.phase as Float32Array
    const positions = geometry.getAttribute("position") as THREE.BufferAttribute
    const scroll = fieldMotion.scroll
    const time = fieldMotion.time
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      const x = base[i3]
      const y = base[i3 + 1]
      const z = base[i3 + 2]
      const idle = Math.sin(time * 0.28 + phase[i]) * 0.12 * spread
      const wave = Math.sin(x * 0.62 + phase[i] + scroll * 5.2) * (0.18 + scroll * 1.05) * spread
      const depth = (z + 3.5) / 7
      positions.setXYZ(
        i,
        x + Math.cos(time * 0.15 + phase[i]) * 0.05 + fieldMotion.px * (0.4 + depth * 0.85),
        y * (1 - scroll * 0.5) + idle * (1 - scroll) + wave * scroll + fieldMotion.py * 0.28,
        z + scroll * 0.7,
      )
    }
    positions.needsUpdate = true
  })

  return <points geometry={geometry} material={material} frustumCulled={false} />
}

function BackdropWorld({ palette, compact }: { palette: ScenePalette; compact: boolean }) {
  const group = useRef<THREE.Group>(null)
  const shown = useRef({ scroll: 0, px: 0, py: 0 })
  const dust = compact ? 58 : 170
  const embers = compact ? 12 : 32

  useFrame(({ camera, clock }, delta) => {
    const reduced = sceneInput.reduced
    const targetScroll = reduced ? 0 : sceneInput.scroll
    const targetX = !reduced && sceneInput.finePointer ? sceneInput.pointerX : 0
    const targetY = !reduced && sceneInput.finePointer ? sceneInput.pointerY : 0
    const ease = reduced ? 1 : 1 - Math.pow(0.001, delta)
    shown.current.scroll = THREE.MathUtils.lerp(shown.current.scroll, targetScroll, ease)
    shown.current.px = THREE.MathUtils.lerp(shown.current.px, targetX, ease)
    shown.current.py = THREE.MathUtils.lerp(shown.current.py, targetY, ease)

    const scroll = shown.current.scroll
    const time = reduced ? 0 : clock.elapsedTime
    fieldMotion.scroll = scroll
    fieldMotion.px = shown.current.px
    fieldMotion.py = shown.current.py
    fieldMotion.time = time

    camera.position.x = shown.current.px * 0.9
    camera.position.y = shown.current.py * 0.42 + scroll * 1.05
    camera.position.z = 8.4 - scroll * 2.05
    camera.lookAt(0, scroll * 0.35, 0)

    if (group.current) {
      group.current.rotation.y = scroll * 0.55
      group.current.rotation.z = scroll * 0.28 + (reduced ? 0 : Math.sin(time * 0.08) * 0.03)
    }
  }, -1)

  return (
    <group ref={group}>
      <Field
        count={dust}
        seed={11}
        color={palette.mist}
        size={compact ? 0.055 : 0.05}
        opacity={palette.dark ? 0.5 : 0.36}
        spread={1}
      />
      <Field
        count={embers}
        seed={29}
        color={palette.amber}
        size={compact ? 0.09 : 0.08}
        opacity={palette.dark ? 0.9 : 0.62}
        spread={0.7}
      />
    </group>
  )
}

function MotionGate({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    invalidate()
  }, [active, invalidate])
  return null
}

export default function BackdropCanvas() {
  const { resolvedTheme } = useTheme()
  const quality = useSceneQuality()
  const palette = useMemo<ScenePalette | null>(() => {
    if (!resolvedTheme) return null
    return readPalette(resolvedTheme === "dark")
  }, [resolvedTheme])

  if (!palette || !quality.ready) return null

  const animate = !quality.reduced && quality.visible

  return (
    <Canvas
      key={quality.compact ? "compact" : "full"}
      flat
      camera={{ position: [0, 0, 8.4], fov: 42 }}
      dpr={quality.compact ? [1, 1] : [1, 1.25]}
      frameloop={animate ? "always" : "demand"}
      gl={{
        alpha: true,
        antialias: false,
        premultipliedAlpha: false,
        powerPreference: quality.compact ? "low-power" : "high-performance",
        stencil: false,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <BackdropWorld palette={palette} compact={quality.compact} />
      <MotionGate active={animate} />
    </Canvas>
  )
}
