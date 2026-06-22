'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import heroLeft from '@/assets/images/heroleft.png';
import heroRight from '@/assets/images/heroright.png';
import { fadeUp, stagger, slideLeft, slideRight } from '@/lib/animations';

const PurpleCrown = () => (
  <svg width="52" height="48" viewBox="0 0 52 48" fill="none">
    <path d="M10 40 L10 26 L17 34 L24 14 L31 34 L38 26 L38 40 Q24 45 10 40 Z" fill="#4915b0" />
    <line x1="24" y1="8" x2="24" y2="3" stroke="#4915b0" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="37" y1="12" x2="41" y2="8" stroke="#4915b0" strokeWidth="2" strokeLinecap="round" />
    <line x1="11" y1="12" x2="7" y2="8" stroke="#4915b0" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" y1="26" x2="0" y2="26" stroke="#4915b0" strokeWidth="2" strokeLinecap="round" />
    <line x1="44" y1="26" x2="48" y2="26" stroke="#4915b0" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const OrangeAsterisk = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <line x1="19" y1="3" x2="19" y2="35" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="3" y1="19" x2="35" y2="19" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="7" y1="7" x2="31" y2="31" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="31" y1="7" x2="7" y2="31" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F7] hero-grid-bg">
      <div className="flex flex-col lg:flex-row items-stretch min-h-[580px] lg:min-h-[580px]">

        {/* Left student image - Hidden on mobile/tablet, visible on desktop */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate="visible"
          className="relative self-end shrink-0 w-full sm:w-[280px] h-[400px] sm:h-[450px] lg:h-[500px] mx-auto lg:mx-0 lg:ml-6 hidden lg:block"
        >
          <div className="absolute z-0 bg-amber-500 w-[190px] h-[240px] bottom-[50px] right-[-10px] rounded-[10px]" />
          <div className="absolute z-10 overflow-hidden w-[248px] h-[470px] rounded-r-[200px] bottom-0 left-0">
            <Image src={heroLeft} alt="Student with backpack" fill className="object-cover object-top" priority />
          </div>
          <div className="absolute z-20 bottom-[90px] left-[18px] text-[28px]">🍎</div>
          <div className="absolute z-20 top-12 -right-4">
            <OrangeAsterisk />
          </div>
        </motion.div>

        {/* Center content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-5 py-8 sm:py-12 z-10"
        >
          <motion.div variants={fadeUp}>
            <PurpleCrown />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-gray-900 mt-4 sm:mt-5 leading-tight text-3xl sm:text-4xl md:text-5xl max-w-2xl px-2 sm:px-0"
          >
            Personalized Online Tuition{' '}
            <span className="relative inline-block">
              for Every Student.
              <svg className="absolute left-0 w-full -bottom-2.5" height="10" viewBox="0 0 300 10" preserveAspectRatio="none">
                <path d="M0,5 C60,0 120,10 180,5 C220,2 260,4 300,5" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-sm sm:text-base leading-relaxed mt-6 sm:mt-8 max-w-md px-2 sm:px-0"
          >
            Expert tutors. Flexible schedules. Real results. Helping every child unlock their full potential — one lesson at a time.
          </motion.p>

          {/* Three CTA buttons */}
          <motion.div 
            variants={fadeUp} 
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 mt-7 sm:mt-9 w-full px-2 sm:px-0"
          >
            <Link
              href="/demo"
              className="flex items-center gap-2.5 bg-[#4915b0] text-white font-semibold px-5 sm:px-7 py-3 sm:py-3.5 rounded-full hover:bg-[#3a0f95] transition-colors shadow-lg shadow-violet-200 text-xs sm:text-sm w-full sm:w-auto justify-center"
            >
              <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-white/20 rounded-full">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H5M10 2v5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Book Free Demo
            </Link>

            <Link
              href="/teachers"
              className="flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold px-5 sm:px-7 py-3 sm:py-3.5 rounded-full hover:border-[#4915b0] hover:text-[#4915b0] transition-colors text-xs sm:text-sm bg-white w-full sm:w-auto justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Find Teachers
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-2 bg-[#F59E0B] text-gray-900 font-semibold px-5 sm:px-7 py-3 sm:py-3.5 rounded-full hover:bg-amber-400 transition-colors text-xs sm:text-sm w-full sm:w-auto justify-center"
            >
              Join Now
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div 
            variants={fadeUp} 
            className="flex flex-row items-center gap-3 sm:gap-6 mt-8 sm:mt-10 flex-wrap justify-center"
          >
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#10B981">
                <path d="M7 1l1.45 2.9 3.2.47-2.32 2.26.55 3.19L7 8.3 4.12 9.82l.55-3.19L2.35 4.37l3.2-.47z" />
              </svg>
              4.9/5 Rating
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4915b0" strokeWidth="1.5">
                <circle cx="7" cy="7" r="6" />
                <path d="M7 4v3.5l2 2" strokeLinecap="round" />
              </svg>
              First class free
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#F59E0B" strokeWidth="1.5">
                <path d="M7 1l1.35 2.74L11.5 4.18l-2.25 2.19.53 3.09L7 7.95 4.22 9.46l.53-3.09L2.5 4.18l3.15-.44z" />
              </svg>
              500+ Students
            </div>
          </motion.div>
        </motion.div>

        {/* Right student image - Hidden on mobile/tablet, visible on desktop */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate="visible"
          className="relative self-end shrink-0 w-full sm:w-[310px] h-[400px] sm:h-[450px] lg:h-[500px] mx-auto lg:mx-0 lg:mr-6 hidden lg:block"
        >
          <div className="absolute z-20 top-20 right-[50px] text-[32px]">💡</div>
          <div className="absolute rounded-full z-0 w-[270px] h-[270px] bg-violet-600 bottom-0 right-3" />
          <div className="absolute z-10 overflow-hidden w-[220px] h-[430px] [border-radius:130px_130px_110px_110px] bottom-0 right-9">
            <Image src={heroRight} alt="Student with notebook" fill className="object-cover object-top" priority />
          </div>
        </motion.div>

      </div>
    </section>
  );
}