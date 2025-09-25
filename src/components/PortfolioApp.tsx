import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import LocomotiveScroll from 'locomotive-scroll';

// Components
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const PortfolioApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  // const locomotiveRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!isLoading) {
      // Initialize smooth scrolling after loading
      /* Uncomment when Locomotive Scroll is ready
      if (containerRef.current) {
        locomotiveRef.current = new LocomotiveScroll({
          el: containerRef.current,
          smooth: true,
          multiplier: 1,
          class: 'is-reveal'
        });
        
        // Update ScrollTrigger when locomotive scroll updates
        locomotiveRef.current.on('scroll', ScrollTrigger.update);
        
        ScrollTrigger.scrollerProxy(containerRef.current, {
          scrollTop(value) {
            return arguments.length 
              ? locomotiveRef.current?.scrollTo(value, 0, 0)
              : locomotiveRef.current?.scroll.instance.scroll.y;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight
            };
          },
          pinType: containerRef.current?.style.transform ? 'transform' : 'fixed'
        });
      }
      */

      // Main content fade in
      gsap.fromTo(containerRef.current,
        {
          opacity: 0,
          filter: 'blur(20px)'
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power2.out'
        }
      );

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    }

    return () => {
      // Cleanup
      // locomotiveRef.current?.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div 
      ref={containerRef}
      className="relative overflow-x-hidden"
      data-scroll-container
    >
      <Navigation />
      
      <main>
        <section id="home" data-scroll-section>
          <HeroSection />
        </section>
        
        <section data-scroll-section>
          <AboutSection />
        </section>
        
        <section data-scroll-section>
          <ProjectsSection />
        </section>
        
        <section data-scroll-section>
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioApp;