'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { stagger, springIn, fadeUp } from '@/lib/animations';
import { ISubject } from '@/types/subjects/subjects';
import { getSubjectIcon } from '@/lib/subjectIcons';

// ── Decorators ─────────────────────────────────────────────────────────────

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

// ── Skeleton card ──────────────────────────────────────────────────────────

const skeletonTilts = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-2'];

const SkeletonCard = ({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.06 }}
    className={`rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden animate-pulse ${skeletonTilts[index % 6]}`}
    style={{ backgroundColor: '#E5E7EB' }}
  >
    <div className="pt-6 sm:pt-7 md:pt-8 px-5 sm:px-6 pb-4 sm:pb-5 md:pb-6 flex justify-center">
      <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gray-300" />
    </div>
    <div className="bg-white mx-2.5 sm:mx-3 mb-2.5 sm:mb-3 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-6 py-4 sm:py-5">
      <div className="h-5 bg-gray-200 rounded-full w-2/3 mx-auto mb-2.5" />
      <div className="h-3 bg-gray-100 rounded-full w-1/2 mx-auto mb-3" />
      <div className="h-3 bg-gray-100 rounded-full w-full mb-1.5" />
      <div className="h-3 bg-gray-100 rounded-full w-4/5" />
    </div>
  </motion.div>
);

const frameColors = ['#4915b0', '#D97706', '#DB2777', '#0369A1', '#059669', '#EA580C'];
const tiltClasses = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1'];

// ── Page ──────────────────────────────────────────────────────────────────

