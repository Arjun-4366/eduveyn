'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger, scaleIn } from '@/lib/animations';

// ── Decorative accents (same as HowItWorks / TeacherHighlights) ───────────

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

// ── Study option data ──────────────────────────────────────────────────

const options = [
  {
    tag: 'Most Popular',
    title: 'One-on-One Tutoring',
    desc: 'A dedicated tutor, fully focused on your child, adapting every lesson to their pace.',
    price: 'From AED 60/hr',
    features: ['1:1 dedicated tutor', 'Fully custom pace', 'Flexible timing'],
    frameColor: '#4915b0',
    tiltClass: 'rotate-1',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="10" r="5" />
        <path d="M6 27c0-5.5 4.5-9 10-9s10 3.5 10 9" />
      </svg>
    ),
  },
  {
    tag: 'Peer Learning',
    title: 'Small Group Classes',
    desc: 'Learn alongside 3–5 peers at a similar level — collaborative, social, and cost-effective.',
    price: 'From AED 35/hr',
    features: ['Groups of 3–5', 'Peer discussion', 'Weekly fixed slot'],
    frameColor: '#D97706',
    tiltClass: '-rotate-1',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="10" r="4" />
        <circle cx="22" cy="10" r="4" />
        <path d="M4 27c0-4.5 3.3-7.5 7-7.5S18 22.5 18 27M15 27c0-4.5 3.3-7.5 7-7.5S29 22.5 29 27" />
      </svg>
    ),
  },
  {
    tag: 'Exam Focused',
    title: 'Exam Prep Bootcamp',
    desc: 'Intensive short-term sessions targeting a specific exam, with mock tests and rapid feedback.',
    price: 'From AED 800/course',
    features: ['Mock exams included', 'Targeted weak-areas', 'Fast results'],
    frameColor: '#DB2777',
    tiltClass: 'rotate-2',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="20" height="24" rx="2.5" />
        <path d="M11 12h10M11 17h10M11 22h6" />
      </svg>
    ),
  },
  {
    tag: 'Self-Paced',
    title: 'Recorded Course Library',
    desc: 'Pre-recorded lessons your child can watch anytime, with quizzes to check understanding.',
    price: 'From AED 20/mo',
    features: ['Watch anytime', 'Built-in quizzes', 'Lifetime access'],
    frameColor: '#059669',
    tiltClass: '-rotate-2',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M13 11l8 5-8 5z" fill="white" stroke="none" />
      </svg>
    ),
  },
];

// ── Section ─────────────────────────────────────────────────────────────

export default function StudyOptions() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
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
            Study Options
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 px-2 sm:px-0"
          >
            A Learning Style for{' '}
            <span className="relative inline-block">
              Every Child
              <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 150 8" preserveAspectRatio="none">
                <path d="M0,4 C38,0 112,8 150,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base mt-3 sm:mt-4 px-2 sm:px-0"
          >
            Whether your child thrives one-on-one, in a group, or at their own pace — pick the format that fits.
          </motion.p>
        </motion.div>

        {/* Option cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {options.map((option, i) => (
            <motion.div key={option.title} variants={scaleIn} className="relative">

              {/* Decorative icons outside cards */}
              {i === 0 && (
                <div className="absolute -top-5 sm:-top-6 -right-2 sm:-right-3 z-10">
                  <Asterisk color="#F59E0B" size={22} />
                </div>
              )}
              {i === 2 && (
                <div className="absolute -top-5 sm:-top-6 -left-2 sm:-left-3 z-10 hidden sm:block">
                  <StarOutline color="#7C3AED" size={18} />
                </div>
              )}

              {/* Colored frame + white inner panel */}
              <div
                className={`rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 group ${option.tiltClass}`}
                style={{ backgroundColor: option.frameColor }}
              >
                <div className="pt-4 sm:pt-5 md:pt-6 px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className="flex items-start justify-between mb-4 sm:mb-5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/20 group-hover:scale-110 transition-transform duration-300">
                      {option.icon}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-white bg-white/20 backdrop-blur-sm px-2 sm:px-2.5 py-1 rounded-full">
                      {option.tag}
                    </span>
                  </div>
                  <p className="text-white/80 text-[10px] sm:text-xs font-semibold">{option.price}</p>
                </div>

                <div className="bg-white mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-5 py-4 sm:py-5">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1.5 sm:mb-2 leading-snug">{option.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{option.desc}</p>

                  <div className="flex flex-col gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                    {option.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5 3.5-4" stroke="#4915b0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-[11px] sm:text-xs text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/demo"
                    className="block text-center text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm hover:opacity-90 transition-opacity duration-200"
                    style={{ backgroundColor: option.frameColor }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
