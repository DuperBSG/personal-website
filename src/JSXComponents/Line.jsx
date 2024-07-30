import React, { useRef, useState, useEffect } from 'react';

const PulsingLine = ({ duration, startTime, position }) => {
  const [opacity, setOpacity] = useState(0);
  const startTimeRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    const animate = (time) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsedTime = (time - startTimeRef.current) / 1000; // Convert ms to seconds

      if (elapsedTime >= startTime) {
        const progress = ((elapsedTime - startTime) % duration) / duration; // Calculate progress as a fraction of duration
        setOpacity((1 - Math.abs(progress - 0.5) * 2) / 4); // Pulse effect: 1 at center, 0 at edges
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [duration, startTime]);

  return (
    <div
      style={{
        width: '100%',
        height: '2px',
        backgroundColor: 'white',
        position: 'absolute',
        top: `${position}px`,
        opacity: opacity,
        zIndex: '-1000'
      }}
    ></div>
  );
};

export default PulsingLine;
