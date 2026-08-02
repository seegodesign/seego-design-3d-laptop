import { useMemo } from 'react'
import { Center, Html, useGLTF } from '@react-three/drei'
import { createPortal } from '@react-three/fiber'
import ScreenWebsite from './ScreenWebsite'

// Keep Drei's HTML occlusion plane slightly in front of the modeled display.
// At the original surface position the two depth buffers competed and flickered.
const SCREEN_CENTER = [-1.069646, 0.038, -0.803881]

export default function Laptop({ websiteVisible = false }) {
  const { scene } = useGLTF('/models/MacBookPro_blend.glb')
  const laptop = useMemo(() => {
    const clone = scene.clone(true)
    clone.getObjectByName('Plane')?.removeFromParent()
    clone.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })

    return clone
  }, [scene])
  const topPart = laptop.getObjectByName('macBook_TopPart')

  return (
    <Center>
      <primitive object={laptop} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} />
      {topPart && createPortal(
        <Html
          transform
          occlude="blending"
          position={SCREEN_CENTER}
          rotation={[Math.PI / 2, 0, Math.PI]}
          distanceFactor={0.795}
          zIndexRange={[10, 0]}
        >
          <ScreenWebsite visible={websiteVisible} />
        </Html>,
        topPart,
      )}
    </Center>
  )
}

useGLTF.preload('/models/MacBookPro_blend.glb')
