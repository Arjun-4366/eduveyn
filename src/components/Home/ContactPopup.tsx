'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createContactMessage } from '@/services/contact';

type ContactErrors = { name?: string; email?: string; message?: string };

const SESSION_KEY = 'eduveyn_contact_popup_dismissed';

export default function ContactPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  // ── Show after 5 s (only once per session) ────────────────────────────────
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // ── Lock / unlock body scroll (Lenis + native fallback) ──────────────────
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new Event('lenis:stop'));
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new Event('lenis:start'));
    }
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new Event('lenis:start'));
    };
  }, [open]);

  const close = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setOpen(false);
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (): ContactErrors => {
    const next: ContactErrors = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Please enter a valid email';
    if (!form.message.trim()) next.message = 'Please enter a message';
    return next;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
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
      setSubmitError(
        err instanceof Error ? err.message : 'Failed to send message. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* ── Modal ── */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Contact us"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 40 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md pointer-events-auto rounded-[30px] overflow-hidden shadow-2xl border-[4px] border-[#7C3AED]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Close button ── */}
              <button
                onClick={close}
                aria-label="Close contact popup"
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* ── Purple header strip ── */}
              <div className="bg-[#4915b0] px-6 sm:px-8 py-5 sm:py-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xl">👋</span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">
                    Let&apos;s Get in Touch
                  </h2>
                </div>
                <p className="text-violet-200 text-xs sm:text-sm">
                  Have a question? We&apos;d love to help — send us a message!
                </p>
              </div>

              {/* ── White form body ── */}
              <div className="bg-white px-5 sm:px-7 py-6 sm:py-7">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-green-100">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                          d="M6 14l5 5 11-11"
                          stroke="#059669"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm">
                      We&apos;ll get back to you within a few hours.
                    </p>
                    <button
                      onClick={close}
                      className="mt-5 text-sm text-[#4915b0] font-semibold hover:underline"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Your Name *
                      </label>
                      <input
                        id="popup-contact-name"
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Email Address *
                      </label>
                      <input
                        id="popup-contact-email"
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Message *
                      </label>
                      <textarea
                        id="popup-contact-message"
                        rows={3}
                        placeholder="How can we help you? Tell us about your child's needs..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400 resize-none"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                      )}
                    </div>

                    {submitError && (
                      <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                        {submitError}
                      </p>
                    )}

                    <button
                      id="popup-contact-submit"
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#4915b0] text-white font-bold py-3.5 rounded-xl hover:bg-[#3a0f95] transition-colors text-sm shadow-lg shadow-violet-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending…' : 'Send Message →'}
                    </button>

                    <button
                      type="button"
                      onClick={close}
                      className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
                    >
                      No thanks, maybe later
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
