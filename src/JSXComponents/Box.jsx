import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

export default function Box({ dim, scrollY, position, offset}) {
  const boxRef = useRef();

  useFrame(() => {
    if (boxRef.current) {
      const newScale = 1 + scrollY / 3000;
      boxRef.current.rotation.x += offset;
      boxRef.current.rotation.y += offset;
      boxRef.current.rotation.z += offset;
      boxRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <>
      <mesh position={position} ref={boxRef} castShadow>
        <boxGeometry args={dim} />
        <Edges linewidth={4} threshold={1} color={'white'} />
        {/* <Edges linewidth={2} threshold={1} color={'black'} /> */}
        {/* <meshStandardMaterial color="black" /> */}
        <meshPhongMaterial color="black" opacity={0.1} transparent />
        
        
      </mesh>
    </>
  );
}
