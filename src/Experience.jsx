import { OrbitControls, RoundedBox, useEnvironment, useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { Physics, RigidBody } from "@react-three/rapier"

export default function Experience(){

  const [normalMap_01, normalMap_02]  = useTexture(['./textures/waternormals.jpeg', './textures/SurfaceImperfections003_1K_Normal.jpg'])
  const envMap = useEnvironment({files:'./environments/aerodynamics_workshop_2k.hdr'}) 

  return (
    <>
      <OrbitControls />  

      <Physics>
      <RigidBody type='fixed'>
      <mesh
      receiveShadow
      >
        <boxGeometry
        args={[5, 0.2, 5]}
        />
        <meshStandardMaterial 
          metalness={1}
          roughness={0.24}
          normalMap={ normalMap_02 }
          normalScale={0.2}
          color={0xfffff22}
        />
      </mesh>
      </RigidBody>

      <RigidBody>  
        <RoundedBox
          castShadow
          radius={0.01}
          rotation={[1.2 * Math.PI, 0, 0]}
          position={[0, 5, 0]}
          >
          <meshStandardMaterial 
            metalness={1}
            roughness={0.12}
            normalMap={ normalMap_01 }
            normalScale={0.3}
          />
       </RoundedBox>
       </RigidBody>
       </Physics>

    </>
  )}