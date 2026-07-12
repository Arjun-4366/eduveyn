'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, springIn } from '@/lib/animations';
import { createContactMessage } from '@/services/contact';

// ── Decorators ─────────────────────────────────────────────────────────────

const Asterisk = ({ color = '#F59E0B', size = 30 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <line x1="16" y1="2" x2="16" y2="30" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="2" y1="16" x2="30" y2="16" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="5" y1="5" x2="27" y2="27" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="27" y1="5" x2="5" y2="27" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

const StarOutline = ({ color = '#7C3AED', size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <path d="M11 2l2.2 6.7H20l-5.6 4.1 2.1 6.7L11 15.4l-5.5 4.1 2.1-6.7L2 8.7h6.8z"
      stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const Wave = ({ color = '#22C55E' }: { color?: string }) => (
  <svg width="56" height="26" viewBox="0 0 60 28" fill="none" className="w-10 sm:w-12 md:w-[56px]">
    <path d="M0 14 C10 4 20 24 30 14 C40 4 50 24 60 14" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M0 21 C10 11 20 31 30 21 C40 11 50 31 60 21" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const Float = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 3.5 + delay, ease: 'easeInOut', delay }}
  >
    {children}
  </motion.div>
);

// ── Data ──────────────────────────────────────────────────────────────────

const contactMethods = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="white">
        <path d="M14 0C6.27 0 0 6.27 0 14c0 2.47.64 4.79 1.76 6.81L.07 27.6l6.87-1.67A13.94 13.94 0 0014 28c7.73 0 14-6.27 14-14S21.73 0 14 0zm7.07 19.64c-.3.85-1.75 1.62-2.39 1.66-.62.04-.64.47-4.01-.94-3.38-1.41-5.45-4.81-5.61-5.03-.16-.22-1.24-1.66-1.21-3.12.03-1.47.8-2.17 1.08-2.47.27-.29.59-.35.78-.35l.56.01c.19 0 .45-.07.7.54l.91 2.25c.25.62.11.81-.06 1.11l-.45.73c-.16.27-.33.56-.14.86.19.3.86 1.41 1.86 2.28 1.26 1.1 2.36 1.48 2.68 1.64.32.16.52.13.71-.08l.7-.83c.22-.28.43-.2.71-.1l2.2 1.02c.62.29 1 .46 1.13.72.13.25.13 1.45-.17 2.3z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+971 50 123 4567',
    desc: 'Chat directly with our team',
    href: 'https://wa.me/971501234567',
    frameColor: '#22C55E',
    tiltClass: 'rotate-2',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h20c1.1 0 2 .9 2 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M2 6l12 9 12-9" />
      </svg>
    ),
    label: 'Email',
    value: 'hello@tutehub.com',
    desc: 'We reply within a few hours',
    href: 'mailto:hello@tutehub.com',
    frameColor: '#4915b0',
    tiltClass: '-rotate-1',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2A19.8 19.8 0 014.06 8.18a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L10.09 13.5a16 16 0 006.43 6.43l1.08-1.08a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+971 4 000 0000',
    desc: 'Mon–Sat, 9am to 8pm',
    href: 'tel:+97140000000',
    frameColor: '#0369A1',
    tiltClass: 'rotate-1',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="white">
        <path d="M14 2.18C7.44 2.18 2.18 7.44 2.18 14S7.44 25.82 14 25.82 25.82 20.56 25.82 14 20.56 2.18 14 2.18zm6.5 6.35h-2.17c-.84 0-1 .4-1 .98v1.3h2.17l-.3 2.2H17.3v5.64h-2.27V12.96H13v-2.2h2.02v-1.5c0-2 1.22-3.08 3-3.08.85 0 1.58.06 1.79.09v2.06h-.3z" />
      </svg>
    ),
    label: 'Instagram',
    value: '@tutehub.official',
    desc: 'Follow us for updates',
    href: 'https://instagram.com/tutehub.official',
    frameColor: '#E1306C',
    tiltClass: '-rotate-2',
  },
];

