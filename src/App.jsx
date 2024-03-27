import { useState } from 'react'
import Logo from '/face-blowing-a-kiss.svg'
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Experience from "./Experience";
import './index.css'

export default function App() {

 return (

  
    <Canvas shadows camera={{ position: [3, 10, 3], fov: 40 }}>
      <Environment
        files='./environments/aerodynamics_workshop_2k.hdr' />
        <color 
          attach="background" 
          args={["#aaefef"]} />
      <Experience />
    </Canvas>
  
  );
}

