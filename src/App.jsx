import { Canvas } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import Experience from "./Experience";
import './index.css'



export default function App() {

 return (

    <Canvas 
    shadows 
    orthographic
    camera={{ position: [5, 1, -5], fov: 40, zoom: 50 }}>
      <Environment
        files='./environments/aerodynamics_workshop_2k.hdr' />
        <color 
          attach="background" 
          args={["#111111"]} />
      <directionalLight
      castShadow
      position={[0, 4, 2]}
      intensity={10} />
      <Experience />
      <Text>
        Landing Page
      </Text>
    </Canvas>
  
  );
}

