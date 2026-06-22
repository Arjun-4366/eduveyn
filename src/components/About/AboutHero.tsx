'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';

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

export default function AboutHero() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden relative">
      
      {/* Floating decorations - responsive positioning */}
      <div className="absolute top-8 sm:top-10 left-4 sm:left-14 pointer-events-none">
        <Float>
          <Asterisk color="#F59E0B" size={24} />
        </Float>
      </div>
      <div className="absolute top-12 sm:top-16 right-4 sm:right-16 pointer-events-none hidden sm:block">
        <Float delay={0.8}>
          <StarOutline color="#7C3AED" size={20} />
        </Float>
      </div>
      <div className="absolute bottom-8 sm:bottom-10 left-4 sm:left-1/4 pointer-events-none hidden sm:block">
        <Float delay={1.2}>
          <Wave color="#22C55E" />
        </Float>
      </div>
      <div className="absolute bottom-12 sm:bottom-16 right-4 sm:right-24 pointer-events-none">
        <Float delay={0.4}>
          <Asterisk color="#DB2777" size={16} />
        </Float>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.span 
            variants={fadeUp}
            className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 bg-white border border-gray-200 text-gray-500"
          >
            About Us
          </motion.span>
          
          <motion.h1
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight px-2 sm:px-0"
          >
            Every Child Deserves
            <span className="relative inline-block text-[#4915b0]">
              a Great Teacher
              <svg className="absolute left-0 w-full -bottom-1 sm:-bottom-2" height="8" viewBox="0 0 300 8" preserveAspectRatio="none">
                <path d="M0,4 C75,0 150,8 225,4 C262,2 282,3 300,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp} 
            className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0"
          >
            Eduweyn was built by educators and parents who were frustrated with one-size-fits-all tutoring. We set out to create something different — a platform where every student gets the individual attention they deserve.
          </motion.p>
          
          <motion.div 
            variants={fadeUp} 
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3 px-2 sm:px-0"
          >
            <Link 
              href="/demo" 
              className="bg-[#4915b0] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#3a0f95] transition-colors shadow-lg shadow-violet-200 text-xs sm:text-sm w-full sm:w-auto text-center"
            >
              Book a Free Demo
            </Link>
            <Link 
              href="/register/teacher" 
              className="border border-gray-300 bg-white text-gray-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:border-[#4915b0] hover:text-[#4915b0] transition-colors text-xs sm:text-sm w-full sm:w-auto text-center"
            >
              Become a Tutor
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}