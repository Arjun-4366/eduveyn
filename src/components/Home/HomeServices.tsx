'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { slideLeft, slideRight, stagger, fadeUp } from '@/lib/animations';
import service1 from "../../assets/images/service 1.webp"
import service2 from "../../assets/images/service 2.webp"
import service3 from "../../assets/images/service 3.webp"

// ── Floating UI widget components ──────────────────────────────────────────

const SubjectProgressCard = () => (
  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-3 sm:p-4 w-44 sm:w-48 md:w-52 select-none transform rotate-3 hover:rotate-1 transition-transform duration-300">
    <div className="flex items-center justify-between mb-2 sm:mb-2.5">
      <p className="text-[10px] sm:text-[11px] font-bold text-gray-700 uppercase tracking-wide">Enrolled Subjects</p>
      <span className="text-[9px] sm:text-[10px] font-semibold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded-full">Grade 10</span>
    </div>
    {[
      { subject: 'Mathematics', sessions: '12 Sessions', color: '#7C3AED' },
      { subject: 'Physics', sessions: '10 Sessions', color: '#F59E0B' },
      { subject: 'Chemistry', sessions: '8 Sessions', color: '#10B981' },
    ].map((item) => (
      <div key={item.subject} className="flex items-center gap-1.5 sm:gap-2 py-1 sm:py-1.5 border-b border-gray-50 last:border-0">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
        <span className="text-[10px] sm:text-[11px] text-gray-700 font-medium flex-1">{item.subject}</span>
        <span className="text-[9px] sm:text-[10px] text-gray-400 font-normal">{item.sessions}</span>
      </div>
    ))}
  </div>
);

const HomeworkCard = () => (
  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-3 sm:p-4 w-48 sm:w-52 md:w-56 select-none transform -rotate-3 hover:-rotate-1 transition-transform duration-300">
    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
      <span className="text-[9px] sm:text-[10px] font-bold text-violet-600 bg-violet-50 px-1.5 sm:px-2 py-0.5 rounded-full">Mathematics</span>
      <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full">Score: 98%</span>
    </div>
    <p className="text-[10px] sm:text-xs font-bold text-gray-900 mb-1 leading-snug">Quadratic Equations & Roots</p>
    <p className="text-[9px] sm:text-[10px] text-gray-500 mb-2 sm:mb-3 leading-relaxed">
      &ldquo;Excellent problem solving steps in Section B!&rdquo; — Tutor Remark
    </p>
    <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-gray-400 border-t border-gray-100 pt-2">
      <span className="flex items-center gap-1">📄 assignment_04.pdf</span>
      <span className="text-violet-600 font-semibold">Reviewed ✓</span>
    </div>
  </div>
);

const ScheduleCard = () => (
  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-3 sm:p-4 w-52 sm:w-60 md:w-64 select-none transform rotate-2 hover:rotate-0 transition-transform duration-300">
    <div className="flex items-center justify-between mb-1.5">
      <p className="text-xs sm:text-sm font-bold text-gray-900">Upcoming Live Class</p>
      <span className="text-[9px] sm:text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Today · 5:00 PM
      </span>
    </div>
    <p className="text-[10px] sm:text-xs font-semibold text-violet-700 mb-2.5">Physics · Laws of Motion</p>
    <div className="bg-gray-50 rounded-lg p-2 mb-2.5 flex items-center justify-between">
      <div>
        <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase font-semibold">Assigned Tutor</p>
        <p className="text-[10px] sm:text-xs font-bold text-gray-800">Dr. Rajesh Kumar</p>
      </div>
      <span className="text-[9px] sm:text-[10px] bg-[#4915b0] text-white font-medium px-2 py-1 rounded-md shadow-sm">Join Live</span>
    </div>
    <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-gray-500 pt-1 border-t border-gray-100">
      <span>Attendance Rate</span>
      <span className="font-bold text-emerald-600">96% (24/25 Classes)</span>
    </div>
  </div>
);

