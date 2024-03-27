import { useEffect, useRef } from 'react'
import { OrbitControls, RoundedBox, useEnvironment, useTexture } from "@react-three/drei"
import { MathUtils, Matrix4, Quaternion, Vector3 } from "three"
import { Physics, RigidBody, InstancedRigidBodies, CuboidCollider } from "@react-three/rapier"
import { EffectComposer, DepthOfField, N8AO, ToneMapping } from '@react-three/postprocessing'


export default function Experience(){

  const [normalMap_01, normalMap_02]  = useTexture(['./textures/waternormals.jpeg', './textures/SurfaceImperfections003_1K_Normal.jpg'])
  const envMap = useEnvironment({files:'./environments/aerodynamics_workshop_2k.hdr'}) 

  return (
    <>
      <OrbitControls 
      // autoRotate 
      // autoRotateSpeed={0.01} 
      enablePan={false} 
      // enableZoom={false} 
      // minPolarAngle={Math.PI / 8} 
      // maxPolarAngle={Math.PI / 8}
      />  
    
      <Physics
      // debug
      gravity={[0, -0.3, 0]}
      >
      {/* invisible colliders */}
      <RigidBody type='fixed'>
        <CuboidCollider
          args={[ 2.5, 2, 0.2 ]}
          position= {[ 0, 0, 2.7 ]} />
      </RigidBody>
      <RigidBody type='fixed'>
        <CuboidCollider
          args={[ 2.5, 2, 0.2 ]}
          position= {[ 0, 0, - 2.7 ]} />
      </RigidBody>
      <RigidBody type='fixed'>
        <CuboidCollider
          args={[ 0.2, 2, 2.5 ]}
          position= {[ 2.7, 0, 0 ]} />
      </RigidBody>
      <RigidBody type='fixed'>
        <CuboidCollider
          args={[ 0.2, 2, 2.5 ]}
          position= {[ -2.7, 0, 0 ]} />
      </RigidBody>

      <RigidBody type='fixed'>
      <mesh
      receiveShadow
      position={[0, -2, 0]}
      >
        <boxGeometry
        args={[5, 0.1, 5]}
        />
        <meshStandardMaterial 
          metalness={1}
          roughness={0.24}
          normalMap={ normalMap_02 }
          normalScale={0.2}
          color={0xeeeeff}
        />
      </mesh>
      </RigidBody>

       <Instances />
       </Physics>

      <EffectComposer>
        <N8AO aoRadius={0.5} intensity={1} />
        <DepthOfField target={[1, 0, -2.5]} focusRange={0.004} bokehScale={10} />
        {/* <ToneMapping /> */}
      </EffectComposer>
    </>
  )}

  
function Instances({ count = 512, rand = MathUtils.randFloatSpread }) {
  
  const cubesRef = useRef() 
  const [normalMap_01, normalMap_02]  = useTexture(['./textures/waternormals.jpeg', './textures/SurfaceImperfections003_1K_Normal.jpg'])


  const instances = Array.from({ length: count }, (_, i) => ({
    key: i,
    position: [rand(2), 3 + i / 4, rand(2)],
    rotation: [Math.random(), Math.random(), Math.random()]

  }))
  return (

    <InstancedRigidBodies 
    type="dynamic"
    instances={instances} 
    colliders="cuboid"
    friction={10}
    >
      <instancedMesh 
      ref={cubesRef}
      receiveShadow 
      castShadow 
      args={[undefined, undefined, count]} 
      dispose={null}
      >
          <boxGeometry 
          args={[0.3, 0.3, 0.3]}
          />
            <meshStandardMaterial 
              metalness={1}
              roughness={0.12}
              normalMap={ normalMap_01 }
              normalScale={0.3}
            />
        
      </instancedMesh>
    </InstancedRigidBodies>
  )
}