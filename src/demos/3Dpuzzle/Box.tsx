import { useRef, useState } from 'react'
//import { useFrame } from '@react-three/fiber'

export function Box(props:any) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<any>()
  // Set up state for the hovered and active state
  const [_, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((_, delta) => (meshRef.current!.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(_) => setActive(!active)}
      onPointerOver={(_) => setHover(true)}
      onPointerOut={(_) => setHover(false)}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshBasicMaterial color={'0xffff00'} />
    </mesh>
  )
}