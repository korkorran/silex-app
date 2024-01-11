import { useRef} from 'react'
import { useChainStore } from './chainStore';
//import { useFrame } from '@react-three/fiber'

export function Box(props:any) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<any>()
  const {setChain } = useChainStore((state:any)=> ({ setChain: state.set}))

  const onClick = () => {
    fetch('http://localhost:5000/rotate_cube', {
      method: 'POST',
      //mode: 'no-cors',
      headers: {
        "Content-Type": "application/json"
      },
      body : JSON.stringify({position_cube:props.i})
    }).then(c=> c.json())
    .then(c => setChain(c.coordonnees));
  }

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={1}
      onClick={onClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={props.i %2 == 0 ? 'red' : 'orange'} />
    </mesh>
  )
}