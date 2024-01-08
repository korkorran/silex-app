import { FaGithub } from "react-icons/fa";
import { Box } from './Box';
import { Canvas } from '@react-three/fiber';


const ThreeDcubes = () => {
  return (
    <>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <p><b>Instructions : </b> Hover and click on cubes to see effect. <a href='https://github.com/frederic-lang/awesome-konva-react-demos/blob/master/src/demos/3Dcubes' target='_blank'><FaGithub /></a></p>
    </>
  );  
};

export default ThreeDcubes;
