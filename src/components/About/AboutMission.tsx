'use client';

import { motion } from 'framer-motion';
import { slideLeft, slideRight } from '@/lib/animations';

const values = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="10" r="5" /><path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" />
      </svg>
    ),
    title: 'Personalized',
    desc: "Every lesson is tailored to the student's exact level, pace, and learning style.",
    frameColor: '#4915b0',
    tiltClass: 'rotate-1',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 16l7 7 13-13" />
      </svg>
    ),
    title: 'Quality',
    desc: 'All tutors are manually vetted, interviewed, and test-taught before joining.',
    frameColor: '#059669',
    tiltClass: '-rotate-1',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" /><path d="M16 4v12l6 4" />
      </svg>
    ),
    title: 'Accessible',
    desc: 'Online, multilingual, and available 7 days a week — wherever you are.',
    frameColor: '#0369A1',
    tiltClass: 'rotate-2',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 24l6-6 5 5 7-9 6 4" /><circle cx="27" cy="7" r="3" />
      </svg>
    ),
    title: 'Results-Driven',
    desc: 'We track progress, set milestones, and celebrate every achievement.',
    frameColor: '#D97706',
    tiltClass: '-rotate-2',
  },
];

export default function AboutMission() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
        
        {/* Left column - Mission text */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center lg:text-left"
        >
          <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500">
            Our Mission
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-5 leading-tight px-2 sm:px-0">
            Bridging{' '}
            <span className="relative inline-block">
              potential
              <svg className="absolute left-0 w-full -bottom-1 sm:-bottom-1.5" height="7" viewBox="0 0 100 7" preserveAspectRatio="none">
                <path d="M0,3.5 C25,0 75,7 100,3.5" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            {' '}and performance
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 px-2 sm:px-0">
            Too many students fall behind not because they lack ability, but because they lack the right support at the right time. We match each student with a tutor who understands their unique learning style, pace, and goals.
          </p>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Whether your child needs help catching up, staying on track, or racing ahead — Eduweyn has a teacher ready to guide them.
          </p>
        </motion.div>

        {/* Right column - Value cards */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
        >
          {values.map((v) => (
            <div
              key={v.title}
              className={`rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:rotate-0 ${v.tiltClass}`}
              style={{ backgroundColor: v.frameColor }}
            >
              <div className="pt-4 sm:pt-5 px-4 sm:px-5 pb-3 sm:pb-4 flex justify-center">
                <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center">
                  {v.icon}
                </div>
              </div>
              <div className="bg-white mx-2 sm:mx-2.5 mb-2 sm:mb-2.5 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] px-3 sm:px-4 py-3 sm:py-4">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{v.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}