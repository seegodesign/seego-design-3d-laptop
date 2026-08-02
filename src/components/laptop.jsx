import { useMemo } from 'react'
import { Center, Html, useGLTF } from '@react-three/drei'
import { createPortal } from '@react-three/fiber'
import ScreenWebsite from './ScreenWebsite'

const SCREEN_CENTER = [-1.069646, 0.0415, -0.803881]

export default function Laptop() {
  const { scene } = useGLTF('/models/MacBookPro_blend.glb')
  const laptop = useMemo(() => {
    const clone = scene.clone(true)
    clone.getObjectByName('Plane')?.removeFromParent()

    return clone
  }, [scene])
  const topPart = laptop.getObjectByName('macBook_TopPart')

  return (
    <Center>
      <primitive object={laptop} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} />
      {topPart && createPortal(
        <Html
          transform
          position={SCREEN_CENTER}
          rotation={[Math.PI / 2, 0, Math.PI]}
          distanceFactor={0.795}
          zIndexRange={[10, 0]}
        >
          <ScreenWebsite />
        </Html>,
        topPart,
      )}
    </Center>
  )
}

useGLTF.preload('/models/MacBookPro_blend.glb')
