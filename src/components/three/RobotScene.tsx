'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── materials (module-level, created once) ────────────────────────────── */
const M_ARM    = new THREE.MeshStandardMaterial({ color: '#13131a', metalness: 0.96, roughness: 0.10 })
const M_JOINT  = new THREE.MeshStandardMaterial({ color: '#09090e', metalness: 1.00, roughness: 0.04 })
const M_RIDGE  = new THREE.MeshStandardMaterial({ color: '#1c1c28', metalness: 0.90, roughness: 0.32 })
const M_PCB    = new THREE.MeshStandardMaterial({ color: '#050e06', metalness: 0.06, roughness: 0.90 })
const M_CHIP   = new THREE.MeshStandardMaterial({ color: '#0d0d14', metalness: 0.78, roughness: 0.24 })
const M_GOLD   = new THREE.MeshStandardMaterial({ color: '#a05f00', metalness: 1.00, roughness: 0.05, emissive: '#ff4400', emissiveIntensity: 0.55 })
const M_COPPER = new THREE.MeshStandardMaterial({ color: '#6a2e00', metalness: 0.88, roughness: 0.18, emissive: '#ff3300', emissiveIntensity: 0.30 })

/* ── one finger segment + knuckle groove ───────────────────────────────── */
function Seg({ len, w }: { len: number; w: number }) {
  return (
    <group>
      <mesh material={M_ARM}>
        <boxGeometry args={[w, len, w * 0.72]} />
      </mesh>
      {/* raised ridge panel */}
      <mesh position={[0, len * 0.22, 0]} material={M_RIDGE}>
        <boxGeometry args={[w * 1.06, len * 0.10, w * 0.80]} />
      </mesh>
      {/* knuckle cylinder at base */}
      <mesh position={[0, -len / 2, 0]} material={M_JOINT}>
        <cylinderGeometry args={[w * 0.42, w * 0.42, w * 0.30, 14]} />
      </mesh>
    </group>
  )
}

