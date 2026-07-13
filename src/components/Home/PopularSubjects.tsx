'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger, scaleIn } from '@/lib/animations';
import { ISubject } from '@/types/subjects/subjects';
import { getSubjectIcon } from '@/lib/subjectIcons';

const frameColors = ['#4915b0', '#D97706', '#DB2777', '#0369A1', '#059669', '#EA580C'];

export default function PopularSubjects({ subjects }: { subjects: ISubject[] }) {
  if (subjects.length === 0) return null;

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
          {subjects.map((subject, i) => {
            const color = frameColors[i % frameColors.length];
            const Icon = getSubjectIcon(subject.icon);
            return (
              <motion.div key={subject.id} variants={scaleIn}>
                <div className="block bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
                  {/* Vivid colored frame */}
                  <div
                    className="h-24 sm:h-28 md:h-32 flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/20 text-white">
                      <Icon size={28} />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="px-2 sm:px-3 pb-3 sm:pb-4 pt-2 sm:pt-3 text-center">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm">{subject.name}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                      <p className="text-[10px] sm:text-xs text-gray-400">{subject.tutor_count} teachers</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
