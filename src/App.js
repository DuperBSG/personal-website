import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Title from './JSXComponents/Title';
import Introduction from './JSXComponents/Introduction';
import { Canvas } from '@react-three/fiber';
import Box from './JSXComponents/Box';
import { EffectComposer, Glitch } from '@react-three/postprocessing';
import { ambientLight, spotLight } from '@react-three/drei';

function App() {
  const [scrollY, setScrollY] = useState(800);
  const scrollRef = useRef(0);

  const handleScrollCube = (event) => {
    scrollRef.current += event.deltaY;
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScrollCube);
    return () => {
      window.removeEventListener('wheel', handleScrollCube);
    };
  }, []);

  useEffect(() => {
    const handleFrame = () => {
      setScrollY((prev) => prev + (scrollRef.current - prev) * 0.1);
    };

    const frameId = requestAnimationFrame(handleFrame);
    return () => cancelAnimationFrame(frameId);
  }, [scrollY]);

  return (
    <>
      <div className='title_container'>
        <Canvas dpr={[1, 2]} shadows camera={{ position: [-5, 5, 5], fov: 50 }}>
          <ambientLight />
          <spotLight intensity={1000} angle={0.25} penumbra={0.5} position={[20, 10, 5]} castShadow />
          <Box position={[1, 0, -1]} scrollY={scrollY} />
          <EffectComposer>
            <Glitch delay={[0.5, 2.5]} duration={[0.6, 1.0]} strength={[0.3, 0.6]} />
          </EffectComposer>
        </Canvas>
      </div>
      <Title spacing={`${scrollY / 40}px`} />
      <Introduction />
    </>
  );
}

export default App;
