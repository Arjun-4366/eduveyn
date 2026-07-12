'use client';

import { useState, useEffect, SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stagger, fadeUp, springIn } from '@/lib/animations';
import { IReview } from '@/types/reviews/reviews';
import { createReview } from '@/services/review';

// ── Decorative accents ────────────────────────────────────────────────────

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

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(isoDate));

// ── Star picker (used by the inline review form) ───────────────────────────

function StarPicker({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div role="group" aria-label="Star rating" className="flex items-center gap-1.5" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          aria-label={`${s} star${s > 1 ? 's' : ''}`}
          className="p-0.5"
        >
          <svg width="26" height="26" viewBox="0 0 22 22" fill={s <= display ? '#FCD34D' : '#E5E7EB'}>
            <path d="M11 1l2.7 6.9L21 8.4l-5.5 4.7L17.2 20 11 16l-6.2 4 1.7-6.9L1 8.4l7.3-.5z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

// ── Inline review form — swaps into the card area in place of the carousel ─

type Errors = { name?: string; rating?: string; message?: string };

function ReviewFormCard({ onClose, onSubmitted }: { onClose: () => void; onSubmitted: (review: IReview) => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Auto-return to the carousel a moment after a successful submit —
  // the manual "Back to Reviews" button covers anyone who doesn't want to wait.
  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [submitted, onClose]);

  const validate = (): boolean => {
    const next: Errors = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    if (!rating) next.rating = 'Please pick a star rating.';
    if (!message.trim()) next.message = 'Please share a few words about your experience.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await createReview({ name: name.trim(), rating, message: message.trim() });
      onSubmitted(res.data);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[28px] sm:rounded-[32px] shadow-lg px-5 sm:px-8 py-6 sm:py-8 max-w-xl mx-auto">
      {submitted ? (
        <div className="text-center py-6 sm:py-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M6 13.5l4.5 4.5L20 8" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1.5">Thank you for your review!</h3>
          <p className="text-gray-500 text-xs sm:text-sm mb-5">We appreciate you taking the time to share your experience.</p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 border border-[#4915b0] text-[#4915b0] font-semibold px-6 py-2.5 rounded-full hover:bg-[#4915b0] hover:text-white transition-all duration-300 text-xs sm:text-sm"
          >
            Back to Reviews
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base sm:text-lg">Share Your Experience</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xs sm:text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Your Rating</label>
            <StarPicker value={rating} onChange={(r) => { setRating(r); setErrors((prev) => ({ ...prev, rating: undefined })); }} />
            {errors.rating && <p className="text-red-500 text-[11px] sm:text-xs mt-1.5">{errors.rating}</p>}
          </div>

          <div>
            <label htmlFor="review-name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Your Name</label>
            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
              placeholder="e.g. Sarah Thompson"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#4915b0] focus:bg-white transition-colors"
            />
            {errors.name && <p className="text-red-500 text-[11px] sm:text-xs mt-1.5">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="review-message" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Your Review</label>
            <textarea
              id="review-message"
              value={message}
              onChange={(e) => { setMessage(e.target.value); setErrors((prev) => ({ ...prev, message: undefined })); }}
              placeholder="Tell us about your experience with Eduweyn..."
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#4915b0] focus:bg-white transition-colors resize-none"
            />
            {errors.message && <p className="text-red-500 text-[11px] sm:text-xs mt-1.5">{errors.message}</p>}
          </div>

          {submitError && (
            <p className="text-red-500 text-xs sm:text-sm text-center">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 bg-[#4915b0] text-white font-semibold py-3 rounded-full hover:bg-[#3a0f95] transition-colors duration-200 text-sm sm:text-base shadow-lg shadow-violet-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
}

// Slot colors & tilts — consistent per position, not per review
const slotColors = ['#7C3AED', '#F59E0B', '#DB2777'];
const slotTilts = ['rotate-1', '-rotate-2', 'rotate-2'];

const PER_PAGE = 3;

export default function Testimonials({ reviews: initialReviews }: { reviews: IReview[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const totalPages = Math.max(1, Math.ceil(reviews.length / PER_PAGE));

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  const handleSubmitted = (review: IReview) => {
    setReviews((prev) => [review, ...prev]);
    setPage(0); // jump to page 1 so the new review is immediately visible
  };

  const visible = reviews.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden relative">

      {/* Floating decorative icons - responsive positioning */}
      <div className="absolute top-8 sm:top-10 left-4 sm:left-12 pointer-events-none">
        <Float delay={0}><Asterisk color="#F59E0B" size={22} /></Float>
      </div>
      <div className="absolute top-12 sm:top-16 right-4 sm:right-16 pointer-events-none hidden sm:block">
        <Float delay={0.8}><StarOutline color="#7C3AED" size={20} /></Float>
      </div>
      <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-20 pointer-events-none hidden sm:block">
        <Float delay={1.4}><Wave color="#22C55E" /></Float>
      </div>
      <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-12 pointer-events-none">
        <Float delay={0.4}><Asterisk color="#DB2777" size={18} /></Float>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-8 sm:mb-10"
        >
          <motion.span variants={fadeUp}
            className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
          >
            Testimonials
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 px-2 sm:px-0"
          >
            Parents{' '}
            <span className="relative inline-block">
              Love Us
              <svg className="absolute left-0 w-full -bottom-2" height="8" viewBox="0 0 80 8" preserveAspectRatio="none">
                <path d="M0,4 C20,0 60,8 80,4" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 max-w-md mx-auto text-xs sm:text-sm mt-3 sm:mt-4 px-2 sm:px-0"
          >
            Real stories from families whose children have grown with TuteHub.
          </motion.p>

          {!showForm && (
            <motion.div variants={fadeUp} className="mt-5 sm:mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 border border-[#4915b0] text-[#4915b0] font-semibold px-6 py-2.5 rounded-full hover:bg-[#4915b0] hover:text-white transition-all duration-300 text-xs sm:text-sm"
              >
                Share Your Experience
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Card area — carousel or the inline review form, swapped smoothly */}
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ReviewFormCard onClose={() => setShowForm(false)} onSubmitted={handleSubmitted} />
            </motion.div>
          ) : reviews.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center text-gray-500 text-sm max-w-md mx-auto"
            >
              No reviews yet — be the first to share your experience!
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                  >
                    {visible.map((review, i) => (
                      <motion.div
                        key={review.id}
                        variants={springIn}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                        className={`rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:rotate-0 ${slotTilts[i]}`}
                        style={{ backgroundColor: slotColors[i] }}
                      >
                        {/* Colored top — avatar + name + date + stars */}
                        <div className="pt-4 sm:pt-5 md:pt-6 px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 text-center">
                          <div className="inline-flex items-center justify-center p-0.5 sm:p-1 rounded-xl sm:rounded-2xl bg-white/25 mb-2 sm:mb-3">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center">
                              <span className="text-white font-extrabold text-base sm:text-lg">{initials(review.name)}</span>
                            </div>
                          </div>
                          <p className="font-bold text-white text-xs sm:text-sm leading-tight">{review.name}</p>
                          <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">{formatDate(review.created_at)}</p>
                          <div className="flex items-center justify-center gap-0.5 mt-1.5 sm:mt-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <svg key={s} width="10" height="10" viewBox="0 0 11 11" className="sm:w-[12px] sm:h-[12px]"
                                fill={s <= review.rating ? '#FCD34D' : 'rgba(255,255,255,0.35)'}>
                                <path d="M5.5 1l1.1 3.4H10L7.3 6.5l1 3.2L5.5 7.9 2.7 9.7l1-3.2L1 4.4h3.4z" />
                              </svg>
                            ))}
                          </div>
                        </div>

                        {/* White inner panel — quote */}
                        <div className="bg-white mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-5 py-4 sm:py-5">
                          <svg width="20" height="15" viewBox="0 0 24 18" fill="none" className="mb-2 sm:mb-3 opacity-20 sm:w-[24px] sm:h-[18px]">
                            <path d="M0 18V10.8C0 5.4 3 1.8 9 0l1.8 2.4C7.2 3.6 5.4 5.4 5.4 8.4H9V18H0zm13.2 0V10.8c0-5.4 3-9 9-10.8l1.8 2.4c-3.6 1.2-5.4 3-5.4 6H22.2V18H13.2z"
                              fill={slotColors[i]} />
                          </svg>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{review.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls — dots + prev/next inline */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
                  <button
                    onClick={prev}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#4915b0] hover:text-white text-gray-600 transition-all duration-200 group"
                    aria-label="Previous"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-[16px] sm:h-[16px]">
                      <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                          i === page ? 'w-6 sm:w-8 bg-[#4915b0]' : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to page ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#4915b0] hover:text-white text-gray-600 transition-all duration-200 group"
                    aria-label="Next"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-[16px] sm:h-[16px]">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