export default function SubjectsPageContent({
  subjects,
  initialSearch,
}: {
  subjects: ISubject[];
  initialSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);
  const isFirstRender = useRef(true);

  const goToSearch = (searchValue: string) => {
    const params = new URLSearchParams();
    if (searchValue) params.set('search', searchValue);
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  // Debounce: push the new search URL 450ms after the user stops typing.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => goToSearch(search), 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden relative">
        <div className="absolute top-6 sm:top-8 left-4 sm:left-16 pointer-events-none">
          <Float><Asterisk color="#F59E0B" size={22} /></Float>
        </div>
        <div className="absolute top-10 sm:top-12 right-4 sm:right-20 pointer-events-none hidden sm:block">
          <Float delay={0.6}><StarOutline color="#7C3AED" size={18} /></Float>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-1/3 pointer-events-none hidden sm:block">
          <Float delay={1.2}><Wave color="#22C55E" /></Float>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span
              variants={fadeUp}
              className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
            >
              Subjects
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-2 sm:px-0"
            >
              Explore Our{' '}
              <span className="relative inline-block text-[#4915b0]">
                Subjects
                <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0,4 C25,0 75,8 100,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base mb-6 sm:mb-8 px-2 sm:px-0"
            >
              Choose a subject and connect with expert tutors who specialize in it.
            </motion.p>

            {/* Search bar */}
            <motion.div variants={fadeUp}
              className="flex items-center gap-2.5 sm:gap-3 bg-white rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 max-w-lg mx-auto shadow-xl border border-gray-100 transition-shadow focus-within:shadow-2xl focus-within:border-violet-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isPending ? (
                  <motion.svg
                    key="spinner"
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ rotate: { repeat: Infinity, duration: 0.7, ease: 'linear' }, opacity: { duration: 0.15 } }}
                    className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#4915b0]"
                    viewBox="0 0 24 24" fill="none"
                  >
                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="searchicon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    width="16" height="16" viewBox="0 0 18 18" fill="none"
                    className="text-gray-400 shrink-0 sm:w-[18px] sm:h-[18px]"
                  >
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M14 14l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </motion.svg>
                )}
              </AnimatePresence>

              <input
                type="text"
                placeholder="Search subjects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />

              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setSearch('')}
                    className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors shrink-0 text-xs"
                  >
                    ✕
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Subject cards ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Results count */}
          <div className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 h-5 flex items-center">
            <AnimatePresence mode="wait">
              {isPending ? (
                <motion.span
                  key="counting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-400 italic"
                >
                  Searching…
                </motion.span>
              ) : (
                <motion.span
                  key={`count-${subjects.length}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  Showing <span className="font-semibold text-gray-900">{subjects.length}</span> subject{subjects.length !== 1 ? 's' : ''}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} index={i} />
                ))}
              </motion.div>
            ) : subjects.length > 0 ? (
              <motion.div
                key="results"
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {subjects.map((subject, i) => {
                  const color = frameColors[i % frameColors.length];
                  const tiltClass = tiltClasses[i % tiltClasses.length];
                  const Icon = getSubjectIcon(subject.icon);
                  return (
                    <motion.div key={subject.id} variants={springIn} className="relative">

                      {/* Scattered decorative icons */}
                      {i === 0 && <div className="absolute -top-5 sm:-top-6 -right-2 sm:-right-3 z-10"><Asterisk color="#F59E0B" size={20} /></div>}
                      {i === 2 && <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 z-10"><StarOutline color="#7C3AED" size={16} /></div>}
                      {i === 4 && <div className="absolute -top-4 sm:-top-5 -left-2 sm:-left-3 z-10 hidden sm:block"><Wave color="#22C55E" /></div>}

                      <Link
                        href={`/teachers?subject=${subject.id}`}
                        className={`block rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 group ${tiltClass}`}
                        style={{ backgroundColor: color }}
                      >
                        {/* Colored top — icon centered */}
                        <div className="pt-6 sm:pt-7 md:pt-8 px-5 sm:px-6 pb-4 sm:pb-5 md:pb-6 text-center">
                          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center mx-auto text-white group-hover:scale-110 transition-transform duration-300">
                            <Icon size={36} />
                          </div>
                        </div>

                        {/* White inner panel */}
                        <div className="bg-white mx-2.5 sm:mx-3 mb-2.5 sm:mb-3 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-6 py-4 sm:py-5">
                          <h2 className="font-extrabold text-gray-900 text-base sm:text-lg mb-0.5">{subject.name}</h2>
                          <p className="text-[10px] sm:text-xs font-semibold mb-2.5 sm:mb-3" style={{ color }}>
                            {subject.tutor_count} teachers available
                          </p>
                          {subject.description && (
                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{subject.description}</p>
                          )}
                          <span
                            className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold transition-colors duration-200"
                            style={{ color }}
                          >
                            View Teachers
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="sm:w-[14px] sm:h-[14px]">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                className="text-center py-16 sm:py-20 md:py-24"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] sm:rounded-[28px] flex items-center justify-center mx-auto mb-4 sm:mb-5" style={{ backgroundColor: '#EDE9F9' }}>
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="#4915b0" strokeWidth="2" className="sm:w-[36px] sm:h-[36px]">
                    <circle cx="22" cy="22" r="14" />
                    <path d="M35 35l8 8" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="font-bold text-gray-900 text-base sm:text-lg">No subjects found</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Try a different search</p>
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="mt-4 sm:mt-5 text-sm text-[#4915b0] font-semibold hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CTA block ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 sm:mt-14 md:mt-16 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-xl"
            style={{ backgroundColor: '#4915b0' }}
          >
            <div className="pt-8 sm:pt-10 px-6 sm:px-8 pb-3 sm:pb-4 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-1 sm:mb-2">
                Don&apos;t see your subject?
              </h2>
            </div>
            <div className="bg-white mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-6 sm:px-8 py-5 sm:py-7 text-center">
              <p className="text-gray-500 mb-4 sm:mb-5 text-xs sm:text-sm max-w-sm mx-auto">
                We add new subjects regularly. Contact us and we&apos;ll match you with the right tutor.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#4915b0] text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-[#3a0f95] transition-colors text-xs sm:text-sm shadow-lg shadow-violet-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
