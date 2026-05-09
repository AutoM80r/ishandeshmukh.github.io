'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'

const R2D = 180 / Math.PI
const D2R = Math.PI / 180

/* ── materials (white industrial arm) ─────────────────────── */
const M_BODY     = new THREE.MeshStandardMaterial({ color: '#f2f2f2', metalness: 0.10, roughness: 0.38 })
const M_LITE     = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.18, roughness: 0.25 })
const M_DARK     = new THREE.MeshStandardMaterial({ color: '#1a1a22', metalness: 0.92, roughness: 0.08 })
const M_BASE     = new THREE.MeshStandardMaterial({ color: '#111111', metalness: 0.85, roughness: 0.15 })
const M_GRIP     = new THREE.MeshStandardMaterial({ color: '#1e1e1e', metalness: 0.80, roughness: 0.22 })
const M_GRIP_PAD = new THREE.MeshStandardMaterial({ color: '#2e2e2e', metalness: 0.55, roughness: 0.50 })
const M_BOLT     = new THREE.MeshStandardMaterial({ color: '#3a3a3a', metalness: 0.92, roughness: 0.08 })
const M_FLOOR    = new THREE.MeshStandardMaterial({ color: '#ececec', metalness: 0.02, roughness: 0.95 })
const M_PANEL    = new THREE.MeshStandardMaterial({ color: '#0a0a12', metalness: 0.95, roughness: 0.06 })
const M_PLAT     = new THREE.MeshStandardMaterial({ color: '#888898', metalness: 0.65, roughness: 0.35 })

/* ── joints type ───────────────────────────────────────────── */
interface Joints { base: number; shoulder: number; elbow: number; wrist: number }

/* ── poses ─────────────────────────────────────────────────── */
const POSES: Record<string, Joints> = {
  default: { base:  0.0,  shoulder: -0.45, elbow: 0.95,  wrist: -0.50 },
  reach:   { base:  0.7,  shoulder: -0.80, elbow: 1.30,  wrist: -0.55 },
  pick:    { base: -0.4,  shoulder:  0.15, elbow: 1.25,  wrist: -1.30 },
  extend:  { base:  0.0,  shoulder: -0.10, elbow: 0.12,  wrist: -0.08 },
}

const PICK_WORLD = new THREE.Vector3(0.387, 1.35, 0.917)
const GRAB_DIST  = 0.32

const PRESET_COLORS: Record<string, string> = {
  default: '#3fb950',
  reach:   '#58a6ff',
  pick:    '#f78166',
  extend:  '#e3b341',
}

/* ── wave greeting keyframes ───────────────────────────────── */
const WAVE_KF = [
  { t: 0.0, j: { base:  0.00, shoulder: -0.45, elbow: 0.95, wrist: -0.50 } },
  { t: 1.2, j: { base:  0.00, shoulder: -1.05, elbow: 0.48, wrist:  0.12 } },
  { t: 2.0, j: { base:  0.55, shoulder: -1.05, elbow: 0.48, wrist:  0.12 } },
  { t: 2.8, j: { base: -0.55, shoulder: -1.05, elbow: 0.48, wrist:  0.12 } },
  { t: 3.6, j: { base:  0.55, shoulder: -1.05, elbow: 0.48, wrist:  0.12 } },
  { t: 4.4, j: { base: -0.55, shoulder: -1.05, elbow: 0.48, wrist:  0.12 } },
  { t: 5.6, j: { base:  0.00, shoulder: -0.45, elbow: 0.95, wrist: -0.50 } },
]
const WAVE_HOLD = 7.0

function smoothstep(t: number) { return t * t * (3 - 2 * t) }

function lerpJ(a: Joints, b: Joints, t: number): Joints {
  const L = THREE.MathUtils.lerp
  return {
    base:     L(a.base,     b.base,     t),
    shoulder: L(a.shoulder, b.shoulder, t),
    elbow:    L(a.elbow,    b.elbow,    t),
    wrist:    L(a.wrist,    b.wrist,    t),
  }
}

/* ── joint ring ───────────────────────────────────────────── */
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

