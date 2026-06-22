'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { stagger, scaleIn, fadeUp } from '@/lib/animations';

// ── Decorative accents (outside cards, same as HomeServices) ─────────────

const Asterisk = ({ color = '#F59E0B', size = 32 }: { color?: string; size?: number }) => (
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

// ── Teacher data ──────────────────────────────────────────────────────────

const teachers = [
  {
    name: 'Aisha Rahman',
    subject: 'Mathematics',
    experience: '7 years',
    languages: ['English', 'Arabic'],
    rating: 4.9,
    reviews: 143,
    tag: 'Top Rated',
    frameColor: '#7C3AED',
    tiltClass: 'rotate-2',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    name: 'James Okafor',
    subject: 'Science & Physics',
    experience: '5 years',
    languages: ['English'],
    rating: 4.8,
    reviews: 89,
    tag: 'Most Booked',
    frameColor: '#F59E0B',
    tiltClass: '-rotate-1',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    name: 'Sara Khalil',
    subject: 'English & Literature',
    experience: '9 years',
    languages: ['English', 'Arabic', 'French'],
    rating: 5.0,
    reviews: 211,
    tag: 'Best in English',
    frameColor: '#7C3AED',
    tiltClass: 'rotate-1',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300&q=80',
  },
];

export default function TeacherHighlights() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <motion.span variants={fadeUp}
            className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
          >
            Our Teachers
          </motion.span>
          <motion.h2 
            variants={fadeUp} 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 px-2 sm:px-0"
          >
            Learn from the{' '}
            <span className="relative inline-block">
              Best
              <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 50 8" preserveAspectRatio="none">
                <path d="M0,4 C12,0 38,8 50,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base mt-3 sm:mt-4 px-2 sm:px-0"
          >
            Handpicked, verified tutors with proven track records and genuine passion for teaching.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {teachers.map((t, i) => (
            <motion.div key={t.name} variants={scaleIn} className="relative">

              {/* ── Decorative icons outside the card ── */}
              {i === 0 && <>
                <div className="absolute -top-6 sm:-top-7 -right-2 sm:-right-3 z-10">
                  <Asterisk color="#F59E0B" size={24} />
                </div>
                <div className="absolute top-1/2 -left-5 sm:-left-7 z-10 hidden sm:block">
                  <Wave color="#22C55E" />
                </div>
              </>}
              {i === 1 && (
                <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-10">
                  <StarOutline color="#7C3AED" size={22} />
                </div>
              )}
              {i === 2 && <>
                <div className="absolute -top-5 sm:-top-6 left-2 sm:left-3 z-10">
                  <Asterisk color="#7C3AED" size={18} />
                </div>
                <div className="absolute bottom-1/3 -right-4 sm:-right-6 z-10 hidden sm:block">
                  <StarOutline color="#F59E0B" size={16} />
                </div>
              </>}

              {/* ── Single unified card — colored frame shell ── */}
              <div
                className={`rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 group ${t.tiltClass}`}
                style={{ backgroundColor: t.frameColor }}
              >
                {/* Colored top — small photo centered here */}
                <div className="pt-4 sm:pt-5 md:pt-6 px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-center">

                  {/* Tag + experience row */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="text-[10px] sm:text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      {t.tag}
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/80 font-medium">{t.experience} exp.</span>
                  </div>

                  {/* Small teacher photo — centered, with white ring frame */}
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="p-0.5 sm:p-1 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] bg-white/30">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] overflow-hidden">
                        <Image
                          src={t.photo}
                          alt={t.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center justify-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="12" height="12" viewBox="0 0 11 11" className="sm:w-[14px] sm:h-[14px]"
                        fill={s <= Math.floor(t.rating) ? '#FCD34D' : 'rgba(255,255,255,0.35)'}>
                        <path d="M5.5 1l1.1 3.4H10L7.3 6.5l1 3.2L5.5 7.9 2.7 9.7l1-3.2L1 4.4h3.4z" />
                      </svg>
                    ))}
                    <span className="text-[10px] sm:text-xs text-white font-semibold ml-1">{t.rating}</span>
                    <span className="text-[10px] sm:text-xs text-white/60 ml-1">· {t.reviews}</span>
                  </div>
                </div>

                {/* ── White inner panel — content inside the frame ── */}
                <div className="bg-white mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-4 sm:px-5 py-4 sm:py-5">

                  {/* Name + subject */}
                  <h3 className="font-extrabold text-gray-900 text-base sm:text-lg text-center leading-tight">{t.name}</h3>
                  <p className="text-xs sm:text-sm font-semibold text-center mt-0.5 mb-3 sm:mb-4" style={{ color: t.frameColor }}>
                    {t.subject}
                  </p>

                  {/* Language pills */}
                  <div className="flex flex-wrap gap-1.5 justify-center mb-3 sm:mb-4">
                    {t.languages.map((lang) => (
                      <span key={lang} className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* CTA button */}
                  <Link
                    href="/demo"
                    className="block text-center text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm hover:opacity-90 transition-opacity duration-200"
                    style={{ backgroundColor: t.frameColor }}
                  >
                    Book Free Demo
                  </Link>
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
          <Link
            href="/teachers"
            className="inline-flex items-center gap-2 border border-[#4915b0] text-[#4915b0] font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-[#4915b0] hover:text-white transition-all duration-300 text-xs sm:text-sm"
          >
            Browse All Teachers
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}