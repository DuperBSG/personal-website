import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

// Easing function for ease-in-out effect
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  // return t * t * t;
};

export default function Box({ dim, position, active, offset }) {
  const SphereRef = useRef();
  const [scale, setScale] = useState(0);
  const [startTime, setStartTime] = useState(0);

  useFrame((state) => {
    if (SphereRef.current) {
      const elapsedTime = state.clock.getElapsedTime() - startTime;
      let newScale = scale;

      if (active) {
        // Calculate the eased scale
        const duration = 2; // duration of the scaling in seconds
        const t = Math.min(elapsedTime / duration, 1); // Normalized time
        newScale = easeInOutCubic(t);
      } else {
        // Reset scale when not active
        newScale = 0;
      }

      // Update the scale
      SphereRef.current.scale.set(newScale, newScale, newScale);
      SphereRef.current.rotation.x += offset;
      SphereRef.current.rotation.y += offset;
      SphereRef.current.rotation.z += offset;

      setScale(newScale);
    }
  });

  useEffect(() => {
    if (active) {
      setStartTime(performance.now() / 1000); // Set start time in seconds
    }
  }, [active]);

  return (
    <mesh position={position} ref={SphereRef} castShadow>
      <circleGeometry args={dim} />
      <Edges linewidth={2} threshold={1} color={active ? 'white' : 'black'} />
      <meshPhongMaterial color="black" opacity={0.01} transparent />
    </mesh>
  );
}
