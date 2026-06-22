'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Asterisk = ({ color = 'rgba(255,255,255,0.3)', size = 36 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <line x1="16" y1="2" x2="16" y2="30" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="2" y1="16" x2="30" y2="16" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="5" y1="5" x2="27" y2="27" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="27" y1="5" x2="5" y2="27" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export default function AboutVision() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-2xl"
          style={{ backgroundColor: '#4915b0' }}
        >
          {/* Purple top section */}
          <div className="pt-6 sm:pt-8 md:pt-10 px-6 sm:px-8 md:px-10 pb-4 sm:pb-5 md:pb-6 text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Asterisk size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 sm:mb-3 leading-tight px-2 sm:px-0">
              Learning Without Limits
            </h2>
          </div>

          {/* White inner panel */}
          <div className="bg-white mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 text-center">
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              We&apos;re building a future where geography, language, or income never determines the quality of education a child receives.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3">
              <Link 
                href="/demo" 
                className="bg-[#4915b0] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#3a0f95] transition-colors shadow-lg shadow-violet-200 text-xs sm:text-sm w-full sm:w-auto text-center"
              >
                Book a Free Demo
              </Link>
              <Link 
                href="/register/teacher" 
                className="border border-gray-200 text-gray-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:border-[#4915b0] hover:text-[#4915b0] transition-colors text-xs sm:text-sm w-full sm:w-auto text-center"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}