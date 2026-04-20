'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Center } from '@react-three/drei'
import * as THREE from 'three'

/* ── joint state ────────────────────────────────────────── */
interface Joints {
  base:     number   // mainColumn  – Y axis
  shoulder: number   // upperArm    – X axis
  elbow:    number   // elbow       – X axis
  wrist:    number   // wrist       – X axis
}

const POSES: Record<string, Joints> = {
  default: { base: 0,    shoulder: -0.3, elbow: 0.6,  wrist: -0.3 },
  reach:   { base: 0.6,  shoulder: -0.8, elbow: 1.2,  wrist: -0.5 },
  pick:    { base: -0.4, shoulder: -1.1, elbow: 1.4,  wrist: 0.2  },
  extend:  { base: 0,    shoulder: -0.1, elbow: 0.1,  wrist: -0.1 },
}

/* ── 3‑D arm (inside Canvas) ────────────────────────────── */
function Arm({ joints }: { joints: Joints }) {
  const { nodes, scene } = useGLTF('/robot.glb') as any
  const cur = useRef<Joints>({ ...POSES.default })

  useFrame(() => {
    const s = 0.09
    cur.current.base     = THREE.MathUtils.lerp(cur.current.base,     joints.base,     s)
    cur.current.shoulder = THREE.MathUtils.lerp(cur.current.shoulder, joints.shoulder, s)
    cur.current.elbow    = THREE.MathUtils.lerp(cur.current.elbow,    joints.elbow,    s)
    cur.current.wrist    = THREE.MathUtils.lerp(cur.current.wrist,    joints.wrist,    s)

    if (nodes.mainColumn) nodes.mainColumn.rotation.y = cur.current.base
    if (nodes.upperArm)   nodes.upperArm.rotation.x   = cur.current.shoulder
    if (nodes.elbow)      nodes.elbow.rotation.x       = cur.current.elbow
    if (nodes.wrist)      nodes.wrist.rotation.x       = cur.current.wrist
  })

  return (
    <Center>
      <primitive object={scene} scale={2.6} />
    </Center>
  )
}

useGLTF.preload('/robot.glb')

/* ── slider component ───────────────────────────────────── */
function Slider({
  label, value, min, max, onChange,
}: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span
        style={{
          fontFamily: 'var(--font-mono-var)', fontSize: '0.60rem',
          color: 'var(--muted)', width: 56, flexShrink: 0,
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, position: 'relative', height: 16, display: 'flex', alignItems: 'center' }}>
        {/* track background */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: 2, borderRadius: 2, background: 'var(--border)' }} />
        {/* track fill */}
        <div
          style={{
            position: 'absolute', left: 0, height: 2, borderRadius: 2,
            background: 'var(--green)',
            width: `${((value - min) / (max - min)) * 100}%`,
          }}
        />
        <input
          type="range" min={min} max={max} step={0.02} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: 'absolute', left: 0, right: 0, width: '100%',
            opacity: 0, cursor: 'pointer', height: 16, margin: 0,
          }}
        />
        {/* thumb */}
        <div
          style={{
            position: 'absolute',
            left: `calc(${((value - min) / (max - min)) * 100}% - 6px)`,
            width: 12, height: 12, borderRadius: '50%',
            background: 'var(--green)', border: '2px solid var(--bg2)',
            boxShadow: '0 0 6px rgba(63,185,80,0.5)',
            pointerEvents: 'none', transition: 'left 0.02s',
          }}
        />
      </div>
      <span style={{ fontFamily: 'var(--font-mono-var)', fontSize: '0.58rem', color: 'var(--dimmed)', width: 30, textAlign: 'right' }}>
        {value.toFixed(1)}
      </span>
    </div>
  )
}

/* ── exported scene ─────────────────────────────────────── */
export default function RobotScene() {
  const [joints, setJoints] = useState<Joints>({ ...POSES.default })
  const [activePreset, setActivePreset] = useState<string>('default')

  function applyPreset(name: string) {
    setJoints({ ...POSES[name] })
    setActivePreset(name)
  }

  function setJoint(key: keyof Joints, value: number) {
    setJoints(prev => ({ ...prev, [key]: value }))
    setActivePreset('')
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg2)' }}>

      {/* ── 3‑D canvas ── */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <Canvas
          camera={{ position: [4, 2.5, 4.5], fov: 38 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 8, 4]}  intensity={1.6} color="#ffffff" castShadow />
          <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#b0d0ff" />
          <pointLight position={[0, -1, 2]} color="#3fb950" intensity={1.5} distance={6} />

          <Suspense fallback={null}>
            <Arm joints={joints} />
            <Environment preset="city" environmentIntensity={0.3} />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI * 0.18}
            maxPolarAngle={Math.PI * 0.62}
          />
        </Canvas>
      </div>

      {/* ── controls panel ── */}
      <div
        style={{
          padding: '10px 14px 12px',
          background: 'var(--bg)',
          borderTop: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        {/* pose presets */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {Object.keys(POSES).map(name => (
            <button
              key={name}
              onClick={() => applyPreset(name)}
              style={{
                fontFamily: 'var(--font-mono-var)', fontSize: '0.58rem',
                padding: '3px 8px', borderRadius: 4, cursor: 'pointer',
                border: `1px solid ${activePreset === name ? 'var(--green)' : 'var(--border)'}`,
                background: activePreset === name ? 'rgba(63,185,80,0.12)' : 'var(--surface)',
                color: activePreset === name ? 'var(--green)' : 'var(--muted)',
                transition: 'all 0.15s',
              }}
            >
              {name}
            </button>
          ))}
          <button
            onClick={() => applyPreset('default')}
            style={{
              fontFamily: 'var(--font-mono-var)', fontSize: '0.58rem',
              padding: '3px 8px', borderRadius: 4, cursor: 'pointer',
              border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--muted)',
              marginLeft: 'auto', transition: 'all 0.15s',
            }}
          >
            reset
          </button>
        </div>

        {/* joint sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Slider label="Base"     value={joints.base}     min={-Math.PI} max={Math.PI}  onChange={v => setJoint('base', v)} />
          <Slider label="Shoulder" value={joints.shoulder} min={-1.5}     max={0.3}      onChange={v => setJoint('shoulder', v)} />
          <Slider label="Elbow"    value={joints.elbow}    min={-0.2}     max={1.8}      onChange={v => setJoint('elbow', v)} />
          <Slider label="Wrist"    value={joints.wrist}    min={-1.5}     max={1.5}      onChange={v => setJoint('wrist', v)} />
        </div>
      </div>
    </div>
  )
}
