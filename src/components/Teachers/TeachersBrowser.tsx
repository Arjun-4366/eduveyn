'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';
import { tutorFrameColors, tutorTag } from '@/lib/utils';
import { ITutor, ITutorPagination } from '@/types/tutors/tutors';

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
  <svg width="56" height="26" viewBox="0 0 60 28" fill="none" className="w-8 sm:w-10 md:w-[56px]">
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
    className={`rounded-[22px] sm:rounded-[28px] md:rounded-[36px] overflow-hidden animate-pulse ${skeletonTilts[index % 6]}`}
    style={{ backgroundColor: '#E5E7EB' }}
  >
    <div className="pt-3 sm:pt-5 px-3 sm:px-5 pb-3 sm:pb-5 flex flex-col items-center gap-2 sm:gap-3">
      <div className="flex w-full justify-between">
        <div className="h-5 w-14 sm:w-16 bg-gray-300 rounded-full" />
        <div className="h-5 w-10 sm:w-12 bg-gray-300 rounded-full" />
      </div>
      <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-[10px] sm:rounded-[14px] md:rounded-[16px] bg-gray-300 mt-1" />
    </div>
    <div className="bg-white mx-2 sm:mx-2.5 md:mx-3 mb-2 sm:mb-2.5 md:mb-3 rounded-[14px] sm:rounded-[18px] md:rounded-[24px] px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5">
      <div className="h-4 sm:h-5 bg-gray-200 rounded-full w-3/4 mx-auto mb-2" />
      <div className="flex gap-1.5 justify-center mb-3 sm:mb-4">
        <div className="h-4 sm:h-5 w-12 sm:w-14 bg-gray-100 rounded-full" />
        <div className="h-4 sm:h-5 w-12 sm:w-14 bg-gray-100 rounded-full" />
      </div>
      <div className="h-8 sm:h-9 md:h-10 bg-gray-200 rounded-lg sm:rounded-xl" />
    </div>
  </motion.div>
);

const tiltCycle = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-2'];

// ── Browser ──────────────────────────────────────────────────────────────

export default function TeachersBrowser({
  tutors,
  pagination,
  initialSearch,
}: {
  tutors: ITutor[];
  pagination: ITutorPagination;
  initialSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);
  const isFirstRender = useRef(true);

  const goToPage = (page: number, searchValue: string) => {
    const params = new URLSearchParams();
    if (searchValue) params.set('search', searchValue);
    params.set('page', String(page));
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  // Debounce: push the new search URL 450ms after the user stops typing.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => goToPage(1, search), 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden relative">
        <div className="absolute top-6 sm:top-8 left-4 sm:left-14 pointer-events-none">
          <Float><Asterisk color="#F59E0B" size={22} /></Float>
        </div>
        <div className="absolute top-10 sm:top-14 right-4 sm:right-20 pointer-events-none hidden sm:block">
          <Float delay={0.7}><StarOutline color="#7C3AED" size={18} /></Float>
        </div>
        <div className="absolute bottom-8 sm:bottom-10 right-4 sm:right-1/3 pointer-events-none hidden sm:block">
          <Float delay={1.3}><Wave color="#22C55E" /></Float>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeUp}
              className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
            >
              Find Teachers
            </motion.span>
            <motion.h1 variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-2 sm:px-0"
            >
              Meet Your{' '}
              <span className="relative inline-block text-[#4915b0]">
                Perfect Tutor
                <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 160 8" preserveAspectRatio="none">
                  <path d="M0,4 C40,0 120,8 160,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>
            <motion.p variants={fadeUp}
              className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto mb-6 sm:mb-8 px-2 sm:px-0"
            >
              Browse verified tutors by subject, language, and rating. First demo is free.
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
                placeholder="Search by tutor name..."
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

      {/* ── Grid ── */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
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
                  key={`count-${pagination.total}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  Showing <span className="font-semibold text-gray-900">{pagination.total}</span> teacher{pagination.total !== 1 ? 's' : ''}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Grid — skeleton while a search/page navigation is pending */}
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-[repeat(auto-fit,minmax(150px,260px))] justify-center gap-3 sm:gap-5 md:gap-8"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} index={i} />
                ))}
              </motion.div>
            ) : tutors.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-[repeat(auto-fit,minmax(150px,260px))] justify-center gap-3 sm:gap-5 md:gap-8"
              >
                {tutors.map((t, i) => {
                  const frameColor = tutorFrameColors[i % tutorFrameColors.length];
                  const tiltClass = tiltCycle[i % tiltCycle.length];

                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 32, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: i * 0.07 }}
                      className="relative"
                    >
                      <div
                        className={`rounded-[22px] sm:rounded-[28px] md:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 group ${tiltClass}`}
                        style={{ backgroundColor: frameColor }}
                      >
                        {/* Colored top */}
                        <div className="pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 text-center">
                          <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5">
                            <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full leading-tight">{tutorTag(t.performance_score)}</span>
                            <span className="text-[9px] sm:text-[10px] md:text-xs text-white/80 font-medium">{t.experience}</span>
                          </div>

                          <div className="flex justify-center">
                            <div className="p-0.5 sm:p-1 rounded-[14px] sm:rounded-[16px] md:rounded-[20px] bg-white/30">
                              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-[10px] sm:rounded-[12px] md:rounded-[16px] overflow-hidden">
                                <Image
                                  src={t.profile_image}
                                  alt={t.name}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* White inner panel */}
                        <div className="bg-white mx-2 sm:mx-2.5 md:mx-3 mb-2 sm:mb-2.5 md:mb-3 rounded-[14px] sm:rounded-[16px] md:rounded-[24px] px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5">
                          <h3 className="font-extrabold text-gray-900 text-sm sm:text-base md:text-lg text-center leading-tight">{t.name}</h3>

                          <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center mt-1.5 mb-2.5 sm:mb-3 md:mb-4">
                            {t.subjects.map((subject) => (
                              <span key={subject.id} className="text-[9px] sm:text-[10px] md:text-xs bg-gray-100 text-gray-600 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 rounded-full font-medium">{subject.name}</span>
                            ))}
                          </div>

                          <Link
                            href="/demo"
                            className="block text-center text-white font-semibold py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: frameColor }}
                          >
                            Book Free Demo
                          </Link>
                        </div>
                      </div>
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
                <p className="font-bold text-gray-900 text-base sm:text-lg">No teachers found</p>
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

          {/* Pagination */}
          {!isPending && pagination.total_pages > 1 && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12">
              <button
                onClick={() => goToPage(pagination.page - 1, search)}
                disabled={pagination.page <= 1}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#4915b0] hover:text-white text-gray-600 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Previous page"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-[16px] sm:h-[16px]">
                  <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                Page {pagination.page} of {pagination.total_pages}
              </span>

              <button
                onClick={() => goToPage(pagination.page + 1, search)}
                disabled={pagination.page >= pagination.total_pages}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#4915b0] hover:text-white text-gray-600 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Next page"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-[16px] sm:h-[16px]">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
