import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GlowingOrbProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const GlowingOrb = ({ size = 'md', color = 'primary', className = '' }: GlowingOrbProps) => {
  const orbRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const colorClasses = {
    primary: 'bg-primary shadow-neon',
    secondary: 'bg-secondary shadow-neon-lg',
    accent: 'bg-accent shadow-glow'
  };

  useEffect(() => {
    if (!orbRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(orbRef.current, {
      y: -30,
      duration: 3,
      ease: 'power1.inOut'
    })
    .to(orbRef.current, {
      scale: 1.1,
      duration: 2,
      ease: 'power1.inOut'
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]} 
        rounded-full 
        opacity-20 
        blur-sm 
        animate-glow-pulse
        ${className}
      `}
    />
  );
};

export default GlowingOrb;