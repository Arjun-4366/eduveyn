'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';
import { IFaq } from '@/types/faqs/faqs';
import { ISiteContentFaq } from '@/types/siteContent/siteContent';
import { splitHeadlineEmphasis } from '@/lib/utils';

// ── Decorative accents (same as HowItWorks / Testimonials) ────────────────

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

// ── Data ────────────────────────────────────────────────────────────────

const frameColors = ['#4915b0', '#4915b0'];

// ── Section ─────────────────────────────────────────────────────────────

export default function FAQ({ faqs, header }: { faqs: IFaq[]; header: ISiteContentFaq }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  const subtitle = header.faqSubtitle || "Everything parents ask us before their child's first lesson.";
  const title = header.faqTitle || 'Frequently Asked Questions';
  const { lead: titleLead, emphasis: titleEmphasis } = splitHeadlineEmphasis(title);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden relative">

      {/* Floating decorative icons */}
      <div className="absolute top-10 sm:top-14 left-4 sm:left-12 pointer-events-none hidden sm:block">
        <Asterisk color="#F59E0B" size={22} />
      </div>
      <div className="absolute bottom-10 sm:bottom-14 right-4 sm:right-14 pointer-events-none hidden sm:block">
        <StarOutline color="#7C3AED" size={20} />
      </div>

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
          >
            FAQ
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 px-2 sm:px-0"
          >
            {titleLead}
            <span className="relative inline-block">
              {titleEmphasis}
              <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 140 8" preserveAspectRatio="none">
                <path d="M0,4 C35,0 105,8 140,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 max-w-md mx-auto text-sm sm:text-base mt-3 sm:mt-4 px-2 sm:px-0"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-3 sm:gap-4"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const frameColor = frameColors[i % frameColors.length];
            return (
              <motion.div
                key={faq.id}
                variants={fadeUp}
                className="rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundColor: frameColor }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-4 sm:px-6 py-4 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-white text-sm sm:text-base">{faq.question}</span>
                  <span
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/20 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-[16px] sm:rounded-[20px] px-4 sm:px-5 py-3 sm:py-4">
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
          className="text-center mt-8 sm:mt-10"
        >
          <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-[#4915b0] text-[#4915b0] font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-[#4915b0] hover:text-white transition-all duration-300 text-xs sm:text-sm"
          >
            Contact Our Team
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
