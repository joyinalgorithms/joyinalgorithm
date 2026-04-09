'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';

interface BinaryParticle {
  id: number;
  x: number;
  y: number;
  value: string;
  duration: number;
  delay: number;
  opacity: number;
  size: number;
}

export default function FloatingBinary() {
  const [particles, setParticles] = useState<BinaryParticle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const newParticles: BinaryParticle[] = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        value: Math.random() > 0.5 ? '1' : '0',
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 15,
        opacity: 0.1 + Math.random() * 0.2,
        size: 12 + Math.random() * 10,
      });
    }
    setParticles(newParticles);
  }, []);

  if (!mounted || particles.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          @keyframes binaryFloat {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
      {particles.map((particle) => (
        <Box
          key={particle.id}
          component="span"
          sx={{
            position: 'absolute',
            left: `${particle.x}%`,
            bottom: '-50px',
            color: 'primary.500',
            opacity: particle.opacity,
            fontSize: `${particle.size}px`,
            fontFamily: 'code',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
            animation: `binaryFloat ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.value}
        </Box>
      ))}
    </Box>
  );
}