/* ── 3-segment finger ───────────────────────────────────────────────────── */
function Finger({
  pos, rot, b1 = 0.48, b2 = 0.56, scale = 1,
}: {
  pos: [number, number, number]
  rot: [number, number, number]
  b1?: number
  b2?: number
  scale?: number
}) {
  const L0 = 0.28 * scale
  const L1 = 0.22 * scale
  const L2 = 0.17 * scale
  const W  = 0.066 * scale

  return (
    <group position={pos} rotation={rot}>
      <Seg len={L0} w={W} />
      <group position={[0, -L0, 0]} rotation={[b1, 0, 0]}>
        <Seg len={L1} w={W * 0.86} />
        <group position={[0, -L1, 0]} rotation={[b2, 0, 0]}>
          <Seg len={L2} w={W * 0.70} />
          {/* fingertip pad */}
          <mesh position={[0, -L2 * 0.58, 0]} material={M_JOINT}>
            <boxGeometry args={[W * 0.60, L2 * 0.38, W * 0.54]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/* ── PCB board with components ─────────────────────────────────────────── */
function PCBoard() {
  const glowRef = useRef<THREE.MeshStandardMaterial>(null!)

  useFrame(({ clock }) => {
    glowRef.current.emissiveIntensity = 2.2 + Math.sin(clock.getElapsedTime() * 2.2) * 0.7
  })

  return (
    <group position={[0, -0.44, 0.02]} rotation={[-0.05, 0.18, 0]}>

      {/* board base */}
      <mesh material={M_PCB}>
        <boxGeometry args={[1.5, 0.032, 1.05]} />
      </mesh>

      {/* ── centre glow chip (the one the hand targets) ── */}
      <mesh position={[0, 0.048, 0]}>
        <boxGeometry args={[0.19, 0.052, 0.19]} />
        <meshStandardMaterial
          ref={glowRef}
          color="#0d0d12"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff5500"
          emissiveIntensity={2.2}
        />
      </mesh>

      {/* gold pins — all four sides of centre chip */}
      {([-0.07, -0.035, 0, 0.035, 0.07] as number[]).map((x, i) => (
        <mesh key={`nt${i}`} position={[x, 0.054,  0.11]} material={M_GOLD}>
          <boxGeometry args={[0.011, 0.008, 0.038]} />
        </mesh>
      ))}
      {([-0.07, -0.035, 0, 0.035, 0.07] as number[]).map((x, i) => (
        <mesh key={`nb${i}`} position={[x, 0.054, -0.11]} material={M_GOLD}>
          <boxGeometry args={[0.011, 0.008, 0.038]} />
        </mesh>
      ))}
      {([-0.07, -0.035, 0, 0.035, 0.07] as number[]).map((z, i) => (
        <mesh key={`nl${i}`} position={[-0.11, 0.054, z]} material={M_GOLD}>
          <boxGeometry args={[0.038, 0.008, 0.011]} />
        </mesh>
      ))}
      {([-0.07, -0.035, 0, 0.035, 0.07] as number[]).map((z, i) => (
        <mesh key={`nr${i}`} position={[0.11, 0.054, z]} material={M_GOLD}>
          <boxGeometry args={[0.038, 0.008, 0.011]} />
        </mesh>
      ))}

      {/* other ICs */}
      <mesh position={[-0.42, 0.046, -0.22]} material={M_CHIP}><boxGeometry args={[0.14, 0.050, 0.09]} /></mesh>
      <mesh position={[ 0.38, 0.044, 0.26]}  material={M_CHIP}><boxGeometry args={[0.11, 0.044, 0.07]} /></mesh>
      <mesh position={[-0.22, 0.044, 0.36]}  material={M_CHIP}><boxGeometry args={[0.09, 0.044, 0.11]} /></mesh>
      <mesh position={[ 0.50, 0.042, -0.16]} material={M_CHIP}><boxGeometry args={[0.07, 0.040, 0.07]} /></mesh>
      <mesh position={[-0.54, 0.044, 0.10]}  material={M_CHIP}><boxGeometry args={[0.13, 0.044, 0.06]} /></mesh>
      <mesh position={[ 0.16, 0.042, -0.40]} material={M_CHIP}><boxGeometry args={[0.09, 0.040, 0.09]} /></mesh>
      <mesh position={[-0.28, 0.040, -0.38]} material={M_CHIP}><boxGeometry args={[0.07, 0.036, 0.07]} /></mesh>
      <mesh position={[ 0.38, 0.046, 0.38]}  material={M_CHIP}><boxGeometry args={[0.11, 0.046, 0.07]} /></mesh>

      {/* electrolytic capacitors */}
      <mesh position={[ 0.58, 0.064, 0.28]}  material={M_COPPER}><cylinderGeometry args={[0.024, 0.024, 0.086, 8]} /></mesh>
      <mesh position={[ 0.50, 0.058, 0.12]}  material={M_COPPER}><cylinderGeometry args={[0.018, 0.018, 0.074, 8]} /></mesh>
      <mesh position={[-0.52, 0.064, -0.28]} material={M_COPPER}><cylinderGeometry args={[0.024, 0.024, 0.086, 8]} /></mesh>
      <mesh position={[-0.34, 0.058, 0.40]}  material={M_COPPER}><cylinderGeometry args={[0.018, 0.018, 0.070, 8]} /></mesh>

      {/* copper traces */}
      <mesh position={[-0.26, 0.022, 0.00]}  material={M_GOLD}><boxGeometry args={[0.19, 0.004, 0.007]} /></mesh>
      <mesh position={[ 0.22, 0.022, 0.10]}  material={M_GOLD}><boxGeometry args={[0.14, 0.004, 0.007]} /></mesh>
      <mesh position={[ 0.00, 0.022, 0.24]}  material={M_GOLD}><boxGeometry args={[0.007, 0.004, 0.18]} /></mesh>
      <mesh position={[-0.10, 0.022, -0.20]} material={M_GOLD}><boxGeometry args={[0.007, 0.004, 0.15]} /></mesh>
      <mesh position={[ 0.32, 0.022, -0.10]} material={M_GOLD}><boxGeometry args={[0.22, 0.004, 0.007]} /></mesh>
      <mesh position={[-0.40, 0.022, 0.10]}  material={M_GOLD}><boxGeometry args={[0.007, 0.004, 0.22]} /></mesh>
    </group>
  )
}

/* ── mechanical arm + hand ─────────────────────────────────────────────── */
function RobotHand() {
  const root = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    root.current.position.y = Math.sin(t * 0.72) * 0.016
    root.current.rotation.z = Math.sin(t * 0.48) * 0.005
    root.current.rotation.x = Math.sin(t * 0.55) * 0.004
  })

  return (
    <group ref={root} position={[0.04, 0.30, 0.06]}>

      {/* ── forearm (exits top of frame) ── */}
      <mesh position={[0, 0.74, 0]} material={M_ARM}>
        <cylinderGeometry args={[0.115, 0.130, 1.05, 18]} />
      </mesh>
      {/* ring collars */}
      {([0.22, 0.46, 0.70] as number[]).map((y, i) => (
        <mesh key={i} position={[0, y, 0]} material={M_JOINT}>
          <cylinderGeometry args={[0.133, 0.133, 0.026, 18]} />
        </mesh>
      ))}
      {/* four cable runs along forearm */}
      {([0, 1, 2, 3] as number[]).map(i => (
        <mesh
          key={i}
          position={[Math.sin(i * Math.PI / 2) * 0.108, 0.50, Math.cos(i * Math.PI / 2) * 0.108]}
          material={M_RIDGE}
        >
          <boxGeometry args={[0.016, 0.72, 0.016]} />
        </mesh>
      ))}

      {/* ── wrist ── */}
      <mesh position={[0, 0.055, 0]} material={M_JOINT}>
        <cylinderGeometry args={[0.130, 0.112, 0.13, 18]} />
      </mesh>
      <mesh position={[0, -0.008, 0]} material={M_RIDGE}>
        <cylinderGeometry args={[0.115, 0.115, 0.042, 20]} />
      </mesh>

      {/* ── palm ── */}
      <mesh position={[0, -0.115, 0]} material={M_ARM}>
        <boxGeometry args={[0.24, 0.108, 0.17]} />
      </mesh>
      {/* recessed palm panel */}
      <mesh position={[0, -0.115, 0]} material={M_RIDGE}>
        <boxGeometry args={[0.18, 0.068, 0.12]} />
      </mesh>
      {/* palm side rails */}
      <mesh position={[-0.122, -0.115, 0]} material={M_JOINT}>
        <boxGeometry args={[0.008, 0.096, 0.15]} />
      </mesh>
      <mesh position={[ 0.122, -0.115, 0]} material={M_JOINT}>
        <boxGeometry args={[0.008, 0.096, 0.15]} />
      </mesh>

      {/* ── 4 fingers ── (point mostly down, curl toward PCB) */}
      <Finger pos={[-0.090, -0.178, 0.06]} rot={[-0.32,  0.10,  0.07]} b1={0.50} b2={0.58} />
      <Finger pos={[-0.030, -0.178, 0.08]} rot={[-0.28,  0.02,  0.02]} b1={0.48} b2={0.56} />
      <Finger pos={[ 0.030, -0.178, 0.08]} rot={[-0.28, -0.02, -0.02]} b1={0.48} b2={0.56} />
      <Finger pos={[ 0.090, -0.178, 0.06]} rot={[-0.32, -0.10, -0.07]} b1={0.50} b2={0.58} />

      {/* ── thumb (shorter, rotated out to the side) ── */}
      <Finger pos={[0.142, -0.095, 0.04]} rot={[-0.28, 0.12, -1.12]} b1={0.38} b2={0.46} scale={0.86} />
    </group>
  )
}

/* ── canvas / scene ─────────────────────────────────────────────────────── */
export default function RobotScene() {
  return (
    <Canvas
      camera={{ position: [0.42, 0.08, 1.05], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
    >
      {/* near-zero ambient — scene is drama-lit */}
      <ambientLight intensity={0.03} color="#1030ff" />

      {/* key light — cool blue-white from upper right (like studio rim) */}
      <directionalLight position={[3, 5, 1.5]} intensity={2.2} color="#b0ccff" />

      {/* PCB orange glow rising from below */}
      <pointLight position={[0, -0.38, 0.14]} intensity={7}  color="#ff5200" distance={2.2} decay={2} />
      <pointLight position={[0.08, -0.30, 0.18]} intensity={3.5} color="#ff8800" distance={1.6} decay={2} />

      {/* back-left rim — deep blue */}
      <pointLight position={[-2.5, 1.2, -1.5]} intensity={1.4} color="#3060ff" distance={6} decay={1.5} />

      <RobotHand />
      <PCBoard />
    </Canvas>
  )
}
