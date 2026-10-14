"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

import { readPalette, type ScenePalette } from "@/components/scene/palette"
import { sceneInput, useSceneQuality } from "@/components/scene/scene-input"

type Node = { position: THREE.Vector3; hub: boolean }

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildSystem(compact: boolean) {
  const rand = mulberry32(20261014)
  const specs = compact
    ? [
        { center: [-0.52, 0.32, 0.1] as const, count: 4, spread: 0.24 },
        { center: [0.56, 0.12, -0.04] as const, count: 4, spread: 0.22 },
        { center: [0.02, -0.46, 0.12] as const, count: 4, spread: 0.22 },
      ]
    : [
        { center: [-0.58, 0.36, 0.14] as const, count: 7, spread: 0.3 },
        { center: [0.66, 0.12, -0.06] as const, count: 7, spread: 0.28 },
        { center: [0.02, -0.5, 0.16] as const, count: 6, spread: 0.28 },
      ]

  const clusters: Node[][] = specs.map((spec) => {
    const center = new THREE.Vector3(...spec.center)
    const nodes: Node[] = []
    for (let i = 0; i < spec.count; i += 1) {
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const radius = spec.spread * (0.42 + rand() * 0.58)
      nodes.push({
        position: new THREE.Vector3(
          center.x + Math.sin(phi) * Math.cos(theta) * radius,
          center.y + Math.cos(phi) * radius,
          center.z + Math.sin(phi) * Math.sin(theta) * radius,
        ),
        hub: false,
      })
    }
    let hubIndex = 0
    let nearest = Infinity
    nodes.forEach((node, index) => {
      const distance = node.position.distanceTo(center)
      if (distance < nearest) {
        nearest = distance
        hubIndex = index
      }
    })
    nodes[hubIndex].hub = true
    return nodes
  })

  const links: number[] = []
  const seen = new Set<string>()
  const addLink = (key: string, a: THREE.Vector3, b: THREE.Vector3) => {
    if (seen.has(key)) return
    seen.add(key)
    links.push(a.x, a.y, a.z, b.x, b.y, b.z)
  }

  clusters.forEach((nodes, clusterIndex) => {
    const hub = nodes.find((node) => node.hub)
    if (!hub) return
    nodes.forEach((node, index) => {
      if (!node.hub) {
        addLink(`${clusterIndex}:hub:${index}`, node.position, hub.position)
      }
      const nearest = nodes
        .map((other, otherIndex) => ({
          otherIndex,
          distance: index === otherIndex ? Infinity : node.position.distanceTo(other.position),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 2)
      nearest.forEach(({ otherIndex }) => {
        const [lo, hi] = index < otherIndex ? [index, otherIndex] : [otherIndex, index]
        addLink(`${clusterIndex}:${lo}-${hi}`, nodes[lo].position, nodes[hi].position)
      })
    })
  })

  const hubs = clusters.flatMap((nodes) => nodes.filter((node) => node.hub))
  const bridges: [THREE.Vector3, THREE.Vector3][] = []
  for (let i = 0; i < hubs.length; i += 1) {
    for (let j = i + 1; j < hubs.length; j += 1) {
      bridges.push([hubs[i].position, hubs[j].position])
      addLink(`bridge:${i}-${j}`, hubs[i].position, hubs[j].position)
    }
  }

  return {
    satellites: clusters.flatMap((nodes) => nodes.filter((node) => !node.hub)),
    hubs,
    bridges,
    links: new Float32Array(links),
  }
}

function placeInstances(mesh: THREE.InstancedMesh, nodes: Node[], radius: number) {
  const dummy = new THREE.Object3D()
  nodes.forEach((node, index) => {
    dummy.position.copy(node.position)
    dummy.scale.setScalar(radius)
    dummy.rotation.set(0, 0, 0)
    dummy.updateMatrix()
    mesh.setMatrixAt(index, dummy.matrix)
  })
  mesh.instanceMatrix.needsUpdate = true
  mesh.computeBoundingSphere()
}

function System({ palette, compact }: { palette: ScenePalette; compact: boolean }) {
  const system = useMemo(() => buildSystem(compact), [compact])
  const rig = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const hubsRef = useRef<THREE.InstancedMesh>(null)
  const satellitesRef = useRef<THREE.InstancedMesh>(null)
  const packetsRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const satelliteGeometry = useMemo(
    () => new THREE.SphereGeometry(1, compact ? 12 : 18, compact ? 12 : 18),
    [compact],
  )
  const hubGeometry = useMemo(
    () => new THREE.SphereGeometry(1, compact ? 14 : 22, compact ? 14 : 22),
    [compact],
  )
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(system.links, 3))
    return geometry
  }, [system.links])
  const satelliteMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: palette.mist }),
    [palette.mist],
  )
  const hubMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: palette.amber }),
    [palette.amber],
  )
  const packetMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: palette.amber }),
    [palette.amber],
  )
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: palette.amber,
        transparent: true,
        opacity: palette.dark ? 0.72 : 0.55,
      }),
    [palette.amber, palette.dark],
  )
  const wireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: palette.ink,
        wireframe: true,
        transparent: true,
        opacity: palette.dark ? 0.3 : 0.22,
      }),
    [palette.dark, palette.ink],
  )
  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: palette.amber,
        transparent: true,
        opacity: palette.dark ? 0.9 : 0.75,
      }),
    [palette.amber, palette.dark],
  )

  useEffect(
    () => () => {
      satelliteGeometry.dispose()
      hubGeometry.dispose()
      lineGeometry.dispose()
      satelliteMaterial.dispose()
      hubMaterial.dispose()
      packetMaterial.dispose()
      lineMaterial.dispose()
      wireMaterial.dispose()
      ringMaterial.dispose()
    },
    [
      hubGeometry,
      hubMaterial,
      lineGeometry,
      lineMaterial,
      packetMaterial,
      ringMaterial,
      satelliteGeometry,
      satelliteMaterial,
      wireMaterial,
    ],
  )

  useLayoutEffect(() => {
    if (satellitesRef.current) placeInstances(satellitesRef.current, system.satellites, compact ? 0.042 : 0.034)
    if (hubsRef.current) placeInstances(hubsRef.current, system.hubs, compact ? 0.072 : 0.058)
    if (spin.current) spin.current.rotation.set(0.34, 0.68, -0.06)
  }, [compact, system.hubs, system.satellites])

  useFrame((_, delta) => {
    const reduced = sceneInput.reduced
    const pointerX = !reduced && sceneInput.finePointer ? sceneInput.pointerX : 0
    const pointerY = !reduced && sceneInput.finePointer ? sceneInput.pointerY : 0
    const scroll = reduced ? 0 : sceneInput.scroll

    if (spin.current && !reduced) {
      spin.current.rotation.y += delta * 0.16
    }
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(
        rig.current.rotation.y,
        pointerX * 0.16 + scroll * 0.4,
        0.06,
      )
      rig.current.rotation.x = THREE.MathUtils.lerp(
        rig.current.rotation.x,
        -pointerY * 0.1 - scroll * 0.18,
        0.06,
      )
    }

    const hubs = hubsRef.current
    if (hubs) {
      system.hubs.forEach((node, index) => {
        const pulse = reduced ? 1 : 1 + Math.sin(performance.now() * 0.0016 + index * 1.4) * 0.08
        dummy.position.copy(node.position)
        dummy.scale.setScalar((compact ? 0.072 : 0.058) * pulse)
        dummy.updateMatrix()
        hubs.setMatrixAt(index, dummy.matrix)
      })
      hubs.instanceMatrix.needsUpdate = true
    }

    const packets = packetsRef.current
    if (packets) {
      system.bridges.forEach(([from, to], index) => {
        const travel = reduced ? 0.28 + index * 0.22 : (performance.now() * 0.00018 + index * 0.33) % 1
        dummy.position.lerpVectors(from, to, travel)
        dummy.scale.setScalar(compact ? 0.03 : 0.024)
        dummy.updateMatrix()
        packets.setMatrixAt(index, dummy.matrix)
      })
      packets.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={rig}>
      <group ref={spin}>
        <lineSegments geometry={lineGeometry} material={lineMaterial} />
        <instancedMesh
          ref={satellitesRef}
          args={[satelliteGeometry, satelliteMaterial, system.satellites.length]}
        />
        <instancedMesh ref={hubsRef} args={[hubGeometry, hubMaterial, system.hubs.length]} />
        <instancedMesh
          ref={packetsRef}
          args={[satelliteGeometry, packetMaterial, system.bridges.length]}
        />
        <mesh material={wireMaterial}>
          <icosahedronGeometry args={[1.14, 0]} />
        </mesh>
        <mesh material={ringMaterial} rotation={[1.02, 0.25, 0.35]}>
          <torusGeometry args={[1.2, 0.007, 8, compact ? 64 : 96]} />
        </mesh>
      </group>
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

export default function HeroCanvas() {
  const { resolvedTheme } = useTheme()
  const quality = useSceneQuality()
  const frameRef = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(true)
  const palette = useMemo<ScenePalette | null>(() => {
    if (!resolvedTheme) return null
    return readPalette(resolvedTheme === "dark")
  }, [resolvedTheme])

  useEffect(() => {
    const node = frameRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      setOnScreen(entry.isIntersecting)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const animate = quality.ready && !quality.reduced && quality.visible && onScreen

  return (
    <div ref={frameRef} className="absolute inset-0">
      {palette ? (
        <Canvas
          key={quality.compact ? "compact" : "full"}
          flat
          camera={{ position: [0.15, 0.04, 4.35], fov: 34 }}
          dpr={quality.compact ? [1, 1.15] : [1, 1.5]}
          frameloop={animate ? "always" : "demand"}
          gl={{
            alpha: true,
            antialias: true,
            premultipliedAlpha: false,
            powerPreference: quality.compact ? "low-power" : "high-performance",
            stencil: false,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <System palette={palette} compact={quality.compact} />
          <MotionGate active={animate} />
        </Canvas>
      ) : null}
    </div>
  )
}
