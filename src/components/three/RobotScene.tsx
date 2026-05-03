'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'

/* ── materials ─────────────────────────────────────────────── */
const M_BODY     = new THREE.MeshStandardMaterial({ color: '#d0d0d4', metalness: 0.28, roughness: 0.44 })
const M_LITE     = new THREE.MeshStandardMaterial({ color: '#e4e4e8', metalness: 0.40, roughness: 0.28 })
const M_DARK     = new THREE.MeshStandardMaterial({ color: '#1c1c26', metalness: 0.90, roughness: 0.10 })
const M_BASE     = new THREE.MeshStandardMaterial({ color: '#111119', metalness: 0.82, roughness: 0.18 })
const M_GRIP     = new THREE.MeshStandardMaterial({ color: '#1e1e28', metalness: 0.78, roughness: 0.22 })
const M_GRIP_PAD = new THREE.MeshStandardMaterial({ color: '#131318', metalness: 0.55, roughness: 0.50 })
const M_BOLT     = new THREE.MeshStandardMaterial({ color: '#2e2e3c', metalness: 0.92, roughness: 0.08 })
const M_FLOOR    = new THREE.MeshStandardMaterial({ color: '#0c0c18', metalness: 0.18, roughness: 0.82 })
const M_PANEL    = new THREE.MeshStandardMaterial({ color: '#0a0a12', metalness: 0.95, roughness: 0.06 })

/* ── joints type ───────────────────────────────────────────── */
interface Joints { base: number; shoulder: number; elbow: number; wrist: number }

/* ── poses ─────────────────────────────────────────────────── */
const POSES: Record<string, Joints> = {
  default: { base:  0.0,  shoulder: -0.45, elbow: 0.95,  wrist: -0.50 },
  reach:   { base:  0.7,  shoulder: -0.80, elbow: 1.30,  wrist: -0.55 },
  pick:    { base: -0.4,  shoulder: -1.10, elbow: 1.55,  wrist:  0.20 },
  extend:  { base:  0.0,  shoulder: -0.10, elbow: 0.12,  wrist: -0.08 },
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

function GripFinger({ angle, spread = 0 }: { angle: number; spread?: number }) {
  /* spread: 0 = closed/default, 1 = fully open */
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

/* ── gripper assembly ─────────────────────────────────────── */
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
      <GripFinger angle={0}       spread={spread} />
      <GripFinger angle={TAU3}    spread={spread} />
      <GripFinger angle={TAU3 * 2} spread={spread} />
    </group>
  )
}

/* ── Gazebo-style ground ───────────────────────────────────── */
function Ground() {
  const grid = useMemo(() => new THREE.GridHelper(14, 28, '#252535', '#1a1a28'), [])
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

/* ── pick object — sits on ground, gets "grabbed" and fades ─ */
function PickObject({ pickKey }: { pickKey: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const elapsed  = useRef(0)
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ff7020', emissive: '#ff3000', emissiveIntensity: 0.35,
    metalness: 0.15, roughness: 0.55, transparent: true, opacity: 1,
  }), [])
  const glowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ff7020', transparent: true, opacity: 0.18, side: THREE.DoubleSide,
  }), [])

  useEffect(() => {
    elapsed.current = 0
    mat.opacity = 1
    mat.emissiveIntensity = 0.35
    glowMat.opacity = 0.18
    if (groupRef.current) groupRef.current.scale.setScalar(1)
  }, [pickKey, mat, glowMat])

  useFrame((_, delta) => {
    elapsed.current += delta
    const t = elapsed.current

    /* pulse glow before being picked */
    if (t < 2.0) {
      glowMat.opacity = 0.10 + Math.sin(t * 4) * 0.08
    }

    /* fade + scale out once gripper arrives (~2.2 s) */
    if (t > 2.2) {
      const p = Math.min(1, (t - 2.2) / 0.65)
      mat.opacity = 1 - p
      glowMat.opacity = 0.18 * (1 - p)
      mat.emissiveIntensity = 0.35 * (1 - p)
      if (groupRef.current) groupRef.current.scale.setScalar(1 + p * 0.6)
    }
  })

  /* position estimated from pick FK: base=-0.4, arm reaches ~(-0.3, ground, 0.9) */
  return (
    <group ref={groupRef} position={[-0.30, -1.10, 0.90]}>
      {/* main cube */}
      <mesh>
        <boxGeometry args={[0.11, 0.11, 0.11]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* glow disc on ground */}
      <mesh position={[0, -0.056, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.18, 24]} />
        <primitive object={glowMat} attach="material" />
      </mesh>
      {/* small point light so cube illuminates the ground */}
      <pointLight color="#ff6010" intensity={0.6} distance={1.2} />
    </group>
  )
}