/* ── gripper ──────────────────────────────────────────────── */
const PROX = 0.155
const DIST = 0.185
const MOUNT_R = 0.082

function GripFinger({ angle, spread = 0 }: { angle: number; spread?: number }) {
  const proxAngle = 0.28 + spread * 0.32
  return (
    <group rotation={[0, angle, 0]}>
      <group position={[0, -0.04, MOUNT_R]}>
        <group rotation={[proxAngle, 0, 0]}>
          <mesh material={M_GRIP} position={[0, -PROX / 2, 0]}>
            <boxGeometry args={[0.027, PROX, 0.022]} />
          </mesh>
          <mesh material={M_BOLT} position={[-0.014, -PROX / 2, 0]}>
            <boxGeometry args={[0.005, PROX * 0.85, 0.018]} />
          </mesh>
          <mesh material={M_BOLT} position={[0.014, -PROX / 2, 0]}>
            <boxGeometry args={[0.005, PROX * 0.85, 0.018]} />
          </mesh>
          <mesh material={M_BOLT} position={[0, -PROX, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.040, 14]} />
          </mesh>
          <mesh material={M_GRIP} position={[-0.022, -PROX, 0]}>
            <boxGeometry args={[0.008, 0.024, 0.024]} />
          </mesh>
          <mesh material={M_GRIP} position={[0.022, -PROX, 0]}>
            <boxGeometry args={[0.008, 0.024, 0.024]} />
          </mesh>
          <group position={[0, -PROX, 0]} rotation={[-0.50, 0, 0]}>
            <mesh material={M_GRIP} position={[0, -DIST / 2, 0]}>
              <boxGeometry args={[0.025, DIST, 0.020]} />
            </mesh>
            {Array.from({ length: 6 }).map((_, j) => (
              <mesh key={j} material={M_GRIP_PAD} position={[0, -0.010 - j * 0.028, 0.012]}>
                <boxGeometry args={[0.023, 0.022, 0.007]} />
              </mesh>
            ))}
            <mesh material={M_GRIP} position={[0, -DIST + 0.010, 0]}>
              <boxGeometry args={[0.020, 0.032, 0.018]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

function Gripper({ spread = 0 }: { spread?: number }) {
  const TAU3 = (Math.PI * 2) / 3
  return (
    <group>
      <mesh material={M_GRIP}>
        <cylinderGeometry args={[0.096, 0.096, 0.13, 28]} />
      </mesh>
      <mesh material={M_GRIP} position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.075, 0.096, 0.04, 28]} />
      </mesh>
      <mesh material={M_GRIP} position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.105, 0.096, 0.04, 28]} />
      </mesh>
      {[0, TAU3, TAU3 * 2].map((a, i) => (
        <mesh key={i} material={M_BOLT}
          position={[Math.sin(a) * 0.058, 0.03, Math.cos(a) * 0.058]}>
          <cylinderGeometry args={[0.012, 0.012, 0.025, 10]} />
        </mesh>
      ))}
      <GripFinger angle={0}        spread={spread} />
      <GripFinger angle={TAU3}     spread={spread} />
      <GripFinger angle={TAU3 * 2} spread={spread} />
    </group>
  )
}

/* ── ground (light Gazebo style) ───────────────────────────── */
function Ground() {
  const grid = useMemo(() => new THREE.GridHelper(14, 28, '#b8b8c0', '#d8d8e0'), [])
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.186, 0]}>
        <planeGeometry args={[14, 14]} />
        <primitive object={M_FLOOR} attach="material" />
      </mesh>
      <primitive object={grid} position={[0, -1.183, 0]} />
    </>
  )
}

