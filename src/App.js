import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Title from './JSXComponents/Title';
import Introduction from './JSXComponents/Introduction';
import { Canvas } from '@react-three/fiber';
import Box from './JSXComponents/Box';
import { EffectComposer, Glitch } from '@react-three/postprocessing';
import { ambientLight, spotLight } from '@react-three/drei';
import AudioPlayer from './JSXComponents/AudioPlayer';

function App() {
  const [scrollY, setScrollY] = useState(800);
  const scrollRef = useRef(0);
  const intervalRef = useRef(null);

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
    // Clear existing interval if it exists
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up a new interval to update scrollY
    intervalRef.current = setInterval(() => {
      setScrollY(prev => prev + (scrollRef.current - prev) * 0.05);
    }, 16); // Approximately 60 FPS

    // Clean up interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <AudioPlayer src='/[SPOTIFY-DOWNLOADER.COM] Kisses in the Rain.mp3' />
      <div className='title_container'>
        <Canvas dpr={[1, 2]} shadows camera={{ position: [-5, 5, 5], fov: 50 }}>
          <ambientLight />
          <spotLight intensity={1000} angle={0.25} penumbra={0.5} position={[20, 10, 5]} castShadow />
          <Box dim={[1, 1, 1]} position={[1, 1, -1]} scrollY={scrollY} offset={0.01}/>
          <Box dim={[2, 2, 2]} position={[1, 1, -1]} scrollY={scrollY} offset={-0.013}/>
          <EffectComposer>
            <Glitch delay={[0.5, 2.5]} duration={[0.6, 1.0]} strength={[0.3, 0.6]} />
          </EffectComposer>
        </Canvas>
      </div>
      <Title spacing={scrollY} opacity={`${scrollY / 1000}`}/>
    </>
  );
}

export default App;
