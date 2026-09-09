import { useState } from 'react';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Github, Linkedin } from '../components/ui/Icons';
import { config } from '../data/config';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear individual field error on change
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Reset success/error banner on user input
    if (status === 'success' || status === 'error') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const endpoint =
        config.formEndpoint || `https://formsubmit.co/ajax/${encodeURIComponent(config.email)}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: `Portfolio Contact from ${formData.name.trim()}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage("Thanks — your message has been sent. I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Something went wrong. Please try again or email me directly.');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Supporting Text & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-muted tracking-[0.2em] uppercase mb-4">
                07 / CONTACT
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 leading-[1.08] text-foreground">
                Have an idea<br />
                worth building?
              </h2>
              <p className="text-base md:text-lg text-muted mb-10 font-normal">
                Let's build something useful.
              </p>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href={`mailto:${config.email}`}
                data-interactive="true"
                className="inline-flex items-center justify-center h-11 px-5 text-sm font-medium bg-foreground text-background hover:bg-white transition-all rounded-[5px] select-none cursor-pointer"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Me
              </a>
              <a
                href={config.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive="true"
                className="inline-flex items-center justify-center h-11 px-5 text-sm font-medium border border-white/15 bg-transparent hover:bg-white/5 hover:border-white/30 text-foreground transition-all rounded-[5px] select-none cursor-pointer"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
              <a
                href={config.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive="true"
                className="inline-flex items-center justify-center h-11 px-5 text-sm font-medium border border-white/15 bg-transparent hover:bg-white/5 hover:border-white/30 text-foreground transition-all rounded-[5px] select-none cursor-pointer"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/10 p-6 sm:p-8 md:p-10 rounded-xl relative">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              
              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-muted/90 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  data-interactive="true"
                  className={`w-full bg-[#05070d]/60 border ${
                    errors.name ? 'border-rose-500/70 focus:border-rose-400' : 'border-white/10 focus:border-white/40'
                  } rounded-[5px] px-4 py-3 text-sm text-foreground placeholder:text-muted/40 outline-none transition-colors`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-muted/90 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  data-interactive="true"
                  className={`w-full bg-[#05070d]/60 border ${
                    errors.email ? 'border-rose-500/70 focus:border-rose-400' : 'border-white/10 focus:border-white/40'
                  } rounded-[5px] px-4 py-3 text-sm text-foreground placeholder:text-muted/40 outline-none transition-colors`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-muted/90 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  data-interactive="true"
                  className={`w-full bg-[#05070d]/60 border ${
                    errors.message ? 'border-rose-500/70 focus:border-rose-400' : 'border-white/10 focus:border-white/40'
                  } rounded-[5px] px-4 py-3 text-sm text-foreground placeholder:text-muted/40 outline-none transition-colors resize-none`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status Notifications */}
              {status === 'success' && statusMessage && (
                <div
                  role="status"
                  className="p-3.5 rounded-[5px] bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs flex items-start space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === 'error' && statusMessage && (
                <div
                  role="alert"
                  className="p-3.5 rounded-[5px] bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs flex items-start space-x-2"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-rose-400" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                data-interactive="true"
                className="w-full h-11 inline-flex items-center justify-center text-sm font-medium bg-foreground text-background hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-[5px] select-none cursor-pointer"
              >
                {status === 'submitting' ? (
                  <span className="inline-flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </span>
                ) : status === 'success' ? (
                  'Message Sent ✓'
                ) : (
                  'Send Message  →'
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
