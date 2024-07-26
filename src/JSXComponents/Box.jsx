import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { EffectComposer, Glitch } from '@react-three/postprocessing';

export default function Box({ scrollY, scrollHandle, ...props }) {
  const boxRef = useRef();

  useEffect(() => {
    window.addEventListener('wheel', scrollHandle);
    return () => {
      window.removeEventListener('wheel', scrollHandle);
    };
  }, [scrollHandle]);

  useFrame(() => {
    if (boxRef.current) {
      const newScale = 1 + scrollY / 3000;
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
      boxRef.current.rotation.z += 0.01;
      boxRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <>
      <mesh {...props} ref={boxRef} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <Edges linewidth={15} threshold={1} color={'red'} />
        <Edges linewidth={10} threshold={1} color={'yellow'} />
        <Edges linewidth={7} threshold={1} color={'blue'} />
        <Edges linewidth={3} threshold={1} color={'black'} />
        <meshStandardMaterial color="black" />
      </mesh>
      <EffectComposer>
        <Glitch delay={[0.5, 2.5]} duration={[0.6, 1.0]} strength={[0.3, 0.6]} />
      </EffectComposer>
    </>
  );
}
