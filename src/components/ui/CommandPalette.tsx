import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, Briefcase, FileCode, Clock, Mail, Code2, FileText } from 'lucide-react';
import { Github } from './Icons';
import { useNavigate } from 'react-router-dom';
import { config } from '../../data/config';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const commands = [
    { id: 'home', name: 'Go to Home', icon: Home, action: () => { navigate('/'); onClose(); } },
    { id: 'about', name: 'Go to About', icon: User, action: () => { scrollTo('about'); onClose(); } },
    { id: 'work', name: 'Go to Work', icon: Briefcase, action: () => { scrollTo('work'); onClose(); } },
    { id: 'engineering', name: 'Go to Engineering', icon: FileCode, action: () => { scrollTo('engineering'); onClose(); } },
    { id: 'journey', name: 'Go to Journey', icon: Clock, action: () => { scrollTo('journey'); onClose(); } },
    { id: 'contact', name: 'Go to Contact', icon: Mail, action: () => { scrollTo('contact'); onClose(); } },
    { id: 'github', name: 'Open GitHub', icon: Github, action: () => { window.open(config.socials.github, '_blank'); onClose(); } },
    { id: 'leetcode', name: 'Open LeetCode', icon: Code2, action: () => { window.open(config.socials.leetcode, '_blank'); onClose(); } },
    { id: 'resume', name: 'Open Resume', icon: FileText, action: () => { window.open('/resume.pdf', '_blank', 'noopener,noreferrer'); onClose(); } },
  ];

  const scrollTo = (id: string) => {
    navigate('/');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-background border border-border shadow-2xl overflow-hidden z-50 rounded-xl"
          >
            <div className="flex items-center px-4 py-3 border-b border-border">
              <Search className="w-5 h-5 text-muted mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted"
                onChange={() => {}} // Simple search can be implemented here
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              <div className="text-xs font-medium text-muted px-2 py-1.5 mb-1">Suggestions</div>
              {commands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-white/5 rounded-md transition-colors"
                >
                  <cmd.icon className="w-4 h-4 mr-3 text-muted" />
                  {cmd.name}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
