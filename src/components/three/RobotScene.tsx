'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'

/* ── materials ─────────────────────────────────────────────── */
const M_BODY  = new THREE.MeshStandardMaterial({ color: '#d0d0d4', metalness: 0.28, roughness: 0.44 })
const M_LITE  = new THREE.MeshStandardMaterial({ color: '#e4e4e8', metalness: 0.40, roughness: 0.28 })
const M_DARK  = new THREE.MeshStandardMaterial({ color: '#1c1c26', metalness: 0.90, roughness: 0.10 })
const M_BASE  = new THREE.MeshStandardMaterial({ color: '#111119', metalness: 0.82, roughness: 0.18 })
const M_GRIP  = new THREE.MeshStandardMaterial({ color: '#1e1e28', metalness: 0.78, roughness: 0.22 })
const M_GRIP_PAD = new THREE.MeshStandardMaterial({ color: '#131318', metalness: 0.55, roughness: 0.50 })
const M_BOLT  = new THREE.MeshStandardMaterial({ color: '#2e2e3c', metalness: 0.92, roughness: 0.08 })

/* ── reusable joint-ring ──────────────────────────────────── */
function Ring({ r = 0.22, thick = 0.036 }: { r?: number; thick?: number }) {
  return (
    <>
      <mesh material={M_DARK} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r, thick, 12, 48]} />
      </mesh>
      <mesh material={M_LITE}>
        <cylinderGeometry args={[r * 0.70, r * 0.70, thick * 1.4, 36]} />
      </mesh>
    </>
  )
}

