import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { config } from '../data/config';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '../components/ui/Icons';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const message = formData.get('message');
    
    setTimeout(() => {
      window.location.href = `mailto:${config.email}?subject=Contact from ${name}&body=${message}`;
      setStatus('submitted');
      setTimeout(() => setStatus('idle'), 3000);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <div className="lg:col-span-6">
            <p className="text-xs md:text-sm font-medium text-muted tracking-[0.2em] uppercase mb-4">
              07 / CONTACT
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 leading-[1.08]">
              Have an idea<br />
              worth building?
            </h2>
            <p className="text-lg md:text-xl text-muted mb-10 font-normal">
              Let's build something useful.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href={`mailto:${config.email}`}
                data-interactive="true"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-foreground text-background hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all rounded-none"
              >
                <Mail className="w-4 h-4 mr-2" /> Email Me
              </a>
              <a 
                href={config.socials.github} 
                target="_blank" 
                rel="noreferrer"
                data-interactive="true"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 text-foreground transition-all rounded-none"
              >
                <Github className="w-4 h-4 mr-2" /> GitHub
              </a>
              <a 
                href={config.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                data-interactive="true"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 text-foreground transition-all rounded-none"
              >
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full bg-[#06080e]/80 border border-white/10 rounded-none px-4 py-3 text-foreground focus:outline-none focus:border-white/40 transition-colors text-sm placeholder:text-muted/40"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full bg-[#06080e]/80 border border-white/10 rounded-none px-4 py-3 text-foreground focus:outline-none focus:border-white/40 transition-colors text-sm placeholder:text-muted/40"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-[#06080e]/80 border border-white/10 rounded-none px-4 py-3 text-foreground focus:outline-none focus:border-white/40 transition-colors resize-none text-sm placeholder:text-muted/40"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={status === 'submitting' || status === 'submitted'}
              >
                {status === 'submitting' ? 'Sending...' : status === 'submitted' ? 'Redirecting to Mail Client...' : 'Send Message'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
