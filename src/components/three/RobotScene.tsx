'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ── Materials ─────────────────────────────────────────── */
const MAT_BODY   = new THREE.MeshStandardMaterial({ color: '#21262d', metalness: 0.85, roughness: 0.15 })
const MAT_ACCENT = new THREE.MeshStandardMaterial({ color: '#3fb950', emissive: '#3fb950', emissiveIntensity: 0.6, metalness: 0.6, roughness: 0.3 })
const MAT_JOINT  = new THREE.MeshStandardMaterial({ color: '#30363d', metalness: 0.9, roughness: 0.1 })
const MAT_EYE    = new THREE.MeshStandardMaterial({ color: '#58a6ff', emissive: '#58a6ff', emissiveIntensity: 2.0, roughness: 0 })
const MAT_PANEL  = new THREE.MeshStandardMaterial({ color: '#58a6ff', emissive: '#58a6ff', emissiveIntensity: 0.2, transparent: true, opacity: 0.55, roughness: 0.4 })
const MAT_ANT    = new THREE.MeshStandardMaterial({ color: '#3fb950', emissive: '#3fb950', emissiveIntensity: 1.5, roughness: 0 })

/* ── Box helper ────────────────────────────────────────── */
function Box({ pos, size, mat }: { pos: [number, number, number]; size: [number, number, number]; mat: THREE.Material }) {
  return (
    <mesh position={pos} material={mat}>
      <boxGeometry args={size} />
    </mesh>
  )
}

/* ── Arm assembly ──────────────────────────────────────── */
function Arm({ side, swing }: { side: 1 | -1; swing: number }) {
  const upper = useRef<THREE.Group>(null)
  const lower = useRef<THREE.Group>(null)

  useFrame(() => {
    if (upper.current) upper.current.rotation.x = swing * side * 0.5
    if (lower.current) lower.current.rotation.x = Math.abs(swing) * 0.3
  })

  return (
    <group position={[side * 0.78, 0.3, 0]}>
      {/* shoulder joint */}
      <mesh material={MAT_ACCENT}>
        <sphereGeometry args={[0.12, 8, 8]} />
      </mesh>
      <group ref={upper}>
        <Box pos={[0, -0.4, 0]} size={[0.24, 0.68, 0.24]} mat={MAT_BODY} />
        {/* elbow joint */}
        <mesh position={[0, -0.78, 0]} material={MAT_JOINT}>
          <sphereGeometry args={[0.1, 8, 8]} />
        </mesh>
        <group ref={lower}>
          <Box pos={[0, -1.18, 0]} size={[0.2, 0.6, 0.2]} mat={MAT_BODY} />
          {/* hand */}
          <Box pos={[0, -1.56, 0]} size={[0.22, 0.18, 0.18]} mat={MAT_ACCENT} />
        </group>
      </group>
    </group>
  )
}

/* ── Leg assembly ──────────────────────────────────────── */
function Leg({ side, swing }: { side: 1 | -1; swing: number }) {
  const thigh = useRef<THREE.Group>(null)
  const shin  = useRef<THREE.Group>(null)

  useFrame(() => {
    if (thigh.current) thigh.current.rotation.x = -swing * side * 0.35
    if (shin.current)  shin.current.rotation.x  = Math.max(0, swing * side) * 0.4
  })

  return (
    <group position={[side * 0.3, -0.95, 0]}>
      {/* hip joint */}
      <mesh material={MAT_ACCENT}>
        <sphereGeometry args={[0.13, 8, 8]} />
      </mesh>
      <group ref={thigh}>
        <Box pos={[0, -0.42, 0]} size={[0.3, 0.72, 0.3]} mat={MAT_BODY} />
        {/* knee joint */}
        <mesh position={[0, -0.82, 0]} material={MAT_JOINT}>
          <sphereGeometry args={[0.11, 8, 8]} />
        </mesh>
        <group ref={shin}>
          <Box pos={[0, -1.22, 0]} size={[0.26, 0.68, 0.26]} mat={MAT_BODY} />
          {/* foot */}
          <Box pos={[0, -1.62, side * 0.06]} size={[0.3, 0.14, 0.46]} mat={MAT_ACCENT} />
        </group>
      </group>
    </group>
  )
}

