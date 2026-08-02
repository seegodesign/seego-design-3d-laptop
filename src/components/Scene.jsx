import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { MathUtils } from 'three'
import Laptop from './laptop'

const INTRO_DURATION = 3
const INTRO_START_ANGLE = -2.72
const INTRO_START_RADIUS = 25
const INTRO_END_ANGLE = -0.38
const INTRO_END_RADIUS = 5
const INTRO_START = [
  Math.sin(INTRO_START_ANGLE) * INTRO_START_RADIUS,
  2.45,
  -Math.cos(INTRO_START_ANGLE) * INTRO_START_RADIUS,
]
const CAMERA_Y = 2

function CameraIntro({ onComplete }) {
  const elapsed = useRef(0)
  const introComplete = useRef(false)

  useFrame(({ camera }, delta) => {
    if (introComplete.current) return

    elapsed.current += delta
    const progress = Math.min(elapsed.current / INTRO_DURATION, 1)
    const eased = 1 - Math.pow(1 - progress, 4)
    const angle = MathUtils.lerp(INTRO_START_ANGLE, INTRO_END_ANGLE, eased)
    const radius = MathUtils.lerp(INTRO_START_RADIUS, INTRO_END_RADIUS, eased)
    const verticalArc = Math.sin(progress * Math.PI) * 0.3

    camera.position.x = Math.sin(angle) * radius
    camera.position.y = MathUtils.lerp(INTRO_START[1], CAMERA_Y, eased) + verticalArc
    camera.position.z = -Math.cos(angle) * radius
    camera.lookAt(0, 0, 0)

    if (progress === 1) {
      introComplete.current = true
      onComplete()
    }
  })

  return null
}

function LoadingFallback() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.8, 0.05, 0.6]} />
        <meshStandardMaterial color="#d1d5db" roughness={0.9} metalness={0.05} />
      </mesh>
    </group>
  )
}

function Desk() {
  return (
    <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#241914" roughness={0.78} metalness={0.02} />
    </mesh>
  )
}

export default function Scene() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <div className="scene">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: INTRO_START, fov: 35, near: 0.1, far: 100 }}
        onCreated={({ camera, gl }) => {
          camera.lookAt(0, 0, 0)
          gl.toneMappingExposure = 0.95
        }}
        shadows
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#07090d"]} />
        <ambientLight intensity={0.28} color="#8290ad" />
        <spotLight
          position={[-3.5, 4.5, -3]}
          intensity={34}
          angle={0.58}
          penumbra={0.76}
          distance={14}
          decay={2}
          color="#ffd3a1"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0002}
        />
        <directionalLight position={[3, 1.5, 2]} intensity={0.55} color="#8197c5" />
        <pointLight
          position={[0, -0.5, -0.15]}
          intensity={1.5}
          distance={4.2}
          decay={0}
          color="#668cff"
        />
        <pointLight
          position={[0, -1.2, -0.15]}
          intensity={5.5}
          distance={4.2}
          decay={2}
          color="#668cff"
        />
        <Desk />
        <Suspense fallback={<LoadingFallback />}>
          <Laptop websiteVisible={introComplete} />
          <CameraIntro onComplete={() => setIntroComplete(true)} />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={2}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2 - 0.05}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  )
}
