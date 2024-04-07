import { useState, useRef, useEffect } from 'react'
import { OrbitControls, RoundedBox, useEnvironment, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { MathUtils, Matrix4, Quaternion, Vector3 } from "three"
import { Physics, RigidBody, InstancedRigidBodies, CuboidCollider } from "@react-three/rapier"
import { EffectComposer, DepthOfField, N8AO, ToneMapping } from '@react-three/postprocessing'


export default function Experience(){

  const count = 512
  const [normalMap_01, normalMap_02]  = useTexture(['./textures/waternormals.jpeg', './textures/SurfaceImperfections003_1K_Normal.jpg'])
  const envMap = useEnvironment({files:'./environments/aerodynamics_workshop_2k.hdr'}) 
  
  
  const [enabled, setIsEnabled] = useState(true)
  const viewport = useThree(state => state.viewport)
  const toggleSwitch = () => 
  {
  setIsEnabled(previousState => !previousState) 
  console.log('enabled:')
  }

  const instances = useRef()

  useEffect(()=>{
    let rand = MathUtils.randFloatSpread
    instances.current = Array.from({ length: count }, (_, i) => ({
      key: i,
      position: [rand(2), 3 + i / 4, rand(2)],
      rotation: [Math.random(), Math.random(), Math.random()]
    }))
    console.log(instances.current)
  },[])

  return (
    <>
      <OrbitControls 
      // autoRotate 
      // autoRotateSpeed={0.01} 
      // enablePan={false} 
      // enableZoom={false} 
      // minPolarAngle={Math.PI / 8} 
      // maxPolarAngle={Math.PI / 8}
      />  

      <Physics
      // debug
      gravity={[0, -0.3, 0]}
      paused = {enabled? true : false}
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
      onClick={toggleSwitch}
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

       <Instances 
        count={count}
        instances={instances.current}
       />

       </Physics>

      <EffectComposer>
        <N8AO aoRadius={0.5} intensity={1} />
        <DepthOfField target={[1, 0, -2.5]} focusRange={0.004} bokehScale={10} />
        {/* <ToneMapping /> */}
      </EffectComposer>
    </>
  )}

  
function Instances({ count, instances }) {
  
  const cubesRef = useRef() 
  const [normalMap_01, normalMap_02]  = useTexture(['./textures/waternormals.jpeg', './textures/SurfaceImperfections003_1K_Normal.jpg'])
  
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
              roughness={0.22}
              normalMap={ normalMap_01 }
              normalScale={0.3}
              color={`rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`}
            />
        
      </instancedMesh>
    </InstancedRigidBodies>
  )
}