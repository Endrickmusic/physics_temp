import { Canvas } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import Experience from "./Experience";
import './index.css'



export default function App() {

 return (

    <Canvas 
    shadows 
    orthographic
    camera={{ position: [5, -2, 5], fov: 40, zoom: 90}}>
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
      <Text
      position={[0, -2.2, 2.5]}
      rotation={[0, 0, 0]}
      scale={0.17}
      >
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget.
      </Text>
      <Text
      position={[2.5, -2.2, -0.2]}
      rotation={[0, Math.PI/2, 0]}
      scale={0.17}
      >
      Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id.
      </Text>
      
      <Text
      position={[0, -2.2, -2.5]}
      rotation={[0, 2*Math.PI, 0]}
      scale={0.17}
      >
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget.
      </Text>
      <Text
      position={[-2.5, -2.2, -0.2]}
      rotation={[0, -Math.PI/2, 0]}
      scale={0.17}
      >
      Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id.
      </Text>
    </Canvas>
  
  );
}

