'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger, springIn } from '@/lib/animations';
import { EduveynMark } from '@/components/layout/Footer';

const dashboardLinks = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    label: 'Join Live Class',
    desc: 'Access your scheduled class right now',
    frameColor: '#4915b0',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    label: 'View Homework',
    desc: 'Check assignments from your teacher',
    frameColor: '#D97706',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
      </svg>
    ),
    label: 'View Payments',
    desc: 'Manage your invoices and subscriptions',
    frameColor: '#059669',
  },
];

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setLoggedIn(true); }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#F0F2F5] hero-grid-bg flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      <div className="w-full max-w-md">
        {loggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-2xl"
            style={{ backgroundColor: '#4915b0' }}
          >
            {/* Purple top */}
            <div className="pt-6 sm:pt-8 px-6 sm:px-8 pb-4 sm:pb-5 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-2xl sm:text-3xl"
              >
                👋
              </motion.div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Welcome back!</h2>
              <p className="text-violet-300 text-xs sm:text-sm mt-1">{form.email}</p>
            </div>

            {/* White inner panel */}
            <div className="bg-white mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-4 sm:px-6 py-5 sm:py-6">
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {dashboardLinks.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 text-left group border border-gray-100 hover:border-transparent"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.frameColor }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-xs sm:text-sm">{item.label}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{item.desc}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-30 group-hover:opacity-70 transition-opacity sm:w-[16px] sm:h-[16px]">
                      <path d="M5 8h6M8 5l3 3-3 3" stroke="#4915b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setLoggedIn(false)}
                className="w-full mt-4 sm:mt-5 text-center text-xs sm:text-sm text-gray-400 hover:text-gray-600 py-2 hover:underline"
              >
                Sign out
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-2xl"
            style={{ backgroundColor: '#4915b0' }}
          >
            {/* Purple top — logo + welcome */}
            <div className="pt-6 sm:pt-8 px-6 sm:px-8 pb-5 sm:pb-7 text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-4 sm:mb-5">
                <EduveynMark size={36} />
                <div className="flex flex-col leading-none text-left">
                  <div className="flex items-baseline gap-0">
                    <span className="text-[15px] sm:text-[17px] font-extrabold text-white tracking-tight">Edu</span>
                    <span className="text-[15px] sm:text-[17px] font-extrabold tracking-tight text-[#F59E0B]">weyn</span>
                  </div>
                  <p className="text-[7px] sm:text-[8px] text-white/40 uppercase tracking-[0.16em] mt-0.5">knowledge is growth</p>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white mb-1">Student Login</h1>
              <p className="text-violet-300 text-xs sm:text-sm">Access your classes, homework, and payments.</p>
            </div>

            {/* White form panel */}
            <div className="bg-white mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-4 sm:px-6 py-5 sm:py-6">
              <motion.form variants={stagger} initial="hidden" animate="visible" onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
                <motion.div variants={fadeUp}>
                  <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="student@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400"
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                    <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wide">Password</label>
                    <button type="button" className="text-[10px] sm:text-xs text-[#4915b0] font-semibold hover:underline">Forgot?</button>
                  </div>
                  <div className="relative">
                    <input
                      required
                      type={showPass ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400 pr-10 sm:pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPass ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[16px] sm:h-[16px]">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[16px] sm:h-[16px]">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.button
                  variants={springIn}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#4915b0] text-white font-bold py-3 sm:py-4 rounded-xl hover:bg-[#3a0f95] transition-colors text-sm shadow-lg shadow-violet-200 disabled:opacity-70 flex items-center justify-center gap-2 mt-1"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in...
                    </>
                  ) : 'Sign In'}
                </motion.button>
              </motion.form>

              <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-100 text-center">
                <p className="text-[10px] sm:text-xs text-gray-400 mb-2.5 sm:mb-3">New to Eduveyn?</p>
                <Link
                  href="/demo"
                  className="inline-block bg-[#F59E0B] text-gray-900 font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm hover:bg-amber-400 transition-colors"
                >
                  Book a Free Demo Class
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
