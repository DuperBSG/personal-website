import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

export default function Box({ dim, scrollY, position, offset, shrink, onZeroScale }) {
  const boxRef = useRef();
  const hasCalledOnZeroScale = useRef(false); // To prevent multiple calls
  const [off, setOff] = useState(false)

  useFrame(() => {
    if (boxRef.current) {
      const baseScale = 1;
      const targetScale = shrink ? 0 : baseScale * (1 + scrollY / 3000);

      // Smooth transition using lerp
      boxRef.current.scale.x = THREE.MathUtils.lerp(boxRef.current.scale.x, targetScale, 0.1);
      boxRef.current.scale.y = THREE.MathUtils.lerp(boxRef.current.scale.y, targetScale, 0.1);
      boxRef.current.scale.z = THREE.MathUtils.lerp(boxRef.current.scale.z, targetScale, 0.1);

      boxRef.current.rotation.x += offset;
      boxRef.current.rotation.y += offset;
      boxRef.current.rotation.z += offset;

      // Check if the scale is effectively zero
      if (Math.abs(boxRef.current.scale.x) < 0.01 && 
          Math.abs(boxRef.current.scale.y) < 0.01 && 
          Math.abs(boxRef.current.scale.z) < 0.01) {
        if (!hasCalledOnZeroScale.current && typeof onZeroScale === 'function') {
          onZeroScale();
          hasCalledOnZeroScale.current = true; // Prevent future calls
          setOff(true)
          console.log("DONE")
        }
      } else {
        // Reset the flag if the scale is not zero
        hasCalledOnZeroScale.current = false;
      }
    }
  });

  return (
    !off &&
    <mesh position={position} ref={boxRef} castShadow>
      <boxGeometry args={dim} />
      <Edges linewidth={4} threshold={1} color={'white'}  />
      <meshPhongMaterial color="black" opacity={0.1} transparent />
    </mesh>
  );
}
