'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger, scaleIn } from '@/lib/animations';

// ── Decorative accents (same as HomeServices / TeacherHighlights) ─────────

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

// ── Step data ─────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    title: 'Choose Your Subject',
    desc: 'Browse our library of subjects — from Maths and Science to Coding and Arabic. Pick what your child needs most.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4v14m0-14C13.333 3.333 10 3 7 4v14c3 -1 6.333 -.667 9 0m0-14c2.667-.667 6-.333 9 0v14c-3-.667-6.333-1-9 0" />
        <path d="M4 24l6-2 6 2 6-2 6 2" />
      </svg>
    ),
    frameColor: '#4915b0',
    tiltClass: 'rotate-1',
  },
  {
    number: '02',
    title: 'Find Your Teacher',
    desc: 'Filter tutors by rating, language, price, and availability. Read reviews from real parents before deciding.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="13" r="8" />
        <path d="M22 22l6 6" />
      </svg>
    ),
    frameColor: '#D97706',
    tiltClass: '-rotate-1',
  },
  {
    number: '03',
    title: 'Book a Free Demo',
    desc: 'Experience a full live class for free. No commitment — just see if the teacher is the right fit for your child.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="24" height="22" rx="3" />
        <path d="M4 12h24M10 4v4M22 4v4" />
        <path d="M10 18h4M10 23h8" />
      </svg>
    ),
    frameColor: '#DB2777',
    tiltClass: 'rotate-2',
  },
  {
    number: '04',
    title: 'Start Learning',
    desc: 'Pick a schedule that works for you and begin regular classes. Track progress, homework, and payments in one place.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 24l6-6 5 5 7-9 6 4" />
        <circle cx="27" cy="7" r="3" />
      </svg>
    ),
    frameColor: '#059669',
    tiltClass: '-rotate-2',
  },
];

// ── Section ───────────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
          >
            How It Works
          </motion.span>
          <motion.h2 
            variants={fadeUp} 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-2 sm:px-0"
          >
            Start Learning in{' '}
            <span className="relative inline-block text-[#4915b0]">
              4 Steps
              <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 80 8" preserveAspectRatio="none">
                <path d="M0,4 C20,0 60,8 80,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base px-2 sm:px-0"
          >
            From sign-up to your first lesson — we make it simple, fast, and risk-free.
          </motion.p>
        </motion.div>

        {/* Step cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {steps.map((step, i) => (
            <motion.div key={step.number} variants={scaleIn} className="relative">

              {/* ── Decorative icons outside cards ── */}
              {i === 0 && (
                <div className="absolute -top-5 sm:-top-7 -right-2 sm:-right-3 z-10">
                  <Asterisk color="#F59E0B" size={22} />
                </div>
              )}
              {i === 1 && (
                <div className="absolute -top-5 sm:-top-7 left-1/2 -translate-x-1/2 z-10">
                  <StarOutline color="#7C3AED" size={18} />
                </div>
              )}
              {i === 2 && (
                <div className="absolute -top-4 sm:-top-5 -left-3 sm:-left-4 z-10 hidden sm:block">
                  <Wave color="#22C55E" />
                </div>
              )}
              {i === 3 && (
                <div className="absolute -top-5 sm:-top-6 right-1 sm:right-2 z-10">
                  <Asterisk color="#DB2777" size={18} />
                </div>
              )}

              {/* Connector arrow (desktop only, not on last card) */}
              {i < 3 && (
                <div className="hidden lg:flex absolute top-[30px] left-[calc(100%+4px)] w-8 items-center justify-center z-10 pointer-events-none">
                  <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                    <path d="M0 8h20M14 2l6 6-6 6" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* ── Colored frame + white inner panel ── */}
              <div
                className={`rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 group ${step.tiltClass}`}
                style={{ backgroundColor: step.frameColor }}
              >
                {/* Colored top — icon + step number */}
                <div className="pt-4 sm:pt-5 md:pt-6 px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className="flex items-start justify-between">
                    {/* Icon box */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/20 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    {/* Large muted step number */}
                    <span className="text-4xl sm:text-5xl font-black text-white/20 leading-none select-none -mt-1">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* White inner panel — title + desc */}
                <div className="bg-white mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-5 py-4 sm:py-5">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1.5 sm:mb-2 leading-snug">{step.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12 md:mt-14"
        >
          <a
            href="/demo"
            className="inline-flex items-center gap-2 sm:gap-3 bg-[#4915b0] text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full hover:bg-[#3a0f95] transition-colors duration-200 text-sm sm:text-base shadow-lg shadow-violet-200"
          >
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 rounded-full">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-[14px] sm:h-[14px]">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H5.5M10.5 3.5V8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Book My Free Demo
          </a>
        </motion.div>

      </div>
    </section>
  );
}