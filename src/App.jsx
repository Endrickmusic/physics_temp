import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Experience from "./Experience";
import './index.css'



export default function App() {

 return (

    <Canvas 
    shadows 
    camera={{ position: [5, 1, -5], fov: 40 }}>
      <Environment
        files='./environments/aerodynamics_workshop_2k.hdr' />
        <color 
          attach="background" 
          args={["#aaefef"]} />
      <directionalLight
      castShadow
      position={[0, 4, 2]}
      intensity={10} />
      <Experience />
    </Canvas>
  
  );
}

