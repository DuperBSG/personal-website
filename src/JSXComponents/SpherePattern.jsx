import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

export default function Box({ dim, position, active }) {
  const boxRef = useRef();
  const [scale, setScale] = useState(0);

  useFrame(() => {
    if (boxRef.current && active) {
      // Increase scale and rotate
      setScale((prevScale) => Math.min(prevScale + 0.05, 1)); // Increase to a max of 1
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
      boxRef.current.rotation.z += 0.01;
      boxRef.current.scale.set(scale, scale, scale);
    }
  });

  useEffect(() => {
    if (!active) {
      setScale(0); // Reset scale when not active
    }
  }, [active]);

  return (
    <mesh position={position} ref={boxRef} castShadow>
      <sphereGeometry args={dim} />
      <Edges linewidth={4} threshold={1} color={active ? 'white' : 'black'} />
      <meshPhongMaterial color="black" opacity={0.01} transparent />
    </mesh>
  );
}
