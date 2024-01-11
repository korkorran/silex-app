import { FaGithub } from "react-icons/fa";
import { Box } from './Box';
import { Canvas } from '@react-three/fiber';
import "./3Dpuzzle.scss"
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import { useChainStore } from "./chainStore";

const ThreeDpuzzle = () => {
  const {chain, setChain } = useChainStore((state:any)=> ({chain: state.chain, setChain: state.set}))
  useEffect(()=> {
    fetch('http://localhost:5000/etat_cube', {
      method: 'GET',
      //mode: 'no-cors',
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(c => c.json())
    .then(c => setChain(c.coordonnees))
    .then(_ => console.log(chain));
  }, [])

  if(chain?.length >0) {
    return (
      <>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          { chain && chain?.map((coordinates : number[], i:number)=> (
            <Box position={coordinates} i={i}  />
          ))}
          <OrbitControls />
        </Canvas>
        <p><b>Instructions : </b> Hover and click on cubes to see effect. <a href='https://github.com/frederic-lang/awesome-konva-react-demos/blob/master/src/demos/3Dcubes' target='_blank'><FaGithub /></a></p>
      </>
    )}
    else {
      return (<></>);
    }
};

export default ThreeDpuzzle;