type ContactErrors = { name?: string; email?: string; message?: string };

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const validate = (): ContactErrors => {
    const next: ContactErrors = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email';
    if (!form.message.trim()) next.message = 'Please enter a message';
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await createContactMessage(form);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden relative">
        <div className="absolute top-8 sm:top-10 left-4 sm:left-14 pointer-events-none">
          <Float><Asterisk color="#F59E0B" size={22} /></Float>
        </div>
        <div className="absolute top-10 sm:top-14 right-4 sm:right-20 pointer-events-none hidden sm:block">
          <Float delay={0.8}><StarOutline color="#7C3AED" size={18} /></Float>
        </div>
        <div className="absolute bottom-8 sm:bottom-10 right-4 sm:right-1/4 pointer-events-none hidden sm:block">
          <Float delay={1.2}><Wave color="#22C55E" /></Float>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span 
              variants={fadeUp} 
              className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
            >
              Get in Touch
            </motion.span>
            <motion.h1 
              variants={fadeUp} 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight px-2 sm:px-0"
            >
              We&apos;re Here to{' '}
              <span className="relative inline-block text-[#4915b0]">
                Help
                <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 60 8" preserveAspectRatio="none">
                  <path d="M0,4 C15,0 45,8 60,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>
            <motion.p 
              variants={fadeUp} 
              className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base px-2 sm:px-0"
            >
              Questions about classes, teachers, or getting started? Reach out and we&apos;ll get back to you fast.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact method cards ── */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 mb-12 sm:mb-14 md:mb-16"
          >
            {contactMethods.map((method) => (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={springIn}
                className={`rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 block ${method.tiltClass}`}
                style={{ backgroundColor: method.frameColor }}
              >
                {/* Colored top — large icon */}
                <div className="pt-5 sm:pt-6 md:pt-7 px-5 sm:px-6 pb-4 sm:pb-5 md:pb-6 flex justify-center">
                  <div className="w-14 h-14 sm:w-15 sm:h-15 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center">
                    {method.icon}
                  </div>
                </div>

                {/* White inner panel */}
                <div className="bg-white mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-5 py-4 sm:py-5">
                  <p className="font-extrabold text-gray-900 text-sm sm:text-base mb-0.5">{method.label}</p>
                  <p className="text-xs sm:text-sm font-semibold mb-1" style={{ color: method.frameColor }}>{method.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-2 sm:mb-3">{method.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold" style={{ color: method.frameColor }}>
                    Open →
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* ── Message form ── */}
          <div className="max-w-2xl mx-auto px-2 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-xl border-[4px] sm:border-[5px] border-[#7C3AED]"
            >
              {/* Purple top strip */}
              <div className="bg-[#4915b0] px-6 sm:px-8 py-5 sm:py-6 text-center">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">Send a Message</h2>
                <p className="text-violet-200 text-xs sm:text-sm mt-1">We typically respond within 2–4 hours</p>
              </div>

              {/* White form body */}
              <div className="bg-white px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#D1FAE5' }}>
                      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="sm:w-[28px] sm:h-[28px]">
                        <path d="M6 14l5 5 11-11" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm">We&apos;ll get back to you within a few hours.</p>
                    <button onClick={() => setSent(false)} className="mt-5 text-sm text-[#4915b0] font-semibold hover:underline">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Your Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Email Address *</label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Message *</label>
                      <textarea
                        rows={4}
                        placeholder="How can we help you? Tell us about your child's needs..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400 resize-none"
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    {submitError && (
                      <p className="text-red-500 text-xs sm:text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#4915b0] text-white font-bold py-3 sm:py-4 rounded-xl hover:bg-[#3a0f95] transition-colors text-sm shadow-lg shadow-violet-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending…' : 'Send Message →'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WhatsApp banner ── */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 bg-[#22C55E]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-white text-center sm:text-left">
            <p className="font-bold text-base sm:text-lg">Prefer to chat? We&apos;re on WhatsApp.</p>
            <p className="text-green-100 text-xs sm:text-sm">Quick answers, friendly team, no phone queues.</p>
          </div>
          <a
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white text-[#22C55E] font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full hover:bg-green-50 transition-colors text-xs sm:text-sm shadow-lg w-full sm:w-auto text-center"
          >
            Start WhatsApp Chat
          </a>
        </div>
      </section>

    </main>
  );
}