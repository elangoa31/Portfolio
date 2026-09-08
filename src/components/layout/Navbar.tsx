import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import { Link, useLocation } from 'react-router-dom';
import { config } from '../../data/config';
import { cn } from '../../utils/cn';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (!isHome) return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled ? 'py-4 bg-[#06080e]/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand */}
        <Link 
          to="/" 
          data-interactive="true"
          className="text-base md:text-lg font-bold tracking-tight text-foreground hover:text-white transition-colors"
        >
          {config.name.toUpperCase()}
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            isHome ? (
              <a
                key={link.name}
                href={link.href}
                data-interactive="true"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-xs lg:text-sm font-medium text-muted hover:text-foreground transition-colors tracking-wider uppercase"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={`/${link.href}`}
                data-interactive="true"
                className="text-xs lg:text-sm font-medium text-muted hover:text-foreground transition-colors tracking-wider uppercase"
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        {/* Desktop Right Actions: Baseline Alignment */}
        <div className="hidden md:flex items-center space-x-5">
          <a 
            href={config.socials.github} 
            target="_blank" 
            rel="noreferrer" 
            data-interactive="true"
            className="text-muted hover:text-foreground transition-colors p-1"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href={config.socials.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            data-interactive="true"
            className="text-muted hover:text-foreground transition-colors p-1"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${config.email}`}
            data-interactive="true"
            className="px-3.5 py-1.5 text-xs font-medium border border-white/15 hover:border-white/40 text-foreground hover:bg-white/5 transition-all rounded-none"
          >
            Resume
          </a>
          <div className="text-[11px] text-muted/70 flex items-center bg-white/[0.04] border border-white/10 px-2 py-1 rounded-none font-mono">
            <Terminal className="w-3 h-3 mr-1.5 opacity-60" /> Ctrl+K
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden text-foreground p-1.5 focus:outline-none"
          data-interactive="true"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-[#06080e]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl md:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                isHome ? (
                  <a
                    key={link.name}
                    href={link.href}
                    data-interactive="true"
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-base font-medium text-foreground py-1 tracking-wider uppercase"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={`/${link.href}`}
                    data-interactive="true"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-foreground py-1 tracking-wider uppercase"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <a href={config.socials.github} target="_blank" rel="noreferrer" data-interactive="true" className="text-muted p-1">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={config.socials.linkedin} target="_blank" rel="noreferrer" data-interactive="true" className="text-muted p-1">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <a 
                  href={`mailto:${config.email}`}
                  data-interactive="true"
                  className="px-4 py-2 text-xs font-medium border border-white/20 text-foreground"
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
