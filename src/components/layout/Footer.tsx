'use client';

import Link from 'next/link';
import Image from 'next/image';
import edulogo from '@/assets/images/edulogo.png';
import { ISiteContentContact } from '@/types/siteContent/siteContent';

// ── Logo exports ──────────────────────────────────────────────────────────

export const EduveynMark = ({ size = 44 }: { size?: number }) => (
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

export const EduveynWordmark = ({ dark = true }: { dark?: boolean }) => (
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

export const EduveynLogo = ({ height = 38 }: { height?: number }) => (
  <Image
    src={edulogo}
    alt="Eduveyn"
    height={height}
    width={0}
    style={{ height: `${height}px`, width: 'auto' }}
    className="object-contain"
  />
);

// ── Data ──────────────────────────────────────────────────────────────────

const buildSocialLinks = (contact: ISiteContentContact) => [
  {
    label: 'WhatsApp',
    href: contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` : null,
    color: '#22C55E',
    icon: (
      <svg width="15" height="15" viewBox="0 0 28 28" fill="white">
        <path d="M14 0C6.27 0 0 6.27 0 14c0 2.47.64 4.79 1.76 6.81L.07 27.6l6.87-1.67A13.94 13.94 0 0014 28c7.73 0 14-6.27 14-14S21.73 0 14 0zm7.07 19.64c-.3.85-1.75 1.62-2.39 1.66-.62.04-.64.47-4.01-.94-3.38-1.41-5.45-4.81-5.61-5.03-.16-.22-1.24-1.66-1.21-3.12.03-1.47.8-2.17 1.08-2.47.27-.29.59-.35.78-.35l.56.01c.19 0 .45-.07.7.54l.91 2.25c.25.62.11.81-.06 1.11l-.45.73c-.16.27-.33.56-.14.86.19.3.86 1.41 1.86 2.28 1.26 1.1 2.36 1.48 2.68 1.64.32.16.52.13.71-.08l.7-.83c.22-.28.43-.2.71-.1l2.2 1.02c.62.29 1 .46 1.13.72.13.25.13 1.45-.17 2.3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram', href: contact?.social?.instagram || null, color: '#E1306C',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook', href: contact.social?.facebook || null, color: '#1877F2',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn', href: contact.social?.linkedin || null, color: '#0A66C2',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.27 20.1H3.65V9h3.62v11.1zM5.47 7.43c-1.16 0-2.1-.94-2.1-2.1 0-1.16.94-2.1 2.1-2.1 1.16 0 2.1.94 2.1 2.1 0 1.16-.93 2.1-2.1 2.1zM20.34 20.1h-3.62v-5.4c0-1.29-.02-2.94-1.79-2.94-1.8 0-2.08 1.4-2.08 2.85v5.49H9.23V9h3.47v1.52h.05c.48-.91 1.67-1.87 3.44-1.87 3.68 0 4.36 2.42 4.36 5.57v5.88z" />
      </svg>
    ),
  },
  {
    label: 'X', href: contact.social?.x || null, color: '#111827',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube', href: contact.social?.youtube || null, color: '#FF0000',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.49 20.5 12 20.5 12 20.5s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.75 15.57V8.43L15.82 12l-6.07 3.57z" />
      </svg>
    ),
  },
].filter((s): s is typeof s & { href: string } => Boolean(s.href));

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

export default function Footer({ contact }: { contact: ISiteContentContact }) {
  const social = buildSocialLinks(contact);
  const phone = contact.phone || '+971 50 123 4567';
  const email = contact.email || 'hello@eduveyn.com';
  const address = contact.address || 'Dubai, UAE';

  return (
    <footer className="bg-[#F0F2F5] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-200">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1 mb-4 group w-fit hover:opacity-90 transition-opacity duration-300">
              <EduveynLogo height={38} />
              <span className="text-2xl sm:text-3xl font-semibold italic tracking-tight text-[#002860]">
                Edu<span className="text-[#00A0A8]">veyn</span>
              </span>
            </Link>

            <p className="text-gray-800 text-xs leading-relaxed mb-5 max-w-[220px]">
              Expert tutors. Flexible schedules. Real results. Helping every child unlock their full potential — one lesson at a time
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
          </div>

          {/* Col 2 — Explore */}
          <div>
            <h3 className="text-[#4915b0] font-bold text-sm mb-4">Explore</h3>
            <ul className="flex flex-col gap-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-gray-800 hover:text-[#4915b0] text-sm transition-colors duration-200">
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
                    className="text-gray-800 hover:text-[#4915b0] text-sm transition-colors duration-200">
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
                { icon: '📞', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
                { icon: '✉️', value: email, href: `mailto:${email}` },
                { icon: '📍', value: address, href: '#' },
              ].map((item) => (
                <li key={item.value}>
                  <a href={item.href}
                    className="flex items-center gap-2.5 text-gray-800 hover:text-gray-800 text-sm transition-colors duration-200">
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
          <p className="text-gray-800 text-xs">© 2026 Eduveyn. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
