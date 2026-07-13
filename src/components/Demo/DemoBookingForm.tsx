'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, springIn, slideLeft, slideRight } from '@/lib/animations';
import { IClass } from '@/types/classes/classes';
import { ISubject } from '@/types/subjects/subjects';
import { createDemoBooking } from '@/services/demoBooking';

// ── Decorators ─────────────────────────────────────────────────────────────

const Asterisk = ({ color = '#F59E0B', size = 30 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <line x1="16" y1="2" x2="16" y2="30" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="2" y1="16" x2="30" y2="16" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="5" y1="5" x2="27" y2="27" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="27" y1="5" x2="5" y2="27" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
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

const perks = [
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ), text: '100% Free — No credit card required' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5" stroke="#4915b0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  ), text: 'Flexible timings — book at your convenience' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3.33 2 8.67 2 12 0v-5" />
    </svg>
  ), text: 'Meet the teacher before committing' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5" stroke="#DB2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
    </svg>
  ), text: 'Join from any device — phone, tablet, or PC' },
];

type FormState = { student_name: string; class_id: string; subject_id: string; parent_phone: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

// ── Component ────────────────────────────────────────────────────────────

export default function DemoBookingForm({ classes, subjects }: { classes: IClass[]; subjects: ISubject[] }) {
  const [form, setForm] = useState<FormState>({ student_name: '', class_id: '', subject_id: '', parent_phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.student_name.trim()) next.student_name = 'Please enter the student\'s name';
    if (!form.class_id) next.class_id = 'Please select a grade / class';
    if (!form.subject_id) next.subject_id = 'Please select a subject';
    if (!form.parent_phone.trim()) next.parent_phone = 'Please enter a phone number';
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
      await createDemoBooking(form);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to book demo. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ student_name: '', class_id: '', subject_id: '', parent_phone: '' });
  };

  return (
    <main className="min-h-screen bg-[#F0F2F5] hero-grid-bg overflow-hidden relative">

      {/* Floating decor - responsive positioning */}
      <div className="absolute top-8 sm:top-10 left-4 sm:left-10 pointer-events-none">
        <Float><Asterisk color="#F59E0B" size={20} /></Float>
      </div>
      <div className="absolute top-16 sm:top-20 right-4 sm:right-14 pointer-events-none hidden sm:block">
        <Float delay={0.9}><Wave color="#22C55E" /></Float>
      </div>
      <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-1/3 pointer-events-none">
        <Float delay={1.5}><Asterisk color="#DB2777" size={16} /></Float>
      </div>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">

            {/* ── Left: Info frame ── */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              className="lg:sticky lg:top-24"
            >
              <div className="rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500"
                style={{ backgroundColor: '#4915b0' }}>
                {/* Colored top */}
                <div className="pt-6 sm:pt-8 px-6 sm:px-8 pb-4 sm:pb-6 text-center">
                  <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white/20 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-5">
                    Free Demo Class
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2 px-2 sm:px-0">
                    Try Before You{' '}
                    <span className="relative inline-block">
                      Commit
                      <svg className="absolute left-0 w-full -bottom-1" height="6" viewBox="0 0 80 6" preserveAspectRatio="none">
                        <path d="M0,3 C20,0 60,6 80,3" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
                      </svg>
                    </span>
                  </h1>
                  <p className="text-violet-200 text-xs sm:text-sm mt-2 sm:mt-3">
                    Book a free 45-minute class with a verified tutor.
                  </p>
                </div>

                {/* White inner panel */}
                <div className="bg-white mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-4 sm:px-6 py-5 sm:py-6">
                  <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-2 sm:gap-3 mb-5 sm:mb-6">
                    {perks.map((perk) => (
                      <motion.div key={perk.text} variants={fadeUp} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-xl sm:rounded-2xl">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                          {perk.icon}
                        </div>
                        <span className="text-gray-700 text-xs sm:text-sm font-medium">{perk.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Trust strip */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-[10px] sm:text-xs text-gray-400 mb-3 text-center">Trusted by parents across the region</p>
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="flex -space-x-2">
                        {[['S','#4915b0'], ['A','#D97706'], ['P','#DB2777'], ['R','#059669']].map(([initial, color]) => (
                          <div
                            key={initial}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shrink-0"
                            style={{ backgroundColor: color }}
                          >
                            {initial}
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(i => (
                            <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill="#F59E0B" className="sm:w-[12px] sm:h-[12px]">
                              <path d="M6 1l1.35 2.74L10.5 4.18l-2.25 2.19.53 3.09L6 7.95 3.22 9.46l.53-3.09L1.5 4.18l3.15-.44z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">500+ happy families</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate="visible"
            >
              <div className="rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-xl border-[4px] sm:border-[5px] border-[#F59E0B]">
                {/* Amber top strip */}
                <div className="px-6 sm:px-8 py-5 sm:py-6 text-center" style={{ backgroundColor: '#F59E0B' }}>
                  <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">Book Your Free Demo</h2>
                  <p className="text-amber-800 text-xs sm:text-sm mt-1">Takes less than 1 minute</p>
                </div>

                {/* White form */}
                <div className="bg-white px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 sm:py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] sm:rounded-[28px] flex items-center justify-center mx-auto mb-4 sm:mb-5"
                        style={{ backgroundColor: '#D1FAE5' }}
                      >
                        <svg width="28" height="28" viewBox="0 0 36 36" fill="none" className="sm:w-[36px] sm:h-[36px]">
                          <path d="M8 18l7 7 13-14" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">You&apos;re Booked!</h2>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                        We&apos;ll contact you on <span className="font-semibold text-gray-700">{form.parent_phone}</span> within 24 hours to confirm your free demo class.
                      </p>
                      <button
                        onClick={resetForm}
                        className="mt-5 sm:mt-6 text-sm text-[#4915b0] font-semibold hover:underline"
                      >
                        Book another demo
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form variants={stagger} initial="hidden" animate="visible" onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                      <motion.div variants={fadeUp}>
                        <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Student Name *</label>
                        <input
                          type="text"
                          placeholder="Enter student's full name"
                          value={form.student_name}
                          onChange={(e) => setForm({ ...form, student_name: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400"
                        />
                        {errors.student_name && <p className="text-red-500 text-xs mt-1">{errors.student_name}</p>}
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Grade / Class *</label>
                        <select
                          value={form.class_id}
                          onChange={(e) => setForm({ ...form, class_id: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all text-gray-700 bg-white"
                        >
                          <option value="">Select grade</option>
                          {classes?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        {errors.class_id && <p className="text-red-500 text-xs mt-1">{errors.class_id}</p>}
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Subject *</label>
                        <select
                          value={form.subject_id}
                          onChange={(e) => setForm({ ...form, subject_id: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all text-gray-700 bg-white"
                        >
                          <option value="">Select subject</option>
                          {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        {errors.subject_id && <p className="text-red-500 text-xs mt-1">{errors.subject_id}</p>}
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Parent Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="+971 50 000 0000"
                          value={form.parent_phone}
                          onChange={(e) => setForm({ ...form, parent_phone: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400"
                        />
                        {errors.parent_phone && <p className="text-red-500 text-xs mt-1">{errors.parent_phone}</p>}
                      </motion.div>

                      {submitError && (
                        <motion.p variants={fadeUp} className="text-red-500 text-xs sm:text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                          {submitError}
                        </motion.p>
                      )}

                      <motion.button
                        variants={springIn}
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#4915b0] text-white font-bold py-3 sm:py-4 rounded-xl hover:bg-[#3a0f95] transition-colors text-sm mt-1 sm:mt-2 shadow-lg shadow-violet-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? 'Booking…' : 'Book My Free Demo Class →'}
                      </motion.button>

                      <motion.p variants={fadeUp} className="text-center text-[10px] sm:text-xs text-gray-400">
                        By submitting, you agree to be contacted via WhatsApp or phone. No spam.
                      </motion.p>
                    </motion.form>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
