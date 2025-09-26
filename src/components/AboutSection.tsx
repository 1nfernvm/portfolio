import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Phosphor icons
import { 
  Code, 
  Palette, 
  Lightning, 
  Rocket, 
  Globe,
  Cpu,
  Database,
  GitBranch
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, name: 'HTML', color: 'text-primary' },
    { icon: Palette, name: 'CSS', color: 'text-secondary' },
    { icon: Lightning, name: 'JavaScript', color: 'text-accent' },
    { icon: Globe, name: 'DOM', color: 'text-primary' },
    { icon: Rocket, name: 'GSAP', color: 'text-secondary' },
    { icon: Cpu, name: 'Node.js', color: 'text-accent' },
    { icon: GitBranch, name: 'Express.js', color: 'text-primary' },
    { icon: Database, name: 'MongoDB', color: 'text-secondary' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(sectionRef.current, 
        { 
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        {
          x: -100,
          opacity: 0,
          rotation: -5
        },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Skills stagger animation
      gsap.fromTo(skillsRef.current?.children || [],
        {
          y: 60,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleImageHover = (isHovering: boolean) => {
    gsap.to(imageRef.current, {
      scale: isHovering ? 1.05 : 1,
      rotation: isHovering ? 2 : 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-8 lg:px-16 bg-background"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20 text-gradient">
          About Me
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div 
            ref={imageRef}
            className="flex justify-center lg:justify-start"
            onMouseEnter={() => handleImageHover(true)}
            onMouseLeave={() => handleImageHover(false)}
          >
            <div className="relative">
              <div className="w-80 h-80 glass-card rounded-full overflow-hidden cursor-pointer">
                <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                  <div className="text-6xl text-primary-foreground">R</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full opacity-60 animate-glow-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-full opacity-40 animate-float" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Full Stack Developer
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm passionate about creating full-stack web applications using modern technologies 
                like JavaScript, Node.js, and MongoDB. I focus on crafting seamless user experiences 
                from frontend animations to robust backend systems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm constantly expanding my skills and love learning new technologies to create 
                innovative web solutions. My goal is to build applications that are both 
                visually stunning and highly functional.
              </p>
            </div>

            {/* Skills Grid */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-foreground">
                Skills & Technologies
              </h4>
              <div 
                ref={skillsRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="glass-card p-4 rounded-lg text-center group hover:scale-105 transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => {
                      gsap.to(`#skill-${index}`, {
                        scale: 1.2,
                        rotation: 360,
                        duration: 0.3
                      });
                    }}
                    onMouseLeave={() => {
                      gsap.to(`#skill-${index}`, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3
                      });
                    }}
                  >
                    <skill.icon 
                      id={`skill-${index}`}
                      size={32} 
                      className={`mx-auto mb-2 ${skill.color}`}
                      weight="light"
                    />
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;