/* ── pick object ──────────────────────────────────────────── */
function PickObject({
  pickKey,
  gripperPosRef,
}: {
  pickKey: number
  gripperPosRef: React.MutableRefObject<THREE.Vector3>
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const grabbed  = useRef(false)
  const fadeProg = useRef(0)

  const cubeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ff7020', emissive: '#ff3000', emissiveIntensity: 0.40,
    metalness: 0.15, roughness: 0.55, transparent: true, opacity: 1,
  }), [])
  const glowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ff7020', transparent: true, opacity: 0.20, side: THREE.DoubleSide,
  }), [])

  useEffect(() => {
    grabbed.current  = false
    fadeProg.current = 0
    cubeMat.opacity  = 1
    cubeMat.emissiveIntensity = 0.40
    glowMat.opacity  = 0.20
    if (groupRef.current) groupRef.current.scale.setScalar(1)
  }, [pickKey, cubeMat, glowMat])

  useFrame((_, delta) => {
    if (grabbed.current) {
      fadeProg.current = Math.min(1, fadeProg.current + delta / 0.55)
      const p = fadeProg.current
      cubeMat.opacity = 1 - p
      glowMat.opacity = 0.20 * (1 - p)
      cubeMat.emissiveIntensity = 0.40 * (1 - p)
      if (groupRef.current) groupRef.current.scale.setScalar(1 + p * 0.7)
      return
    }
    const t = performance.now() / 1000
    glowMat.opacity = 0.12 + Math.sin(t * 3.5) * 0.08
    const dist = gripperPosRef.current.distanceTo(PICK_WORLD)
    if (dist < GRAB_DIST) grabbed.current = true
  })

  return (
    <group ref={groupRef} position={PICK_WORLD}>
      <mesh material={M_PLAT} position={[0, -0.20, 0]}>
        <boxGeometry args={[0.38, 0.25, 0.38]} />
      </mesh>
      <mesh material={M_PLAT} position={[0, -0.34, 0]}>
        <cylinderGeometry args={[0.14, 0.18, 0.08, 20]} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.115, 0.115, 0.115]} />
        <primitive object={cubeMat} attach="material" />
      </mesh>
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.07, 0.20, 24]} />
        <primitive object={glowMat} attach="material" />
      </mesh>
      <pointLight color="#ff6010" intensity={0.7} distance={1.4} />
    </group>
  )
}

