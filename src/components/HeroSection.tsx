import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import GlowingOrb from './GlowingOrb';
// import Spline from '@splinetool/react-spline';

const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Initial setup
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });

    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100,
      filter: 'blur(10px)'
    });

    // Animate elements in sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6')
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4')
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power2.out'
    }, '-=0.8');

    return () => {
      tl.kill();
    };
  }, []);

  const handleCtaHover = (isHovering: boolean) => {
    if (!ctaRef.current) return;
    
    gsap.to(ctaRef.current, {
      scale: isHovering ? 1.05 : 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-between px-8 lg:px-16 relative overflow-hidden bg-gradient-hero">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <GlowingOrb size="lg" color="primary" className="absolute top-20 left-20" />
        <GlowingOrb size="md" color="secondary" className="absolute bottom-32 left-32" />
        <GlowingOrb size="sm" color="accent" className="absolute top-1/2 right-1/4" />
      </div>

      <div className="flex-1 max-w-3xl z-10">
        <h1 
          ref={headlineRef}
          className="text-6xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block text-gradient">Hi, I'm Ritik Jha</span>
          <span className="block text-foreground">Web Developer</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
        >
          Crafting immersive digital experiences with cutting-edge technologies and pixel-perfect design.
        </p>
        
        <div ref={ctaRef}>
          <Button
            size="lg"
            className="glass-card text-foreground border-primary/30 hover:border-primary/60 hover:shadow-glow px-8 py-4 text-lg font-semibold transition-all duration-300"
            onMouseEnter={() => handleCtaHover(true)}
            onMouseLeave={() => handleCtaHover(false)}
          >
            <span>Hire Me</span>
          </Button>
        </div>
      </div>

      {/* Spline 3D Model Placeholder */}
      <div 
        ref={splineRef}
        className="flex-1 hidden lg:flex items-center justify-center h-96"
      >
        <div className="glass-card w-full h-full rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-4 animate-glow-pulse" />
            <p className="text-muted-foreground">3D Model Loading...</p>
            <p className="text-sm text-muted-foreground/60 mt-2">Spline integration placeholder</p>
          </div>
        </div>
        {/* Uncomment when Spline is ready
        <Spline scene="https://prod.spline.design/your-scene-url" />
        */}
      </div>
    </section>
  );
};

export default HeroSection;