/* ── axis disc pair ───────────────────────────────────────── */
function AxisDiscs({ span = 0.44, r = 0.095 }: { span?: number; r?: number }) {
  return (
    <>
      <mesh material={M_DARK} position={[-span / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[r, r, 0.040, 36]} />
      </mesh>
      <mesh material={M_DARK} position={[span / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[r, r, 0.040, 36]} />
      </mesh>
    </>
  )
}

/* ── single gripper finger ────────────────────────────────── */
const PROX = 0.155
const DIST = 0.185
const MOUNT_R = 0.082

function GripFinger({ angle }: { angle: number }) {
  return (
    <group rotation={[0, angle, 0]}>
      {/* mount point at hub edge */}
      <group position={[0, -0.04, MOUNT_R]}>
        {/* proximal link — leans outward */}
        <group rotation={[0.36, 0, 0]}>
          <mesh material={M_GRIP} position={[0, -PROX / 2, 0]}>
            <boxGeometry args={[0.027, PROX, 0.022]} />
          </mesh>
          {/* side ridges on proximal */}
          <mesh material={M_BOLT} position={[-0.014, -PROX / 2, 0]}>
            <boxGeometry args={[0.005, PROX * 0.85, 0.018]} />
          </mesh>
          <mesh material={M_BOLT} position={[0.014, -PROX / 2, 0]}>
            <boxGeometry args={[0.005, PROX * 0.85, 0.018]} />
          </mesh>
          {/* knuckle joint disc */}
          <mesh material={M_BOLT} position={[0, -PROX, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.040, 14]} />
          </mesh>
          <mesh material={M_GRIP} position={[-0.022, -PROX, 0]}>
            <boxGeometry args={[0.008, 0.024, 0.024]} />
          </mesh>
          <mesh material={M_GRIP} position={[0.022, -PROX, 0]}>
            <boxGeometry args={[0.008, 0.024, 0.024]} />
          </mesh>

          {/* distal link — curves inward (back toward gripper centre) */}
          <group position={[0, -PROX, 0]} rotation={[-0.50, 0, 0]}>
            <mesh material={M_GRIP} position={[0, -DIST / 2, 0]}>
              <boxGeometry args={[0.025, DIST, 0.020]} />
            </mesh>
            {/* serrated inner pads (face closest to arm centre = +Z face) */}
            {Array.from({ length: 6 }).map((_, j) => (
              <mesh key={j} material={M_GRIP_PAD} position={[0, -0.010 - j * 0.028, 0.012]}>
                <boxGeometry args={[0.023, 0.022, 0.007]} />
              </mesh>
            ))}
            {/* finger tip */}
            <mesh material={M_GRIP} position={[0, -DIST + 0.010, 0]}>
              <boxGeometry args={[0.020, 0.032, 0.018]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

/* ── gripper assembly ─────────────────────────────────────── */
function Gripper() {
  const TAU3 = (Math.PI * 2) / 3
  return (
    <group>
      {/* dark cylindrical hub */}
      <mesh material={M_GRIP}>
        <cylinderGeometry args={[0.096, 0.096, 0.13, 28]} />
      </mesh>
      {/* top cap */}
      <mesh material={M_GRIP} position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.075, 0.096, 0.04, 28]} />
      </mesh>
      {/* bottom plate */}
      <mesh material={M_GRIP} position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.105, 0.096, 0.04, 28]} />
      </mesh>
      {/* hub detail circles */}
      {[0, TAU3, TAU3 * 2].map((a, i) => (
        <mesh key={i} material={M_BOLT}
          position={[Math.sin(a) * 0.058, 0.03, Math.cos(a) * 0.058]}>
          <cylinderGeometry args={[0.012, 0.012, 0.025, 10]} />
        </mesh>
      ))}
      {/* 3 fingers */}
      <GripFinger angle={0} />
      <GripFinger angle={TAU3} />
      <GripFinger angle={TAU3 * 2} />
    </group>
  )
}

/* ── arm joints + links ───────────────────────────────────── */
interface Joints { base: number; shoulder: number; elbow: number; wrist: number }

function IndustrialArm({ targets }: { targets: Joints }) {
  const waistRef    = useRef<THREE.Group>(null!)
  const shoulderRef = useRef<THREE.Group>(null!)
  const elbowRef    = useRef<THREE.Group>(null!)
  const wristRef    = useRef<THREE.Group>(null!)
  const cur         = useRef<Joints>({ ...POSES.default })

  useFrame(() => {
    const s = 0.088
    const L = (a: number, b: number) => THREE.MathUtils.lerp(a, b, s)
    cur.current.base     = L(cur.current.base,     targets.base)
    cur.current.shoulder = L(cur.current.shoulder, targets.shoulder)
    cur.current.elbow    = L(cur.current.elbow,    targets.elbow)
    cur.current.wrist    = L(cur.current.wrist,    targets.wrist)
    waistRef.current.rotation.y    = cur.current.base
    shoulderRef.current.rotation.x = cur.current.shoulder
    elbowRef.current.rotation.x    = cur.current.elbow
    wristRef.current.rotation.x    = cur.current.wrist
  })

  return (
    <group position={[0, -1.18, 0]} scale={1.15}>

      {/* ══ BASE ══ */}
      <mesh material={M_BASE}>
        <cylinderGeometry args={[0.50, 0.54, 0.24, 48]} />
      </mesh>
      <mesh material={M_BASE} position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.36, 0.44, 0.10, 48]} />
      </mesh>
      <mesh material={M_LITE} position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.038, 48]} />
      </mesh>
      <group position={[0, 0.27, 0]}>
        <Ring r={0.25} thick={0.038} />
      </group>

      {/* ══ WAIST Y ══ */}
      <group ref={waistRef} position={[0, 0.30, 0]}>
        <mesh material={M_BODY}>
          <cylinderGeometry args={[0.22, 0.26, 0.26, 36]} />
        </mesh>

        {/* shoulder U-fork */}
        <group position={[0, 0.26, 0]}>
          <mesh material={M_BODY} position={[-0.17, 0.24, 0]}>
            <boxGeometry args={[0.098, 0.52, 0.21]} />
          </mesh>
          <mesh material={M_BODY} position={[0.17, 0.24, 0]}>
            <boxGeometry args={[0.098, 0.52, 0.21]} />
          </mesh>
          <mesh material={M_DARK} position={[0, 0.48, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.048, 0.048, 0.44, 18]} />
          </mesh>
          <group position={[0, 0.48, 0]}>
            <AxisDiscs span={0.46} r={0.095} />
          </group>

          {/* ══ SHOULDER X ══ */}
          <group ref={shoulderRef} position={[0, 0.48, 0]}>
            <mesh material={M_LITE} position={[0, 0.06, 0]}>
              <boxGeometry args={[0.28, 0.10, 0.22]} />
            </mesh>

            {/* UPPER ARM — "ishan" engraved on front face */}
            <mesh material={M_BODY} position={[0, 0.56, 0]}>
              <boxGeometry args={[0.195, 0.88, 0.185]} />
            </mesh>
            <mesh material={M_LITE} position={[0, 0.56, 0.092]}>
              <boxGeometry args={[0.15, 0.82, 0.016]} />
            </mesh>
            <mesh material={M_DARK} position={[0, 0.11, 0]}>
              <boxGeometry args={[0.197, 0.036, 0.187]} />
            </mesh>
            <mesh material={M_DARK} position={[0, 1.00, 0]}>
              <boxGeometry args={[0.197, 0.036, 0.187]} />
            </mesh>

            {/* "ishan" label on the face strip */}
            <Text
              position={[0, 0.56, 0.102]}
              fontSize={0.058}
              color="#3fb950"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.12}
              characters="ishan"
            >
              ishan
            </Text>

            {/* ══ ELBOW ══ */}
            <group position={[0, 1.04, 0]}>
              <mesh material={M_BODY}>
                <boxGeometry args={[0.28, 0.19, 0.22]} />
              </mesh>
              <Ring r={0.15} thick={0.026} />
              <AxisDiscs span={0.32} r={0.082} />

              {/* ══ ELBOW X ══ */}
              <group ref={elbowRef}>
                <mesh material={M_BODY} position={[0, 0.36, 0]}>
                  <cylinderGeometry args={[0.092, 0.128, 0.62, 24]} />
                </mesh>
                <mesh material={M_DARK} position={[0, 0.085, 0]}>
                  <cylinderGeometry args={[0.130, 0.130, 0.026, 36]} />
                </mesh>
                <mesh material={M_DARK} position={[0, 0.62, 0]}>
                  <cylinderGeometry args={[0.095, 0.095, 0.026, 36]} />
                </mesh>

                {/* ══ WRIST ══ */}
                <group position={[0, 0.70, 0]}>
                  <mesh material={M_LITE}>
                    <cylinderGeometry args={[0.088, 0.088, 0.10, 32]} />
                  </mesh>
                  <Ring r={0.11} thick={0.022} />

                  {/* ══ WRIST X ══ */}
                  <group ref={wristRef}>
                    <mesh material={M_BODY} position={[0, 0.09, 0]}>
                      <cylinderGeometry args={[0.078, 0.078, 0.12, 24]} />
                    </mesh>
                    {/* ══ GRIPPER ══ */}
                    <group position={[0, 0.20, 0]}>
                      <Gripper />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

