'use client';

import { motion } from 'framer-motion';
import { stagger, springIn } from '@/lib/animations';
import { ISiteContentStat } from '@/types/siteContent/siteContent';

const frameColors = ['#4915b0', '#D97706', '#DB2777', '#059669'];

const DEFAULT_STATS: ISiteContentStat[] = [
  { value: '500+', label: 'Students Enrolled' },
  { value: '50+', label: 'Verified Tutors' },
  { value: '10+', label: 'Subjects Covered' },
  { value: '4.9/5', label: 'Parent Satisfaction' },
];

export default function AboutStats({ stats }: { stats: ISiteContentStat[] }) {
  const items = stats.length > 0 ? stats : DEFAULT_STATS;

  return (
    <section className="py-16 px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              variants={springIn}
              className={`rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:rotate-0 ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
              style={{ backgroundColor: frameColors[i % frameColors.length] }}
            >
              <div className="pt-5 px-5 pb-4 text-center">
                <p className="text-4xl md:text-5xl font-black text-white leading-none">{s.value}</p>
              </div>
              <div className="bg-white mx-2.5 mb-2.5 rounded-[20px] px-4 py-3 text-center">
                <p className="text-xs font-semibold text-gray-600">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