/* ── arm ──────────────────────────────────────────────────── */
function IndustrialArm({
  targets,
  autoMode,
  gripSpread,
  gripperPosRef,
}: {
  targets: Joints
  autoMode: boolean
  gripSpread: number
  gripperPosRef: React.MutableRefObject<THREE.Vector3>
}) {
  const waistRef    = useRef<THREE.Group>(null!)
  const shoulderRef = useRef<THREE.Group>(null!)
  const elbowRef    = useRef<THREE.Group>(null!)
  const wristRef    = useRef<THREE.Group>(null!)
  const gripperRef  = useRef<THREE.Group>(null!)
  const cur         = useRef<Joints>({ ...POSES.default })
  const animTime    = useRef(0)
  const curSpread   = useRef(0)

  useFrame((_, delta) => {
    curSpread.current = THREE.MathUtils.lerp(curSpread.current, gripSpread, 0.07)

    let tgt: Joints

    if (autoMode) {
      animTime.current += delta
      const t = animTime.current
      const kf = WAVE_KF
      if (t < kf[kf.length - 1].t) {
        tgt = kf[kf.length - 1].j
        for (let i = 0; i < kf.length - 1; i++) {
          if (t >= kf[i].t && t < kf[i + 1].t) {
            tgt = lerpJ(kf[i].j, kf[i + 1].j, smoothstep((t - kf[i].t) / (kf[i + 1].t - kf[i].t)))
            break
          }
        }
      } else {
        const s = t - WAVE_HOLD
        tgt = { ...POSES.default, base: Math.sin(s * 0.38) * 0.12 }
      }
      cur.current = tgt
    } else {
      animTime.current = 0
      const s = 0.088
      const L = (a: number, b: number) => THREE.MathUtils.lerp(a, b, s)
      cur.current.base     = L(cur.current.base,     targets.base)
      cur.current.shoulder = L(cur.current.shoulder, targets.shoulder)
      cur.current.elbow    = L(cur.current.elbow,    targets.elbow)
      cur.current.wrist    = L(cur.current.wrist,    targets.wrist)
      tgt = cur.current
    }

    waistRef.current.rotation.y    = tgt.base
    shoulderRef.current.rotation.x = tgt.shoulder
    elbowRef.current.rotation.x    = tgt.elbow
    wristRef.current.rotation.x    = tgt.wrist

    if (gripperRef.current) {
      gripperRef.current.getWorldPosition(gripperPosRef.current)
    }
  })

  const spread = curSpread.current

  return (
    <group position={[0, -1.18, 0]} scale={0.95}>

      {/* BASE */}
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

      {/* WAIST */}
      <group ref={waistRef} position={[0, 0.30, 0]}>
        <mesh material={M_BODY}>
          <cylinderGeometry args={[0.22, 0.26, 0.26, 36]} />
        </mesh>

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

          {/* SHOULDER */}
          <group ref={shoulderRef} position={[0, 0.48, 0]}>
            <mesh material={M_LITE} position={[0, 0.06, 0]}>
              <boxGeometry args={[0.28, 0.10, 0.22]} />
            </mesh>
            <mesh material={M_BODY} position={[0, 0.56, 0]}>
              <boxGeometry args={[0.195, 0.88, 0.185]} />
            </mesh>
            {/* carved ishan panel */}
            <mesh material={M_DARK} position={[0, 0.56, 0.094]}>
              <boxGeometry args={[0.158, 0.82, 0.008]} />
            </mesh>
            <mesh material={M_PANEL} position={[0, 0.56, 0.093]}>
              <boxGeometry args={[0.148, 0.80, 0.014]} />
            </mesh>
            <mesh material={M_DARK} position={[0, 0.11, 0]}>
              <boxGeometry args={[0.197, 0.036, 0.187]} />
            </mesh>
            <mesh material={M_DARK} position={[0, 1.00, 0]}>
              <boxGeometry args={[0.197, 0.036, 0.187]} />
            </mesh>
            <Text
              position={[0, 0.56, 0.101]}
              fontSize={0.046}
              color="#3fb950"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.04}
              maxWidth={0.14}
              characters="ishan"
            >
              ishan
            </Text>

            {/* ELBOW */}
            <group position={[0, 1.04, 0]}>
              <mesh material={M_BODY}>
                <boxGeometry args={[0.28, 0.19, 0.22]} />
              </mesh>
              <Ring r={0.15} thick={0.026} />
              <AxisDiscs span={0.32} r={0.082} />

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

                {/* WRIST */}
                <group position={[0, 0.70, 0]}>
                  <mesh material={M_LITE}>
                    <cylinderGeometry args={[0.088, 0.088, 0.10, 32]} />
                  </mesh>
                  <Ring r={0.11} thick={0.022} />

                  <group ref={wristRef}>
                    <mesh material={M_BODY} position={[0, 0.09, 0]}>
                      <cylinderGeometry args={[0.078, 0.078, 0.12, 24]} />
                    </mesh>
                    <group ref={gripperRef} position={[0, 0.20, 0]}>
                      <Gripper spread={spread} />
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

/* ── degree slider ────────────────────────────────────────── */
function SliderDeg({ label, valueRad, minDeg, maxDeg, onChange }: {
  label: string; valueRad: number; minDeg: number; maxDeg: number
  onChange: (rad: number) => void
}) {
  const deg     = Math.round(valueRad * R2D)
  const clamped = Math.max(minDeg, Math.min(maxDeg, deg))
  const pct     = ((clamped - minDeg) / (maxDeg - minDeg)) * 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono-var)', fontSize: '0.58rem', color: 'var(--muted)',
      }}>
        <span>{label}: <span style={{ color: 'var(--text)', fontWeight: 500 }}>{clamped}°</span></span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ flex: 1, position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
          {/* track */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 5,
            borderRadius: 3, background: 'var(--surface)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)',
          }} />
          {/* fill */}
          <div style={{
            position: 'absolute', left: 0, height: 5, width: `${pct}%`,
            borderRadius: 3, background: 'linear-gradient(90deg, var(--green), #46d058)',
          }} />
          {/* native range */}
          <input type="range" min={minDeg} max={maxDeg} step={1} value={clamped}
            onChange={e => onChange(Number(e.target.value) * D2R)}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%' }} />
          {/* chrome knob */}
          <div style={{
            position: 'absolute', left: `calc(${pct}% - 11px)`,
            width: 22, height: 22, borderRadius: '50%', pointerEvents: 'none',
            background: 'linear-gradient(145deg, #e8e8e8 0%, #c8c8c8 45%, #a8a8a8 100%)',
            border: '1px solid rgba(0,0,0,0.22)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.75)',
          }}>
            {/* knob center dot */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 4, height: 4, borderRadius: '50%',
              background: 'rgba(0,0,0,0.3)',
            }} />
          </div>
        </div>
        {/* value box */}
        <div style={{
          fontFamily: 'var(--font-mono-var)', fontSize: '0.59rem',
          color: 'var(--text)', width: 38, textAlign: 'center',
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 3, padding: '2px 0', flexShrink: 0,
        }}>
          {clamped}°
        </div>
      </div>
    </div>
  )
}

