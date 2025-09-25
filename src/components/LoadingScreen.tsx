import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set(progressBarRef.current, { width: '0%' });
    gsap.set(textRef.current, { opacity: 0, y: 20 });

    // Animate text in
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    })
    // Animate progress bar
    .to(progressBarRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out'
    })
    // Brief pause
    .to({}, { duration: 0.3 })
    // Fade out loader
    .to(loaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero"
    >
      <div className="text-center">
        <div ref={textRef} className="mb-8">
          <h1 className="text-6xl font-bold text-gradient mb-4">RITIK</h1>
          <p className="text-muted-foreground text-lg">Loading Portfolio Experience</p>
        </div>
        
        <div className="w-80 h-1 bg-muted rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-primary rounded-full shadow-glow"
          />
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full animate-float opacity-60 shadow-neon" />
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-accent rounded-full animate-float opacity-40 shadow-neon" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-secondary rounded-full animate-float opacity-50 shadow-neon" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;