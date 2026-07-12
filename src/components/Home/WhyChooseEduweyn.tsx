'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger, scaleIn } from '@/lib/animations';
import { ISiteContentWhyChooseUs } from '@/types/siteContent/siteContent';
import { splitHeadlineEmphasis } from '@/lib/utils';
import { getSubjectIcon } from '@/lib/subjectIcons';

const DEFAULT_WHY_TITLE = 'Why Families Choose Us';

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

const Wave = ({ color = '#22C55E' }: { color?: string }) => (
  <svg width="56" height="26" viewBox="0 0 60 28" fill="none" className="w-10 sm:w-12 md:w-[56px]">
    <path d="M0 14 C10 4 20 24 30 14 C40 4 50 24 60 14" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M0 21 C10 11 20 31 30 21 C40 11 50 31 60 21" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// ── Reason data ─────────────────────────────────────────────────────────

const frameColors = ['#4915b0', '#D97706', '#DB2777', '#059669', '#7C3AED', '#0369A1'];
const tiltClasses = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1'];

const DEFAULT_REASONS = [
  { icon: 'shield', title: 'Verified Expert Tutors', subtitle: 'Every tutor is background-checked and vetted for subject mastery before they ever meet a student.' },
  { icon: 'target', title: 'Personalized Learning Plans', subtitle: 'No generic curriculum — every plan is built around your child\'s pace, goals, and learning style.' },
  { icon: 'calendar', title: 'Flexible Scheduling', subtitle: 'Morning, evening, or weekend — book sessions around your family\'s life, not the other way around.' },
  { icon: 'trending_up', title: 'Real-Time Progress Tracking', subtitle: 'Watch grades, attendance, and skill growth update live from an interactive parent dashboard.' },
  { icon: 'gift', title: 'Free First Class', subtitle: 'Try a full live session at no cost. See the teaching style and fit before you commit to anything.' },
  { icon: 'lock', title: 'Safe & Secure Platform', subtitle: 'Encrypted sessions, moderated chat, and full parental visibility — every class happens in a safe space.' },
];

// ── Section ─────────────────────────────────────────────────────────────

export default function WhyChooseEduweyn({ header }: { header: ISiteContentWhyChooseUs }) {
  const subtitle = header.subtitle || "Six reasons parents trust Eduweyn with their child's learning journey.";
  const title = header.title || DEFAULT_WHY_TITLE;
  const { lead: titleLead, emphasis: titleEmphasis } = splitHeadlineEmphasis(title);
  const reasons = header.items && header.items.length > 0 ? header.items : DEFAULT_REASONS;

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
            Why Eduweyn
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 px-2 sm:px-0"
          >
            {title === DEFAULT_WHY_TITLE ? (
              <>
                Why Families{' '}
                <span className="relative inline-block text-[#4915b0]">
                  Choose Us
                  <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 130 8" preserveAspectRatio="none">
                    <path d="M0,4 C32,0 98,8 130,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </>
            ) : (
              <>
                {titleLead}
                <span className="relative inline-block text-[#4915b0]">
                  {titleEmphasis}
                  <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 130 8" preserveAspectRatio="none">
                    <path d="M0,4 C32,0 98,8 130,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </>
            )}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base mt-3 sm:mt-4 px-2 sm:px-0"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Reason cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {reasons.map((reason, i) => {
            const Icon = getSubjectIcon(reason.icon);
            return (
            <motion.div key={reason.title} variants={scaleIn} className="relative">

              {/* Decorative icons outside cards */}
              {i === 0 && (
                <div className="absolute -top-5 sm:-top-6 -right-2 sm:-right-3 z-10">
                  <Asterisk color="#F59E0B" size={22} />
                </div>
              )}
              {i === 1 && (
                <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
                  <StarOutline color="#DB2777" size={18} />
                </div>
              )}
              {i === 3 && (
                <div className="absolute top-1/2 -left-4 sm:-left-6 z-10 hidden lg:block">
                  <Wave color="#22C55E" />
                </div>
              )}
              {i === 5 && (
                <div className="absolute -top-4 sm:-top-5 -right-3 sm:-right-4 z-10">
                  <Asterisk color="#7C3AED" size={18} />
                </div>
              )}

              {/* Colored frame + white inner panel */}
              <div
                className={`rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 group ${tiltClasses[i % tiltClasses.length]}`}
                style={{ backgroundColor: frameColors[i % frameColors.length] }}
              >
                <div className="pt-4 sm:pt-5 md:pt-6 px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/20 text-white group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} />
                  </div>
                </div>

                <div className="bg-white mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-5 py-4 sm:py-5">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1.5 sm:mb-2 leading-snug">{reason.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{reason.subtitle}</p>
                </div>
              </div>
            </motion.div>
            );
          })}
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
            href="/demo"
            className="inline-flex items-center gap-2 sm:gap-3 bg-[#4915b0] text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full hover:bg-[#3a0f95] transition-colors duration-200 text-sm sm:text-base shadow-lg shadow-violet-200"
          >
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 rounded-full">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-[14px] sm:h-[14px]">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H5.5M10.5 3.5V8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Book My Free Demo
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