/* ── poses ────────────────────────────────────────────────── */
const POSES: Record<string, Joints> = {
  default: { base:  0.0,  shoulder: -0.45, elbow: 0.95,  wrist: -0.50 },
  reach:   { base:  0.7,  shoulder: -0.80, elbow: 1.30,  wrist: -0.55 },
  pick:    { base: -0.4,  shoulder: -1.10, elbow: 1.55,  wrist:  0.20 },
  extend:  { base:  0.0,  shoulder: -0.10, elbow: 0.12,  wrist: -0.08 },
}

/* ── custom slider ────────────────────────────────────────── */
function Slider({ label, value, min, max, onChange }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono-var)', fontSize: '0.60rem', color: 'var(--muted)', width: 58, flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ flex: 1, position: 'relative', height: 18, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: 2, borderRadius: 2, background: 'var(--border)' }} />
        <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', height: 2, width: `${pct}%`, borderRadius: 2, background: 'var(--green)' }} />
        <input type="range" min={min} max={max} step={0.02} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%' }} />
        <div style={{
          position: 'absolute', left: `calc(${pct}% - 6px)`,
          width: 12, height: 12, borderRadius: '50%', pointerEvents: 'none',
          background: 'var(--green)', border: '2px solid var(--bg)',
          boxShadow: '0 0 8px rgba(63,185,80,0.55)',
        }} />
      </div>
      <span style={{ fontFamily: 'var(--font-mono-var)', fontSize: '0.58rem', color: 'var(--dimmed)', width: 28, textAlign: 'right' }}>
        {value.toFixed(1)}
      </span>
    </div>
  )
}

/* ── scene ────────────────────────────────────────────────── */
export default function RobotScene() {
  const [joints, setJoints]       = useState<Joints>({ ...POSES.default })
  const [activePreset, setActive] = useState('default')

  function applyPreset(name: string) { setJoints({ ...POSES[name] }); setActive(name) }
  function setJ(k: keyof Joints, v: number) { setJoints(p => ({ ...p, [k]: v })); setActive('') }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg2)' }}>

      <div style={{ flex: 1, minHeight: 0 }}>
        <Canvas
          camera={{ position: [3.6, 0.7, 3.6], fov: 46 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 8, 4]}  intensity={1.9} color="#ffffff" />
          <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#c0d8ff" />
          <pointLight position={[0, -0.5, 2]} color="#3fb950" intensity={1.2} distance={5} />

          <IndustrialArm targets={joints} />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0.3} maxPolarAngle={Math.PI * 0.58} />
          <Environment preset="warehouse" environmentIntensity={0.4} />
        </Canvas>
      </div>

      <div style={{ padding: '10px 14px 13px', background: 'var(--bg)', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          {Object.keys(POSES).map(name => (
            <button key={name} onClick={() => applyPreset(name)} style={{
              fontFamily: 'var(--font-mono-var)', fontSize: '0.58rem', padding: '3px 9px',
              borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
              border: `1px solid ${activePreset === name ? 'var(--green)' : 'var(--border)'}`,
              background: activePreset === name ? 'rgba(63,185,80,0.12)' : 'var(--surface)',
              color: activePreset === name ? 'var(--green)' : 'var(--muted)',
            }}>
              {name}
            </button>
          ))}
          <button onClick={() => applyPreset('default')} style={{
            fontFamily: 'var(--font-mono-var)', fontSize: '0.58rem', padding: '3px 9px',
            borderRadius: 4, cursor: 'pointer', marginLeft: 'auto',
            border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)',
          }}>
            reset
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Slider label="Rotation 1" value={joints.base}     min={-Math.PI} max={Math.PI} onChange={v => setJ('base', v)} />
          <Slider label="Rotation 2" value={joints.shoulder} min={-1.5}     max={0.2}     onChange={v => setJ('shoulder', v)} />
          <Slider label="Rotation 3" value={joints.elbow}    min={-0.1}     max={1.8}     onChange={v => setJ('elbow', v)} />
          <Slider label="Rotation 4" value={joints.wrist}    min={-1.5}     max={1.5}     onChange={v => setJ('wrist', v)} />
        </div>
      </div>
    </div>
  )
}
