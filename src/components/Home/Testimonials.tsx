'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { stagger, fadeUp, springIn } from '@/lib/animations';

// ── Decorative accents ────────────────────────────────────────────────────

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

const testimonials = [
  {
    name: 'Sarah Thompson',
    role: 'Mother of Ethan Thompson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'Since enrolling Ethan at TuteHub, we\'ve seen a remarkable improvement in his confidence and academic skills. The staff truly listens to our concerns and works closely with us for his success.',
    rating: 5,
  },
  {
    name: 'Mark Williams',
    role: 'Father of Olivia Williams',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'TuteHub has been such a blessing for Olivia. The teachers are supportive, and we\'re always kept informed about her progress. It feels like we\'re all working together to help her thrive.',
    rating: 5,
  },
  {
    name: 'Linda Garcia',
    role: 'Mother of Lucas Garcia',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'The communication and support from TuteHub have been exceptional. I can see how much they care about Lucas and his education, and it makes all the difference.',
    rating: 5,
  },
  {
    name: 'Ahmed Al-Rashid',
    role: 'Father of Lena Al-Rashid',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'My daughter\'s Arabic improved dramatically in just two months. The native-speaking tutor made her feel comfortable and excited to learn. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Priya Mehta',
    role: 'Mother of Arjun Mehta',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'Flexible scheduling is the reason we chose TuteHub. My son has sessions after school, on weekends — it adapts to our family. The coding tutor is fantastic!',
    rating: 5,
  },
  {
    name: 'James Okonkwo',
    role: 'Father of Amara Okonkwo',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'Amara went from dreading Maths to asking for extra sessions. The tutor found exactly how she learns best and built on it. The results speak for themselves.',
    rating: 5,
  },
];

// Slot colors & tilts — consistent per position, not per testimonial
const slotColors = ['#7C3AED', '#F59E0B', '#DB2777'];
const slotTilts = ['rotate-1', '-rotate-2', 'rotate-2'];

const PER_PAGE = 3;

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / PER_PAGE);

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  const visible = testimonials.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden relative">

      {/* Floating decorative icons - responsive positioning */}
      <div className="absolute top-8 sm:top-10 left-4 sm:left-12 pointer-events-none">
        <Float delay={0}><Asterisk color="#F59E0B" size={22} /></Float>
      </div>
      <div className="absolute top-12 sm:top-16 right-4 sm:right-16 pointer-events-none hidden sm:block">
        <Float delay={0.8}><StarOutline color="#7C3AED" size={20} /></Float>
      </div>
      <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-20 pointer-events-none hidden sm:block">
        <Float delay={1.4}><Wave color="#22C55E" /></Float>
      </div>
      <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-12 pointer-events-none">
        <Float delay={0.4}><Asterisk color="#DB2777" size={18} /></Float>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <motion.span variants={fadeUp}
            className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            variants={fadeUp} 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 px-2 sm:px-0"
          >
            Parents{' '}
            <span className="relative inline-block">
              Love Us
              <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 80 8" preserveAspectRatio="none">
                <path d="M0,4 C20,0 60,8 80,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            className="text-gray-500 max-w-md mx-auto text-xs sm:text-sm mt-3 sm:mt-4 px-2 sm:px-0"
          >
            Real stories from families whose children have grown with TuteHub.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {visible.map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={springIn}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className={`rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 ${slotTilts[i]}`}
                  style={{ backgroundColor: slotColors[i] }}
                >
                  {/* Colored top — photo + name + role + stars */}
                  <div className="pt-4 sm:pt-5 md:pt-6 px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 text-center">
                    <div className="inline-block p-0.5 sm:p-1 rounded-xl sm:rounded-2xl bg-white/25 mb-2 sm:mb-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden">
                        <Image src={t.photo} alt={t.name} width={64} height={64} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <p className="font-bold text-white text-xs sm:text-sm leading-tight">{t.name}</p>
                    <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">{t.role}</p>
                    <div className="flex items-center justify-center gap-0.5 mt-1.5 sm:mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} width="10" height="10" viewBox="0 0 11 11" fill="#FCD34D" className="sm:w-[12px] sm:h-[12px]">
                          <path d="M5.5 1l1.1 3.4H10L7.3 6.5l1 3.2L5.5 7.9 2.7 9.7l1-3.2L1 4.4h3.4z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* White inner panel — quote */}
                  <div className="bg-white mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-5 py-4 sm:py-5">
                    <svg width="20" height="15" viewBox="0 0 24 18" fill="none" className="mb-2 sm:mb-3 opacity-20 sm:w-[24px] sm:h-[18px]">
                      <path d="M0 18V10.8C0 5.4 3 1.8 9 0l1.8 2.4C7.2 3.6 5.4 5.4 5.4 8.4H9V18H0zm13.2 0V10.8c0-5.4 3-9 9-10.8l1.8 2.4c-3.6 1.2-5.4 3-5.4 6H22.2V18H13.2z"
                        fill={slotColors[i]} />
                    </svg>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{t.quote}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls — dots + prev/next inline */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
          <button
            onClick={prev}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#4915b0] hover:text-white text-gray-600 transition-all duration-200 group"
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-[16px] sm:h-[16px]">
              <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  i === page ? 'w-6 sm:w-8 bg-[#4915b0]' : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#4915b0] hover:text-white text-gray-600 transition-all duration-200 group"
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-[16px] sm:h-[16px]">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}