/* ── arm joints + links ───────────────────────────────────── */
function IndustrialArm({
  targets, autoMode, gripSpread,
}: {
  targets: Joints; autoMode: boolean; gripSpread: number
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
    /* lerp gripper spread */
    curSpread.current = THREE.MathUtils.lerp(curSpread.current, gripSpread, 0.07)
    if (gripperRef.current) {
      /* spread is applied via GripFinger re-render, not here — force update skipped;
         instead Gripper is rendered with spread prop in JSX below */
    }

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
  })

  const spread = curSpread.current

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
            {/* upper arm body */}
            <mesh material={M_BODY} position={[0, 0.56, 0]}>
              <boxGeometry args={[0.195, 0.88, 0.185]} />
            </mesh>
            {/* "ishan" carved panel — dark OLED-style recess */}
            <mesh material={M_PANEL} position={[0, 0.56, 0.093]}>
              <boxGeometry args={[0.148, 0.80, 0.014]} />
            </mesh>
            {/* thin border frame around panel */}
            <mesh material={M_DARK} position={[0, 0.56, 0.094]}>
              <boxGeometry args={[0.158, 0.82, 0.008]} />
            </mesh>
            <mesh material={M_DARK} position={[0, 0.11, 0]}>
              <boxGeometry args={[0.197, 0.036, 0.187]} />
            </mesh>
            <mesh material={M_DARK} position={[0, 1.00, 0]}>
              <boxGeometry args={[0.197, 0.036, 0.187]} />
            </mesh>

            {/* "ishan" carved text — green on dark panel */}
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
  const [autoMode, setAutoMode]   = useState(true)
  const [pickKey, setPickKey]     = useState(0)
  const [pickActive, setPickActive] = useState(false)
  const [gripSpread, setGripSpread] = useState(0)

  function applyPreset(name: string) {
    setJoints({ ...POSES[name] })
    setActive(name)
    setAutoMode(false)

    if (name === 'pick') {
      /* sequence: open gripper → arm moves → close → pick object disappears */
      setPickKey(k => k + 1)
      setPickActive(true)
      setGripSpread(0.9)                            // open gripper
      setTimeout(() => setGripSpread(0), 2300)      // close when near object
      setTimeout(() => setPickActive(false), 3800)  // object gone, gripper closed
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

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg2)' }}>

      {/* mode label */}
      <div style={{
        padding: '5px 14px 4px',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-mono-var)', fontSize: '0.58rem',
        color: autoMode ? 'var(--green)' : pickActive ? 'var(--orange)' : 'var(--blue)',
        flexShrink: 0,
      }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
          background: autoMode ? 'var(--green)' : pickActive ? 'var(--orange)' : 'var(--blue)',
          boxShadow: autoMode ? '0 0 6px rgba(63,185,80,0.6)' : pickActive ? '0 0 6px rgba(247,129,102,0.6)' : '0 0 6px rgba(88,166,255,0.6)',
        }} />
        {autoMode ? 'greeting · touch any slider to take control' : pickActive ? 'executing pick sequence...' : 'manual control'}
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <Canvas
          camera={{ position: [3.4, 0.4, 3.4], fov: 50 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 8, 4]}  intensity={1.9} color="#ffffff" />
          <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#c0d8ff" />
          <pointLight position={[0, -0.5, 2]} color="#3fb950" intensity={1.2} distance={5} />

          <Ground />
          {pickActive && <PickObject key={pickKey} pickKey={pickKey} />}
          <IndustrialArm targets={joints} autoMode={autoMode} gripSpread={gripSpread} />
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
              border: `1px solid ${activePreset === name && !autoMode ? 'var(--green)' : 'var(--border)'}`,
              background: activePreset === name && !autoMode ? 'rgba(63,185,80,0.12)' : 'var(--surface)',
              color: activePreset === name && !autoMode ? 'var(--green)' : 'var(--muted)',
            }}>
              {name}
            </button>
          ))}
          <button onClick={resetToAuto} style={{
            fontFamily: 'var(--font-mono-var)', fontSize: '0.58rem', padding: '3px 9px',
            borderRadius: 4, cursor: 'pointer', marginLeft: 'auto',
            border: `1px solid ${autoMode ? 'var(--green)' : 'var(--border)'}`,
            background: autoMode ? 'rgba(63,185,80,0.12)' : 'var(--surface)',
            color: autoMode ? 'var(--green)' : 'var(--muted)',
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
