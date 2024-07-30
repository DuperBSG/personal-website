import './App.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Title from './JSXComponents/Title';
import { Canvas } from '@react-three/fiber';
import Box from './JSXComponents/Box';
import { EffectComposer, Glitch } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';
import SpherePattern from './JSXComponents/SpherePattern';
import CirclePattern from './JSXComponents/CirclePattern';
import Line from './JSXComponents/Line';
import { ParticleEffects } from './JSXComponents/Particles';
import Text from './JSXComponents/Text'

function App() {
  const [scrollY, setScrollY] = useState(800);
  const scrollRef = useRef(0);
  const intervalRef = useRef(null);
  const [shrink, setShrink] = useState(false);
  const [sphereActive, setSphereActive] = useState(false);

  const handleScrollCube = useCallback((event) => {
    console.log(scrollRef.current)

    if (scrollRef.current > 5000) {
      setShrink(true);
    } else if (scrollRef.current <= 0) {
      scrollRef.current += 100;
    } else {
      scrollRef.current += event.deltaY;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleScrollCube);
    return () => {
      window.removeEventListener('wheel', handleScrollCube);
    };
  }, [handleScrollCube]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setScrollY(prev => prev + (scrollRef.current - prev) * 0.05);
    }, 16);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const orbitPattern = [];
  const LineBG = [];

  for (let i = 0; i <= 10; i += 2) {
    orbitPattern.push(
      <CirclePattern
        key={i / 2}
        dim={[2 + i / 10]} 
        position={[1, 0, -1]}
        active={sphereActive}
        offset={i / 100}
        opacity={1 - i / 10}
      />
    );
  }

  for (let i = 0; i < 100; i++) {
    LineBG.push(
      <Line 
        key={i}
        duration={2} 
        startTime={i / 100} 
        position={10 * i}
      />
    );
  }

  
  return (
    <>
      <div className='title_container'>
        <Canvas dpr={[1, 2]} shadows camera={{ position: [-5, 5, 5], fov: 50 }}>
          <ambientLight />
          <spotLight 
            intensity={1000} 
            angle={0.25} 
            penumbra={0.5} 
            position={[20, 10, 5]} 
            castShadow 
          />
          <SpherePattern 
            dim={[2]} 
            position={[1, 0, -1]}
            active={sphereActive}
          />
          {orbitPattern}
          <Box  
            dim={[1, 1, 1]} 
            position={[1, 0, -1]} 
            scrollY={scrollY} 
            offset={0.01} 
            shrink={shrink}
            onZeroScale={() => {
              setSphereActive(true);
              console.log('yes');
            }}
          />
          <Box 
            dim={[2, 2, 2]} 
            position={[1, 0, -1]} 
            scrollY={scrollY} 
            offset={-0.013} 
            shrink={shrink}
          />
          <EffectComposer>
            <Glitch
              delay={[1.5, 3.5]}
              duration={[0.6, 1.0]}
              strength={[0.3, 1.0]}
              mode={GlitchMode.SPORADIC}
              active
              ratio={0.85}
            />
          </EffectComposer>
        </Canvas>
      </div>
      {/* <ParticleEffects /> */}
      {sphereActive && LineBG}
      <Title spacing={scrollY} opacity={`${scrollY / 1000}`} />
    </>
  );
}

export default App;
