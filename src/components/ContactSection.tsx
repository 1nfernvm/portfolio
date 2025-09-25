import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GithubLogo, LinkedinLogo, TwitterLogo, PaperPlaneTilt } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Form inputs slide from left
      const inputs = formRef.current?.querySelectorAll('input, textarea, button') || [];
      gsap.fromTo(inputs,
        {
          x: -50,
          opacity: 0,
          filter: 'blur(5px)'
        },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Social icons glow on scroll
      const socialIcons = socialsRef.current?.children || [];
      gsap.fromTo(socialIcons,
        {
          scale: 0.8,
          opacity: 0,
          filter: 'blur(5px)'
        },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: socialsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Animate submit button
    const submitBtn = formRef.current?.querySelector('button[type="submit"]');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  const handleSocialHover = (index: number, isHovering: boolean) => {
    const icon = socialsRef.current?.children[index];
    if (!icon) return;

    gsap.to(icon, {
      scale: isHovering ? 1.1 : 1,
      rotate: isHovering ? 5 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-8 lg:px-16 bg-background relative"
      id="contact"
    >
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-accent rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-secondary rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-primary rounded-full animate-float opacity-30" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-8 text-gradient">
          Let's Connect
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-20 max-w-2xl mx-auto">
          Ready to bring your ideas to life? Let's discuss your next project 
          and create something extraordinary together.
        </p>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 glow-text">Send a Message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  className="glass bg-muted/20 border-border/30 focus:border-primary/60 focus:shadow-neon transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="glass bg-muted/20 border-border/30 focus:border-primary/60 focus:shadow-neon transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  className="glass bg-muted/20 border-border/30 focus:border-primary/60 focus:shadow-neon transition-all duration-300 resize-none"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full glass-card border-primary/30 hover:border-primary/60 hover:shadow-glow transition-all duration-300 py-3"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <PaperPlaneTilt size={20} />
                    <span className="glow-text">Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 glow-text">Get in Touch</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  📧 <span className="text-foreground">ritik.dev@email.com</span>
                </p>
                <p className="text-muted-foreground">
                  📱 <span className="text-foreground">+1 (555) 123-4567</span>
                </p>
                <p className="text-muted-foreground">
                  📍 <span className="text-foreground">San Francisco, CA</span>
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 glow-text">Follow Me</h3>
              <div ref={socialsRef} className="flex gap-4">
                <div
                  className="glass p-4 rounded-xl cursor-pointer group hover:shadow-neon transition-all duration-300"
                  onMouseEnter={() => handleSocialHover(0, true)}
                  onMouseLeave={() => handleSocialHover(0, false)}
                >
                  <GithubLogo size={24} className="text-foreground group-hover:text-primary transition-colors" />
                </div>
                <div
                  className="glass p-4 rounded-xl cursor-pointer group hover:shadow-neon transition-all duration-300"
                  onMouseEnter={() => handleSocialHover(1, true)}
                  onMouseLeave={() => handleSocialHover(1, false)}
                >
                  <LinkedinLogo size={24} className="text-foreground group-hover:text-primary transition-colors" />
                </div>
                <div
                  className="glass p-4 rounded-xl cursor-pointer group hover:shadow-neon transition-all duration-300"
                  onMouseEnter={() => handleSocialHover(2, true)}
                  onMouseLeave={() => handleSocialHover(2, false)}
                >
                  <TwitterLogo size={24} className="text-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;