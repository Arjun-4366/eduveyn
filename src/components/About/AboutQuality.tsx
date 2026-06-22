'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger, springIn } from '@/lib/animations';

const qualitySteps = [
  {
    step: '01',
    title: 'Application Review',
    desc: 'We verify qualifications, degrees, and prior teaching experience.',
    frameColor: '#4915b0',
    tiltClass: 'rotate-1',
  },
  {
    step: '02',
    title: 'Subject Test',
    desc: 'Tutors must demonstrate mastery of their subject at the highest level.',
    frameColor: '#D97706',
    tiltClass: '-rotate-1',
  },
  {
    step: '03',
    title: 'Live Demo Class',
    desc: 'They teach a real lesson. We evaluate communication, clarity, and style.',
    frameColor: '#059669',
    tiltClass: 'rotate-2',
  },
];

export default function AboutQuality() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <motion.span 
            variants={fadeUp} 
            className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
          >
            Teaching Quality
          </motion.span>
          <motion.h2 
            variants={fadeUp} 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-2 sm:px-0"
          >
            Only <span className="text-[#4915b0]">1 in 5</span> tutors qualify
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base px-2 sm:px-0"
          >
            Every tutor passes a background review, a subject test, and a live demo class before being listed.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
        >
          {qualitySteps.map((item) => (
            <motion.div
              key={item.step}
              variants={springIn}
              className={`rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 ${item.tiltClass}`}
              style={{ backgroundColor: item.frameColor }}
            >
              <div className="pt-4 sm:pt-5 md:pt-6 px-4 sm:px-5 pb-3 sm:pb-4">
                <span className="text-4xl sm:text-5xl font-black text-white/20 leading-none select-none">{item.step}</span>
              </div>
              <div className="bg-white mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-5 py-4 sm:py-5">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1.5 sm:mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}