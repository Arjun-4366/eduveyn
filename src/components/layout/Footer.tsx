'use client';

import Link from 'next/link';

// ── Logo exports ──────────────────────────────────────────────────────────

export const EduweynMark = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <path d="M22 41 C9 38 3 30 3 22 C3 11 11 3 22 3 C33 3 41 11 41 22 C41 30 35 38 22 41Z" fill="#7C3AED" />
    <path d="M22 7 C29 7 36 13 36 21 C36 27 32 33 26 37" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <line x1="22" y1="38" x2="22" y2="8" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 16 L32 11" stroke="#F59E0B" strokeWidth="1.9" strokeLinecap="round" opacity="0.95" />
    <path d="M22 20 L12 15" stroke="#F59E0B" strokeWidth="1.9" strokeLinecap="round" opacity="0.95" />
    <path d="M22 27 L33 23" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    <path d="M22 30 L11 27" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    <circle cx="22" cy="7" r="2.2" fill="#F59E0B" />
  </svg>
);

export const EduweynWordmark = ({ dark = true }: { dark?: boolean }) => (
  <div className="flex flex-col leading-none">
    <div className="flex items-baseline gap-0">
      <span className={`text-[18px] font-extrabold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>Edu</span>
      <span className="text-[18px] font-extrabold tracking-tight text-[#F59E0B]">weyn</span>
    </div>
    <p className={`text-[8px] uppercase tracking-[0.18em] mt-0.5 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
      knowledge is growth
    </p>
  </div>
);

// ── Data ──────────────────────────────────────────────────────────────────

const social = [
  {
    label: 'WhatsApp', href: '#', color: '#22C55E',
    icon: (
      <svg width="15" height="15" viewBox="0 0 28 28" fill="white">
        <path d="M14 0C6.27 0 0 6.27 0 14c0 2.47.64 4.79 1.76 6.81L.07 27.6l6.87-1.67A13.94 13.94 0 0014 28c7.73 0 14-6.27 14-14S21.73 0 14 0zm7.07 19.64c-.3.85-1.75 1.62-2.39 1.66-.62.04-.64.47-4.01-.94-3.38-1.41-5.45-4.81-5.61-5.03-.16-.22-1.24-1.66-1.21-3.12.03-1.47.8-2.17 1.08-2.47.27-.29.59-.35.78-.35l.56.01c.19 0 .45-.07.7.54l.91 2.25c.25.62.11.81-.06 1.11l-.45.73c-.16.27-.33.56-.14.86.19.3.86 1.41 1.86 2.28 1.26 1.1 2.36 1.48 2.68 1.64.32.16.52.13.71-.08l.7-.83c.22-.28.43-.2.71-.1l2.2 1.02c.62.29 1 .46 1.13.72.13.25.13 1.45-.17 2.3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram', href: '#', color: '#E1306C',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook', href: '#', color: '#1877F2',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'X', href: '#', color: '#111827',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'Subjects', href: '/subjects' },
  { label: 'Find Teachers', href: '/teachers' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const parentLinks = [
  { label: 'Book Free Demo', href: '/demo' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Become a Tutor', href: '/register/teacher' },
  { label: 'Login', href: '/login' },
];

// ── Footer ────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-[#F0F2F5] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-200">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="group-hover:scale-105 transition-transform duration-300">
                <EduweynMark size={38} />
              </div>
              <EduweynWordmark dark={false} />
            </Link>

            <p className="text-gray-400 text-xs leading-relaxed mb-5 max-w-[220px]">
              Expert online tutors for Maths, Science, English, Arabic, Coding, and more. First class is always free.
            </p>

            <div className="flex items-center gap-2 mb-6">
              {social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-85 hover:scale-105 transition-all duration-200"
                  style={{ backgroundColor: s.color }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Get updates..."
                className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-400 outline-none focus:border-[#4915b0] transition-colors"
              />
              <button className="shrink-0 bg-[#F59E0B] text-gray-900 font-bold px-3.5 py-2 rounded-lg text-xs hover:bg-amber-400 transition-colors">
                →
              </button>
            </div>
          </div>

          {/* Col 2 — Explore */}
          <div>
            <h3 className="text-[#4915b0] font-bold text-sm mb-4">Explore</h3>
            <ul className="flex flex-col gap-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-gray-500 hover:text-[#4915b0] text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — For Parents */}
          <div>
            <h3 className="text-[#4915b0] font-bold text-sm mb-4">For Parents</h3>
            <ul className="flex flex-col gap-2.5">
              {parentLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-gray-500 hover:text-[#4915b0] text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-[#4915b0] font-bold text-sm mb-4">Get in Touch</h3>
            <ul className="flex flex-col gap-3 mb-6">
              {[
                { icon: '📞', value: '+971 50 123 4567', href: 'tel:+971501234567' },
                { icon: '✉️', value: 'hello@eduweyn.com', href: 'mailto:hello@eduweyn.com' },
                { icon: '📍', value: 'Dubai, UAE', href: '#' },
              ].map((item) => (
                <li key={item.value}>
                  <a href={item.href}
                    className="flex items-center gap-2.5 text-gray-500 hover:text-gray-800 text-sm transition-colors duration-200">
                    <span className="text-base leading-none">{item.icon}</span>
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>

            <Link
              href="/demo"
              className="inline-block bg-[#4915b0] text-white font-semibold px-5 py-2.5 rounded-lg text-xs hover:bg-[#3a0f95] transition-colors"
            >
              Book Free Demo →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-gray-400 text-xs">© 2026 Eduweyn. All rights reserved.</p>
          <p className="text-xs italic" style={{ color: '#F59E0B' }}>knowledge is the vein of growth</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="#" className="hover:text-gray-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