const MaterialsCards = () => (
  <div className="flex flex-col gap-2 select-none transform -rotate-2 hover:rotate-0 transition-transform duration-300">
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 w-48 sm:w-52 md:w-56">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 shrink-0 text-base sm:text-lg">
        📚
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] sm:text-xs font-bold text-gray-900 truncate">Chapter Notes & PDFs</p>
        <p className="text-[9px] sm:text-[10px] text-emerald-600 font-medium">Uploaded after each class</p>
      </div>
    </div>
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-2.5 sm:p-3 flex items-center justify-between w-52 sm:w-56 md:w-60">
      <div>
        <p className="text-[10px] sm:text-xs font-bold text-gray-900">Periodic Test Assessment</p>
        <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-500" />
          <span className="text-[9px] sm:text-[10px] text-gray-500">CBSE & ICSE Board Pattern</span>
        </div>
      </div>
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 font-bold text-[10px]">
        ✓
      </div>
    </div>
  </div>
);

// ── Decorative accents ────────────────────────────────────────────────────

const Asterisk = ({ color = '#F59E0B', size = 32 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <line x1="16" y1="2" x2="16" y2="30" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="2" y1="16" x2="30" y2="16" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="5" y1="5" x2="27" y2="27" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="27" y1="5" x2="5" y2="27" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

const StarOutline = ({ color = '#F59E0B', size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <path d="M11 2l2.2 6.7H20l-5.6 4.1 2.1 6.7L11 15.4l-5.5 4.1 2.1-6.7L2 8.7h6.8z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const Wave = ({ color = '#22C55E' }: { color?: string }) => (
  <svg width="60" height="28" viewBox="0 0 60 28" fill="none" className="w-10 sm:w-14 md:w-[60px]">
    <path d="M0 14 C10 4 20 24 30 14 C40 4 50 24 60 14" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M0 21 C10 11 20 31 30 21 C40 11 50 31 60 21" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
  </svg>
);

// ── Feature data ──────────────────────────────────────────────────────────

type Widget = { el: React.ReactNode; pos: string } | null;

const features: {
  badge: string;
  badgeColor: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string | StaticImageData;
  frameColor: string;
  tiltClass: string;
  imageLeft: boolean;
  widget1: Widget;
  widget2: Widget;
  decor: React.ReactNode;
}[] = [
  {
    badge: 'ONE ON ONE TUTORING',
    badgeColor: '#EC4899',
    title: 'Personalized 1-on-1 Sessions\nfor Every Student',
    desc: "Connect with verified, subject-specialist tutors for dedicated one-on-one learning tailored to your child's curriculum, syllabus, and learning pace with individual attention in every session.",
    bullets: ['Dedicated 1-on-1 Mentorship', 'CBSE, ICSE & State Boards', 'Instant Doubt Resolution', 'Individual Learning Pace'],
    image: service2,
    frameColor: '#7C3AED',
    tiltClass: 'rotate-2',
    imageLeft: true,
    widget1: { el: <SubjectProgressCard />, pos: 'top-4 sm:top-6 left-2 sm:left-4' },
    widget2: { el: <HomeworkCard />, pos: 'bottom-3 sm:bottom-4 right-2 sm:right-4' },
    decor: (
      <>
        <div className="absolute -top-4 sm:-top-5 right-12 sm:right-16 z-10"><Asterisk color="#F59E0B" size={28} /></div>
        <div className="absolute top-1/3 -right-4 sm:-right-5 z-10"><StarOutline color="#7C3AED" size={18} /></div>
      </>
    ),
  },
  {
    badge: 'SMART SCHEDULING & TRACKING',
    badgeColor: '#EC4899',
    title: 'Real-Time Progress &\nSchedule Management',
    desc: "Manage class schedules around your family's routine. Monitor live attendance, class timetables, and academic milestones in real time through the dedicated student and parent portal.",
    bullets: ['Flexible Class Timetable', 'Live Attendance Tracking', 'Automated Session Reminders', 'Parent Visibility & Reports'],
    image: service3,
    frameColor: '#F59E0B',
    tiltClass: '-rotate-2',
    imageLeft: false,
    widget1: { el: <ScheduleCard />, pos: 'bottom-3 sm:bottom-4 left-2 sm:left-4' },
    widget2: null,
    decor: (
      <>
        <div className="absolute -top-4 sm:-top-5 left-12 sm:left-16 z-10"><StarOutline color="#7C3AED" size={20} /></div>
        <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 z-10"><Wave color="#22C55E" /></div>
      </>
    ),
  },
  {
    badge: 'NOTES & ASSESSMENTS',
    badgeColor: '#22C55E',
    title: 'Curated Chapter Notes,\nHomework & Assessments',
    desc: 'Strengthen conceptual clarity with chapter-wise study notes uploaded after every session, structured homework assignments with tutor remarks, and periodic syllabus-aligned test assessments.',
    bullets: ['Chapter-wise Study Notes (PDF)', 'Regular Homework & Grading', 'Tutor Feedback & Remarks', 'Exam-Oriented Practice Tests'],
    image: service1,
    frameColor: '#7C3AED',
    tiltClass: 'rotate-1',
    imageLeft: true,
    widget1: null,
    widget2: { el: <MaterialsCards />, pos: 'bottom-3 sm:bottom-4 right-2 sm:right-4' },
    decor: (
      <>
        <div className="absolute -top-3 sm:-top-4 right-10 sm:right-14 z-10 rotate-12"><Asterisk color="#F59E0B" size={26} /></div>
        <div className="absolute top-12 -left-4 sm:-left-5 z-10"><Wave color="#22C55E" /></div>
      </>
    ),
  },
];

// ── Section ───────────────────────────────────────────────────────────────

export default function HomeServices() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#F0F2F5] hero-grid-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-gray-300 bg-white text-gray-500 mb-4 sm:mb-5"
          >
            What We Offer
          </motion.span>
          <motion.h2 
            variants={fadeUp} 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 px-2 sm:px-0"
          >
            Explore Our Learning Solution
          </motion.h2>
          <motion.div variants={fadeUp} className="flex justify-center mt-1">
            <svg width="220" height="10" viewBox="0 0 220 10" preserveAspectRatio="none" className="w-44 sm:w-56 md:w-[220px]">
              <path d="M0,5 C55,0 110,10 165,5 C186,2 205,4 220,5" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Feature blocks */}
        <div className="flex flex-col gap-20 sm:gap-24 md:gap-28">
          {features.map((feature) => (
            <div
              key={feature.badge}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center"
            >
              {/* Image column */}
              <motion.div
                variants={feature.imageLeft ? slideLeft : slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className={`relative ${!feature.imageLeft ? 'lg:order-2' : ''}`}
              >
                {feature.decor}

                {/* Colored frame */}
                <div
                  className={`relative rounded-[30px] sm:rounded-[35px] md:rounded-[40px] pt-4 sm:pt-5 md:pt-6 px-4 sm:px-5 md:px-6 pb-8 sm:pb-9 md:pb-10 transition-transform duration-500 hover:rotate-0 ${feature.tiltClass}`}
                  style={{ backgroundColor: feature.frameColor }}
                >
                  {/* Image clipped to inner radius */}
                  <div className="relative h-[250px] sm:h-[300px] md:h-[340px] lg:h-[390px] rounded-[18px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.badge}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {feature.widget1 && (
                    <div className={`absolute ${feature.widget1.pos} z-20`}>
                      {feature.widget1.el}
                    </div>
                  )}
                  {feature.widget2 && (
                    <div className={`absolute ${feature.widget2.pos} z-20`}>
                      {feature.widget2.el}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Text column */}
              <motion.div
                variants={feature.imageLeft ? slideRight : slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className={!feature.imageLeft ? 'lg:order-1' : ''}
              >
                <span
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-widest"
                  style={{ color: feature.badgeColor }}
                >
                  {feature.badge}
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 sm:mt-3 mb-4 sm:mb-5 leading-tight whitespace-pre-line">
                  {feature.title}
                </h2>

                <p className="text-gray-500 leading-relaxed mb-6 sm:mb-8 text-sm md:text-base">
                  {feature.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-3">
                  {feature.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5 3.5-4" stroke="#4915b0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}