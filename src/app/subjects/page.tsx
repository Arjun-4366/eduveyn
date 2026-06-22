'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { stagger, springIn, fadeUp } from '@/lib/animations';

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

const subjects = [
  {
    name: 'Mathematics',
    slug: 'maths',
    teachers: 18,
    desc: 'Algebra, Geometry, Calculus, Statistics, and more — for all grade levels.',
    frameColor: '#4915b0',
    tiltClass: 'rotate-1',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 5v22M5 16h22M8 8l16 16M24 8L8 24" />
      </svg>
    ),
  },
  {
    name: 'Science',
    slug: 'science',
    teachers: 14,
    desc: 'Physics, Chemistry, Biology — hands-on conceptual learning with real examples.',
    frameColor: '#D97706',
    tiltClass: '-rotate-1',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4h8v9l5 9.5a1 1 0 01-.87 1.5H7.87A1 1 0 017 22.5L12 13V4z" />
        <path d="M8 19h16" />
      </svg>
    ),
  },
  {
    name: 'English',
    slug: 'english',
    teachers: 22,
    desc: 'Grammar, comprehension, creative writing, and literature for all ages.',
    frameColor: '#DB2777',
    tiltClass: 'rotate-2',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8v18m0-18C14 7 11.5 6.5 9 7S5 8 4 9v16c1-.9 3.3-1.5 5-1.5S13 24 16 26m0-18c2-1 4.5-1.5 7-1S26.5 8 28 9v16c-1.5-1-4-1.5-5-1.5S19 24 16 26" />
      </svg>
    ),
  },
  {
    name: 'Arabic',
    slug: 'arabic',
    teachers: 11,
    desc: 'Modern Standard Arabic, Quranic Arabic, and conversational Arabic.',
    frameColor: '#0369A1',
    tiltClass: '-rotate-2',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="24" height="20" rx="3" />
        <path d="M9 12h7M9 16h5M9 20h10" />
      </svg>
    ),
  },
  {
    name: 'Coding',
    slug: 'coding',
    teachers: 9,
    desc: 'Python, Web Dev, Scratch for kids, and problem-solving skills.',
    frameColor: '#059669',
    tiltClass: 'rotate-1',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 10l-6 6 6 6M22 10l6 6-6 6M18 6l-4 20" />
      </svg>
    ),
  },
  {
    name: 'Commerce',
    slug: 'commerce',
    teachers: 7,
    desc: 'Accounts, Business Studies, Economics — perfect for Grade 11 & 12.',
    frameColor: '#EA580C',
    tiltClass: '-rotate-1',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 26V17M9 26V10M13 26V18M17 26V6M21 26v-9M25 26V14" />
      </svg>
    ),
  },
];

// ── Page ──────────────────────────────────────────────────────────────────

export default function SubjectsPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden relative">
        <div className="absolute top-6 sm:top-8 left-4 sm:left-16 pointer-events-none">
          <Float><Asterisk color="#F59E0B" size={22} /></Float>
        </div>
        <div className="absolute top-10 sm:top-12 right-4 sm:right-20 pointer-events-none hidden sm:block">
          <Float delay={0.6}><StarOutline color="#7C3AED" size={18} /></Float>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-1/3 pointer-events-none hidden sm:block">
          <Float delay={1.2}><Wave color="#22C55E" /></Float>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span 
              variants={fadeUp} 
              className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
            >
              Subjects
            </motion.span>
            <motion.h1 
              variants={fadeUp} 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-2 sm:px-0"
            >
              Explore Our{' '}
              <span className="relative inline-block text-[#4915b0]">
                Subjects
                <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0,4 C25,0 75,8 100,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>
            <motion.p 
              variants={fadeUp} 
              className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base mt-3 sm:mt-4 px-2 sm:px-0"
            >
              Choose a subject and connect with expert tutors who specialize in it.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Subject cards ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {subjects.map((subject, i) => (
              <motion.div key={subject.name} variants={springIn} className="relative">

                {/* Scattered decorative icons */}
                {i === 0 && <div className="absolute -top-5 sm:-top-6 -right-2 sm:-right-3 z-10"><Asterisk color="#F59E0B" size={20} /></div>}
                {i === 2 && <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 z-10"><StarOutline color="#7C3AED" size={16} /></div>}
                {i === 4 && <div className="absolute -top-4 sm:-top-5 -left-2 sm:-left-3 z-10 hidden sm:block"><Wave color="#22C55E" /></div>}

                <Link
                  href={`/teachers?subject=${subject.slug}`}
                  className={`block rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 group ${subject.tiltClass}`}
                  style={{ backgroundColor: subject.frameColor }}
                >
                  {/* Colored top — icon centered */}
                  <div className="pt-6 sm:pt-7 md:pt-8 px-5 sm:px-6 pb-4 sm:pb-5 md:pb-6 text-center">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      {subject.icon}
                    </div>
                  </div>

                  {/* White inner panel */}
                  <div className="bg-white mx-2.5 sm:mx-3 mb-2.5 sm:mb-3 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-6 py-4 sm:py-5">
                    <h2 className="font-extrabold text-gray-900 text-base sm:text-lg mb-0.5">{subject.name}</h2>
                    <p className="text-[10px] sm:text-xs font-semibold mb-2.5 sm:mb-3" style={{ color: subject.frameColor }}>
                      {subject.teachers} teachers available
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{subject.desc}</p>
                    <span
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold transition-colors duration-200"
                      style={{ color: subject.frameColor }}
                    >
                      View Teachers
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="sm:w-[14px] sm:h-[14px]">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CTA block ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 sm:mt-14 md:mt-16 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-xl"
            style={{ backgroundColor: '#4915b0' }}
          >
            <div className="pt-8 sm:pt-10 px-6 sm:px-8 pb-3 sm:pb-4 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-1 sm:mb-2">
                Don&apos;t see your subject?
              </h2>
            </div>
            <div className="bg-white mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-6 sm:px-8 py-5 sm:py-7 text-center">
              <p className="text-gray-500 mb-4 sm:mb-5 text-xs sm:text-sm max-w-sm mx-auto">
                We add new subjects regularly. Contact us and we&apos;ll match you with the right tutor.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#4915b0] text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-[#3a0f95] transition-colors text-xs sm:text-sm shadow-lg shadow-violet-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}