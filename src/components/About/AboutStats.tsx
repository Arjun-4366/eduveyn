'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { stagger, springIn } from '@/lib/animations';

function CountUp({ end, suffix = '', decimals = 0 }: { end: number; suffix?: string; decimals?: number }) {
  const [displayed, setDisplayed] = useState(0);
  const hasStarted = useRef(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (hasStarted.current) return;
        hasStarted.current = true;
        const steps = 50;
        const increment = end / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            setDisplayed(end);
            clearInterval(timer);
          } else {
            setDisplayed(current);
          }
        }, 30);
      }}
    >
      {decimals > 0 ? displayed.toFixed(decimals) : Math.floor(displayed)}
      {suffix}
    </motion.span>
  );
}

const stats = [
  { end: 500, suffix: '+', decimals: 0, label: 'Students Enrolled',    frameColor: '#4915b0' },
  { end: 50,  suffix: '+', decimals: 0, label: 'Verified Tutors',      frameColor: '#D97706' },
  { end: 10,  suffix: '+', decimals: 0, label: 'Subjects Covered',     frameColor: '#DB2777' },
  { end: 4.9, suffix: '/5', decimals: 1, label: 'Parent Satisfaction', frameColor: '#059669' },
];

export default function AboutStats() {
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
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={springIn}
              className={`rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:rotate-0 ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
              style={{ backgroundColor: s.frameColor }}
            >
              <div className="pt-5 px-5 pb-4 text-center">
                <p className="text-4xl md:text-5xl font-black text-white leading-none">
                  <CountUp end={s.end} suffix={s.suffix} decimals={s.decimals} />
                </p>
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
