import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { MathUtils } from 'three'
import Laptop from './laptop'

const INTRO_DURATION = 3.8
const INTRO_START = [1.65, 0.85, -8]
const CAMERA_Y = 2

function CameraIntro() {
  const elapsed = useRef(0)
  const introComplete = useRef(false)

  useFrame(({ camera }, delta) => {
    if (introComplete.current) return

    elapsed.current += delta
    const progress = Math.min(elapsed.current / INTRO_DURATION, 1)
    const eased = 1 - Math.pow(1 - progress, 4)
    const arc = Math.sin(progress * Math.PI) * 0.22

    camera.position.x = MathUtils.lerp(INTRO_START[0], 0, eased)
    camera.position.y = MathUtils.lerp(INTRO_START[1], CAMERA_Y, eased) + arc
    camera.position.z = MathUtils.lerp(INTRO_START[2], -5, eased)
    camera.lookAt(0, 0, 0)
    introComplete.current = progress === 1
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

export default function Scene() {
  return (
    <div className="scene">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: INTRO_START, fov: 35, near: 0.1, far: 100 }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        shadows={false}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#ffffff"]} />
        <directionalLight position={[2.5, 4, 3]} intensity={2} color="#ffffff" />
        <directionalLight position={[-3, 2, -2]} intensity={1} color="#cbd5e1" />
        <Suspense fallback={<LoadingFallback />}>
          <Laptop />
          <CameraIntro />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableRotate={false}
          minDistance={2}
          maxDistance={10}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  )
}
