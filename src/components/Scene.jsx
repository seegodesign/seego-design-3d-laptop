import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Laptop from './laptop'

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
        camera={{ position: [0, 0, -5], fov: 35, near: 0.1, far: 100 }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        shadows={false}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#ffffff"]} />
        <hemisphereLight intensity={1.25} color="#ffffff" groundColor="#dbe3ea" />
        <directionalLight position={[2.5, 4, 3]} intensity={2} color="#ffffff" />
        <directionalLight position={[-3, 2, -2]} intensity={1} color="#cbd5e1" />
        <Suspense fallback={<LoadingFallback />}>
          <Laptop />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={2}
          maxDistance={6}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  )
}
