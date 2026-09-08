import { config } from '../../data/config';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold tracking-tight mb-2 text-foreground">{config.name.toUpperCase()}</h3>
          <p className="text-xs text-muted max-w-sm mb-4">
            {config.role}
          </p>
          <p className="text-xs text-muted/60">
            © {currentYear} {config.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex space-x-5">
            <a 
              href={config.socials.github} 
              target="_blank" 
              rel="noreferrer" 
              data-interactive="true"
              className="text-muted hover:text-foreground transition-colors p-1"
            >
              <span className="sr-only">GitHub</span>
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={config.socials.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              data-interactive="true"
              className="text-muted hover:text-foreground transition-colors p-1"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href={`mailto:${config.email}`} 
              data-interactive="true"
              className="text-muted hover:text-foreground transition-colors p-1"
            >
              <span className="sr-only">Email</span>
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-muted/60">
            Built with React · Designed with intention
          </p>
        </div>
      </div>
    </footer>
  );
}