/* ── Robot ─────────────────────────────────────────────── */
function Robot() {
  const root    = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const eyeL    = useRef<THREE.Mesh>(null)
  const eyeR    = useRef<THREE.Mesh>(null)
  const antTop  = useRef<THREE.Mesh>(null)

  const swingRef = useRef(0)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    /* root bob + subtle rotation */
    if (root.current) {
      root.current.position.y = Math.sin(t * 0.9) * 0.07
      root.current.rotation.y = Math.sin(t * 0.4) * 0.08
    }

    /* head gentle look */
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.12
      headRef.current.rotation.x = Math.sin(t * 0.3) * 0.05
    }

    /* walking swing */
    swingRef.current = Math.sin(t * 1.8)

    /* eye blink */
    const blink = Math.sin(t * 0.7) > 0.95 ? 0.1 : 1
    if (eyeL.current) eyeL.current.scale.y = blink
    if (eyeR.current) eyeR.current.scale.y = blink

    /* antenna pulse */
    if (antTop.current) {
      const mat = antTop.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1.0 + Math.sin(t * 3) * 0.8
    }
  })

  return (
    <group ref={root} position={[0, 0.3, 0]}>

      {/* ── HEAD ── */}
      <group ref={headRef} position={[0, 1.22, 0]}>
        {/* skull */}
        <Box pos={[0, 0, 0]} size={[0.9, 0.75, 0.7]} mat={MAT_BODY} />
        {/* visor recess */}
        <Box pos={[0, 0.04, 0.32]} size={[0.68, 0.26, 0.08]} mat={MAT_PANEL} />
        {/* eyes */}
        <mesh ref={eyeL} position={[-0.2, 0.04, 0.38]} material={MAT_EYE}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>
        <mesh ref={eyeR} position={[0.2, 0.04, 0.38]} material={MAT_EYE}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>
        {/* ear grilles */}
        <Box pos={[-0.48, 0, 0]} size={[0.06, 0.3, 0.3]} mat={MAT_JOINT} />
        <Box pos={[0.48, 0, 0]}  size={[0.06, 0.3, 0.3]} mat={MAT_JOINT} />
        {/* antenna stem */}
        <mesh position={[0, 0.52, 0]} material={MAT_ACCENT}>
          <cylinderGeometry args={[0.03, 0.03, 0.38, 8]} />
        </mesh>
        {/* antenna top */}
        <mesh ref={antTop} position={[0, 0.74, 0]} material={MAT_ANT}>
          <sphereGeometry args={[0.07, 10, 10]} />
        </mesh>
      </group>

      {/* neck */}
      <mesh position={[0, 0.82, 0]} material={MAT_JOINT}>
        <cylinderGeometry args={[0.12, 0.15, 0.22, 8]} />
      </mesh>

      {/* ── BODY ── */}
      <Box pos={[0, 0.1, 0]} size={[1.1, 1.1, 0.72]} mat={MAT_BODY} />
      {/* chest panel */}
      <Box pos={[0, 0.22, 0.37]} size={[0.6, 0.32, 0.06]} mat={MAT_PANEL} />
      {/* chest indicator lights */}
      <mesh position={[-0.18, 0.1, 0.38]} material={MAT_ACCENT}>
        <sphereGeometry args={[0.06, 8, 8]} />
      </mesh>
      <mesh position={[0, 0.1, 0.38]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#58a6ff" emissive="#58a6ff" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0.18, 0.1, 0.38]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#f78166" emissive="#f78166" emissiveIntensity={1.2} />
      </mesh>
      {/* waist */}
      <Box pos={[0, -0.52, 0]} size={[1.0, 0.18, 0.66]} mat={MAT_JOINT} />

      {/* ── ARMS ── */}
      <Arm side={-1} swing={swingRef.current} />
      <Arm side={1}  swing={swingRef.current} />

      {/* ── LEGS ── */}
      <Leg side={-1} swing={swingRef.current} />
      <Leg side={1}  swing={swingRef.current} />

    </group>
  )
}

/* ── Scene ─────────────────────────────────────────────── */
export default function RobotScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.2], fov: 42 }}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 4, 3]}  color="#3fb950" intensity={6} distance={12} />
      <pointLight position={[-3, 2, 2]} color="#58a6ff" intensity={4} distance={10} />
      <pointLight position={[0, -2, 3]} color="#ffffff" intensity={1.5} distance={8} />

      <Float speed={0} rotationIntensity={0} floatIntensity={0}>
        <Robot />
      </Float>

      <Environment preset="city" environmentIntensity={0.15} />
    </Canvas>
  )
}
