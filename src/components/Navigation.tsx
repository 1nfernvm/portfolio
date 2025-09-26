import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    // Initial nav animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    gsap.set(navRef.current, { opacity: 0, y: -20 });
    
    tl.to(navRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Scroll detection for active section
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollY = window.scrollY;
      
      for (const section of sections) {
        const element = document.getElementById(section === 'home' ? '' : section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    setIsOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      // Opening animation
      gsap.set(mobileMenuRef.current, { x: '100%' });
      gsap.to(mobileMenuRef.current, {
        x: '0%',
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      // Closing animation
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="sticky top-0 left-0 right-0 z-40 px-8 lg:px-16 py-6"
      >
        <div className="glass-card rounded-2xl px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-gradient cursor-pointer">
              RITIK
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`
                    px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden
                    hover:scale-105 hover:shadow-glow
                    ${activeSection === item.label.toLowerCase() 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  {item.label}
                  {activeSection === item.label.toLowerCase() && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden glass p-2 rounded-lg hover:shadow-neon transition-all duration-300"
            >
              {isOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`
          fixed top-0 right-0 bottom-0 w-80 z-50 glass-card backdrop-blur-xl
          transform translate-x-full md:hidden
        `}
      >
        <div className="p-8 pt-20">
          <div className="space-y-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`
                  block w-full text-left px-4 py-3 rounded-lg transition-all duration-300
                  ${activeSection === item.label.toLowerCase()
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;