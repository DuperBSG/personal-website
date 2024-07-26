import './App.css';
import React from 'react'
import Title from './JSXComponents/Title'
import Introduction from './JSXComponents/Introduction';
import { Canvas } from '@react-three/fiber'
import Box from './JSXComponents/Box'
import OceanView from './JSXComponents/OceanView'
import { useGLTF, AccumulativeShadows, RandomizedLight, Edges, OrbitControls, Outlines, Environment } from "@react-three/drei"

function App() {

  return (
    <>
      <div style={{height: '1000px', width: '100%', position: 'absolute', zIndex: '-10' }} >
        <Canvas dpr={[1, 2]} shadows camera={{ position: [-5, 5, 5], fov: 50 }}>
          <ambientLight />
          <spotLight intensity={1000} angle={0.25} penumbra={0.5} position={[20, 10, 5]} castShadow />
            <Box position={[1, 0, -1]}/>
            {/* <OrbitControls makeDefault dampingFactor={0.3}/> */}
        </Canvas>
      </div>
      <Title />
      <Introduction />
    </>
  );
}

export default App;


<Canvas>
          {/* <ambientLight intensity={5} /> */}
          <ambientLight />
          {/* <directionalLight color="white" position={[5, 5, 5]} intensity={0.1}/> */}
          <Box position={[1, 0, -1]}/>
          <Box position={[-2, 2, -10]}/>
          <Box position={[10, 2, -4]}/>
          <Box position={[-4, -2, -3]}/>
          <spotLight angle={0.25} penumbra={0.5} position={[10, 10, 5]} castShadow />
          <spotLight intensity={500} decay={false} angle={0.2} castShadow position={[5, 5, 5]} shadow-mapSize={128} />
          <AccumulativeShadows frames={100} temporal>
          <RandomizedLight radius={2} position={[5, 2.5, 5]} />
          <OrbitControls makeDefault dampingFactor={0.3}/>
          </AccumulativeShadows>
        </Canvas>
    