'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger, scaleIn } from '@/lib/animations';

const subjects = [
  {
    name: 'Mathematics',
    slug: 'maths',
    teachers: 18,
    color: '#4915b0',
    bg: '#EDE9F9',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 5v22M5 16h22M8 8l16 16M24 8L8 24" />
      </svg>
    ),
  },
  {
    name: 'Science',
    slug: 'science',
    teachers: 14,
    color: '#D97706',
    bg: '#FEF3C7',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4h8v9l5 9.5a1 1 0 01-.87 1.5H7.87A1 1 0 017 22.5L12 13V4z" />
        <path d="M8 19h16" />
      </svg>
    ),
  },
  {
    name: 'English',
    slug: 'english',
    teachers: 22,
    color: '#DB2777',
    bg: '#FCE7F3',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8v18m0-18C14 7 11.5 6.5 9 7S5 8 4 9v16c1-.9 3.3-1.5 5-1.5S13 24 16 26m0-18c2-1 4.5-1.5 7-1S26.5 8 28 9v16c-1.5-1-4-1.5-5-1.5S19 24 16 26" />
      </svg>
    ),
  },
  {
    name: 'Arabic',
    slug: 'arabic',
    teachers: 11,
    color: '#0369A1',
    bg: '#E0F2FE',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="24" height="20" rx="3" />
        <path d="M9 12h7M9 16h5M9 20h10" />
      </svg>
    ),
  },
  {
    name: 'Coding',
    slug: 'coding',
    teachers: 9,
    color: '#059669',
    bg: '#D1FAE5',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 10l-6 6 6 6M22 10l6 6-6 6M18 6l-4 20" />
      </svg>
    ),
  },
  {
    name: 'Commerce',
    slug: 'commerce',
    teachers: 7,
    color: '#EA580C',
    bg: '#FFEDD5',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 26V17M9 26V10M13 26V18M17 26V6M21 26v-9M25 26V14" />
      </svg>
    ),
  },
];

export default function PopularSubjects() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-8 sm:mb-10 md:mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
          >
            Popular Subjects
          </motion.span>
          <motion.h2 
            variants={fadeUp} 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 px-2 sm:px-0"
          >
            Learn What You{' '}
            <span className="relative inline-block">
              Love
              <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 60 8" preserveAspectRatio="none">
                <path d="M0,4 C15,0 45,8 60,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base mt-3 sm:mt-4 px-2 sm:px-0"
          >
            Expert tutors across all core subjects, ready to help your child excel.
          </motion.p>
        </motion.div>

        {/* Subject cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {subjects.map((subject) => (
            <motion.div key={subject.name} variants={scaleIn}>
              <Link
                href={`/subjects?s=${subject.slug}`}
                className="group block bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Vivid colored frame */}
                <div
                  className="h-24 sm:h-28 md:h-32 flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: subject.color }}
                >
                  <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/20 text-white transition-transform duration-300 group-hover:scale-110">
                    {subject.icon}
                  </div>
                </div>

                {/* Text */}
                <div className="px-2 sm:px-3 pb-3 sm:pb-4 pt-2 sm:pt-3 text-center">
                  <p className="font-bold text-gray-900 text-xs sm:text-sm">{subject.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: subject.color }} />
                    <p className="text-[10px] sm:text-xs text-gray-400">{subject.teachers} teachers</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10"
        >
          <Link
            href="/subjects"
            className="inline-flex items-center gap-2 border border-[#4915b0] text-[#4915b0] font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-[#4915b0] hover:text-white transition-all duration-300 text-xs sm:text-sm"
          >
            View All Subjects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}