import { useMemo } from 'react'
import { Center, useGLTF } from '@react-three/drei'

export default function Laptop() {
  const { scene } = useGLTF('/models/MacBookPro_blend.glb')
  const laptop = useMemo(() => {
    const clone = scene.clone(true)
    clone.getObjectByName('Plane')?.removeFromParent()

    return clone
  }, [scene])

  return (
    <Center>
      <primitive object={laptop} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} />
    </Center>
  )
}

useGLTF.preload('/models/MacBookPro_blend.glb')