/* ── scene ────────────────────────────────────────────────── */
export default function RobotScene() {
  const [joints, setJoints]         = useState<Joints>({ ...POSES.default })
  const [activePreset, setActive]   = useState('default')
  const [autoMode, setAutoMode]     = useState(true)
  const [pickKey, setPickKey]       = useState(0)
  const [pickActive, setPickActive] = useState(false)
  const [gripSpread, setGripSpread] = useState(0)
  const [saved, setSaved]           = useState(false)

  const gripperPosRef = useRef(new THREE.Vector3())

  function applyPreset(name: string) {
    setJoints({ ...POSES[name] })
    setActive(name)
    setAutoMode(false)

    if (name === 'pick') {
      setPickKey(k => k + 1)
      setPickActive(true)
      setGripSpread(0.9)
      setTimeout(() => setGripSpread(0), 2400)
      setTimeout(() => setPickActive(false), 5000)
    } else {
      setPickActive(false)
      setGripSpread(0)
    }
  }

  function resetToAuto() {
    setJoints({ ...POSES.default })
    setActive('default')
    setAutoMode(true)
    setPickActive(false)
    setGripSpread(0)
  }

  function setJ(k: keyof Joints, v: number) {
    setJoints(p => ({ ...p, [k]: v }))
    setActive('')
    setAutoMode(false)
    setPickActive(false)
    setGripSpread(0)
  }

  const statusColor = autoMode ? 'var(--green)' : pickActive ? 'var(--orange)' : 'var(--blue)'
  const statusLabel = autoMode ? 'greeting · touch slider to control' : pickActive ? 'executing pick sequence...' : 'manual control'

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', background: 'var(--bg2)', overflow: 'hidden' }}>

      {/* ── 3D VIEW ── */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
        {/* status badge */}
        <div style={{
          position: 'absolute', top: 8, left: 8, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 5,
          fontFamily: 'var(--font-mono-var)', fontSize: '0.55rem',
          color: statusColor,
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 4, padding: '3px 8px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
            background: statusColor,
            boxShadow: `0 0 5px ${statusColor}`,
          }} />
          {statusLabel}
        </div>

        <Canvas
          camera={{ position: [3.2, 0.0, 3.8], fov: 54 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 4]}  intensity={1.6} color="#ffffff" />
          <directionalLight position={[-4, 3, -2]} intensity={0.35} color="#d0e8ff" />
          <pointLight position={[0, -0.5, 2]} color="#3fb950" intensity={0.5} distance={5} />

          <Ground />
          {pickActive && (
            <PickObject key={pickKey} pickKey={pickKey} gripperPosRef={gripperPosRef} />
          )}
          <IndustrialArm
            targets={joints}
            autoMode={autoMode}
            gripSpread={gripSpread}
            gripperPosRef={gripperPosRef}
          />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0.2} maxPolarAngle={Math.PI * 0.58} />
          <Environment preset="warehouse" environmentIntensity={0.55} />
        </Canvas>
      </div>

      {/* ── CONTROL PANEL ── */}
      <div style={{
        width: 210, flexShrink: 0,
        background: 'var(--bg)', borderLeft: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', gap: 8,
        padding: '12px 12px 14px',
        overflowY: 'auto',
      }}>
        {/* header */}
        <div style={{
          fontFamily: 'var(--font-mono-var)', fontSize: '0.62rem',
          color: 'var(--text)', fontWeight: 600,
          paddingBottom: 7, borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>Joint Controls</span>
          <span style={{ fontSize: '0.52rem', color: 'var(--dimmed)', fontWeight: 400 }}>4-DOF</span>
        </div>

        {/* sliders */}
        <SliderDeg label="Base Rotation"  valueRad={joints.base}     minDeg={-180} maxDeg={180} onChange={v => setJ('base', v)} />
        <SliderDeg label="Upper Arm"      valueRad={joints.shoulder} minDeg={-86}  maxDeg={12}  onChange={v => setJ('shoulder', v)} />
        <SliderDeg label="Forearm"        valueRad={joints.elbow}    minDeg={-6}   maxDeg={103} onChange={v => setJ('elbow', v)} />
        <SliderDeg label="Wrist"          valueRad={joints.wrist}    minDeg={-86}  maxDeg={86}  onChange={v => setJ('wrist', v)} />

        {/* preset buttons */}
        <div style={{ paddingTop: 2 }}>
          <div style={{
            fontFamily: 'var(--font-mono-var)', fontSize: '0.56rem',
            color: 'var(--dimmed)', marginBottom: 6,
          }}>
            Presets
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {(['default', 'reach', 'pick', 'extend'] as const).map(name => {
              const isActive = activePreset === name && !autoMode
              const col = PRESET_COLORS[name]
              return (
                <button key={name} onClick={() => applyPreset(name)} style={{
                  fontFamily: 'var(--font-mono-var)', fontSize: '0.57rem',
                  padding: '4px 8px', borderRadius: 4, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5,
                  border: `1px solid ${isActive ? col : 'var(--border)'}`,
                  background: isActive ? `color-mix(in srgb, ${col} 12%, var(--surface))` : 'var(--surface)',
                  color: isActive ? col : 'var(--muted)',
                  transition: 'all 0.15s',
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                    background: isActive ? col : 'var(--border)',
                    boxShadow: isActive ? `0 0 6px ${col}` : 'none',
                    transition: 'all 0.15s',
                  }} />
                  {name}
                </button>
              )
            })}
            <button onClick={resetToAuto} style={{
              fontFamily: 'var(--font-mono-var)', fontSize: '0.57rem',
              padding: '4px 8px', borderRadius: 4, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
              border: `1px solid ${autoMode ? 'var(--border2)' : 'var(--border)'}`,
              background: autoMode ? 'var(--surface)' : 'var(--surface)',
              color: autoMode ? 'var(--text)' : 'var(--muted)',
              transition: 'all 0.15s',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                background: autoMode ? 'var(--muted)' : 'var(--border)',
              }} />
              reset
            </button>
          </div>
        </div>

        {/* save configuration */}
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500) }}
          style={{
            marginTop: 'auto',
            padding: '9px 12px',
            borderRadius: 5, cursor: 'pointer', width: '100%',
            fontFamily: 'var(--font-mono-var)', fontSize: '0.62rem', fontWeight: 600,
            background: saved
              ? 'linear-gradient(135deg, #46d058, #3fb950)'
              : 'linear-gradient(135deg, #e0e0e0, #b8b8b8)',
            border: saved ? '1px solid #3fb950' : '1px solid rgba(0,0,0,0.18)',
            color: saved ? '#fff' : '#2a2a2a',
            boxShadow: saved
              ? '0 0 12px rgba(63,185,80,0.35)'
              : '0 2px 6px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.65)',
            transition: 'all 0.25s',
          }}
        >
          {saved ? '✓ Saved' : 'Save Configuration'}
        </button>
      </div>
    </div>
  )
}
