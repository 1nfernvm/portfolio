import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowSquareOut, GitBranch } from 'phosphor-react';

// Import project images
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'Neural Web Platform',
      description: 'AI-powered web application with glassmorphic design and real-time data visualization.',
      image: project1,
      tech: ['React', 'GSAP', 'Three.js', 'WebGL'],
      featured: true
    },
    {
      id: 2,
      title: 'Quantum Commerce',
      description: 'Next-gen e-commerce platform with immersive shopping experiences.',
      image: project2,
      tech: ['Next.js', 'Stripe', 'Framer Motion'],
      featured: false
    },
    {
      id: 3,
      title: 'DataViz Dashboard',
      description: 'Interactive data visualization with real-time analytics and 3D charts.',
      image: project3,
      tech: ['D3.js', 'WebGL', 'Node.js'],
      featured: false
    },
    {
      id: 4,
      title: 'Cyber Social',
      description: 'Futuristic social platform with AI-powered content curation.',
      image: project4,
      tech: ['React', 'Socket.io', 'AI/ML'],
      featured: false
    },
    {
      id: 5,
      title: 'CryptoFlow',
      description: 'Advanced cryptocurrency trading platform with real-time market data.',
      image: project5,
      tech: ['Vue.js', 'WebSockets', 'Charts.js'],
      featured: true
    },
    {
      id: 6,
      title: 'GameVerse',
      description: 'Gaming platform with holographic interfaces and social features.',
      image: project6,
      tech: ['Unity WebGL', 'React', 'WebRTC'],
      featured: false
    }
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
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.children || [];
      gsap.fromTo(cards,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number, isHovering: boolean) => {
    const card = cardsRef.current?.children[index];
    if (!card) return;

    gsap.to(card, {
      y: isHovering ? -10 : 0,
      scale: isHovering ? 1.02 : 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-8 lg:px-16 bg-background"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-8 text-gradient">
          Featured Projects
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-20 max-w-3xl mx-auto">
          A showcase of cutting-edge web applications built with modern technologies 
          and immersive user experiences.
        </p>

        {/* Bento Grid Layout */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`
                glass-card rounded-2xl p-6 group cursor-pointer
                ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}
              `}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Actions */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="glass p-2">
                    <ArrowSquareOut size={16} />
                  </Button>
                  <Button size="sm" variant="secondary" className="glass p-2">
                    <GitBranch size={16} />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-muted/50 text-muted-foreground rounded-full border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  variant="outline" 
                  className="w-full mt-4 glass-card border-primary/30 hover:border-primary/60 hover:shadow-neon transition-all duration-300"
                >
                  <span>View Project</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;