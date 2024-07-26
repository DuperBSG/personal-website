import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Outlines } from '@react-three/drei';

export default function Box(props) {
  // This reference will give us direct access to the mesh
  const boxRef = useRef();
  // Set up state for the box scale
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll event to update scrollY state
  const handleScroll = (event) => {
    setScrollY(prev => prev + event.deltaY);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  // useFrame hook to update the box scale and rotation
  useFrame(() => {
    if (boxRef.current) {
      const newScale = 1 + scrollY / 3000;
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
      boxRef.current.rotation.z += 0.01;
      boxRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      castShadow
      {...props}
      ref={boxRef}
    >
      <boxGeometry args={[2, 2, 2]} />
      <Edges linewidth={20} threshold={15} color={'black'} />
      <Outlines thickness={1} color={'black'} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
