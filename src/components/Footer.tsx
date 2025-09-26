import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react';
import GlowingOrb from './GlowingOrb';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: GithubLogo, href: '#', label: 'GitHub' },
    { icon: LinkedinLogo, href: '#', label: 'LinkedIn' },
    { icon: TwitterLogo, href: '#', label: 'Twitter' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer slide up animation
      gsap.fromTo(footerRef.current,
        {
          y: 60,
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating particles animation
      const particles = particlesRef.current?.children || [];
      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          y: -30,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.2
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = targetId === 'home' ? document.body : document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-20 px-8 lg:px-16 bg-gradient-hero overflow-hidden"
    >
      {/* Background Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <GlowingOrb size="sm" color="primary" className="absolute top-10 left-10" />
        <GlowingOrb size="sm" color="secondary" className="absolute top-20 right-20" />
        <GlowingOrb size="sm" color="accent" className="absolute bottom-20 left-1/4" />
        <GlowingOrb size="sm" color="primary" className="absolute bottom-10 right-1/3" />
        
        {/* Small floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary rounded-full opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent rounded-full opacity-40" />
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-secondary rounded-full opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-gradient">RITIK</h3>
            <p className="text-muted-foreground leading-relaxed">
              Crafting the future of web experiences with cutting-edge technology 
              and immersive design.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-center md:text-left">
              © 2024 Ritik. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Made with</span>
              <Heart size={16} className="text-primary animate-glow-pulse" />
              <span>using React & GSAP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;