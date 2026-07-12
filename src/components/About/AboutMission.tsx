'use client';

import { motion } from 'framer-motion';
import { slideLeft, slideRight } from '@/lib/animations';
import { ISiteContentMission } from '@/types/siteContent/siteContent';
import { getSubjectIcon } from '@/lib/subjectIcons';
import { splitHeadlineEmphasis } from '@/lib/utils';

const frameColors = ['#4915b0', '#059669', '#0369A1', '#D97706'];
const tiltClasses = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2'];

const DEFAULT_MISSION: ISiteContentMission = {
  title: 'Our Mission',
  subtitle: 'Bridging potential and performance',
  description: "Too many students fall behind not because they lack ability, but because they lack the right support at the right time. We match each student with a tutor who understands their unique learning style, pace, and goals.",
  items: [
    { icon: 'person', title: 'Personalized', subtitle: "Every lesson is tailored to the student's exact level, pace, and learning style." },
    { icon: 'verified', title: 'Quality', subtitle: 'All tutors are manually vetted, interviewed, and test-taught before joining.' },
    { icon: 'globe', title: 'Accessible', subtitle: 'Online, multilingual, and available 7 days a week — wherever you are.' },
    { icon: 'trending_up', title: 'Results-Driven', subtitle: 'We track progress, set milestones, and celebrate every achievement.' },
  ],
};

export default function AboutMission({ mission }: { mission: ISiteContentMission }) {
  const content = mission.items.length > 0 ? mission : DEFAULT_MISSION;
  const { lead: subtitleLead, emphasis: subtitleEmphasis } = splitHeadlineEmphasis(content.subtitle);

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
            {content.title || 'Our Mission'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-5 leading-tight px-2 sm:px-0">
            {content.subtitle === DEFAULT_MISSION.subtitle ? (
              <>
                Bridging{' '}
                <span className="relative inline-block">
                  potential
                  <svg className="absolute left-0 w-full -bottom-1 sm:-bottom-1.5" height="7" viewBox="0 0 100 7" preserveAspectRatio="none">
                    <path d="M0,3.5 C25,0 75,7 100,3.5" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
                {' '}and performance
              </>
            ) : (
              <>
                {subtitleLead}
                <span className="relative inline-block">
                  {subtitleEmphasis}
                  <svg className="absolute left-0 w-full -bottom-1 sm:-bottom-1.5" height="7" viewBox="0 0 100 7" preserveAspectRatio="none">
                    <path d="M0,3.5 C25,0 75,7 100,3.5" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </>
            )}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            {content.description}
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
          {content.items.map((v, i) => {
            const Icon = getSubjectIcon(v.icon);
            return (
              <div
                key={v.title}
                className={`rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:rotate-0 ${tiltClasses[i % tiltClasses.length]}`}
                style={{ backgroundColor: frameColors[i % frameColors.length] }}
              >
                <div className="pt-4 sm:pt-5 px-4 sm:px-5 pb-3 sm:pb-4 flex justify-center">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center text-white">
                    <Icon size={26} />
                  </div>
                </div>
                <div className="bg-white mx-2 sm:mx-2.5 mb-2 sm:mb-2.5 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] px-3 sm:px-4 py-3 sm:py-4">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{v.subtitle}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
