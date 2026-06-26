'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { EduweynLogo } from '@/components/layout/Footer';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Subjects', href: '/subjects' },
  { label: 'Find Teachers', href: '/teachers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0 group hover:opacity-90 transition-opacity duration-300">
          <EduweynLogo height={38} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-medium text-sm transition-colors relative group ${
                pathname === link.href ? 'text-[#4915b0]' : 'text-gray-600 hover:text-[#4915b0]'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4915b0] rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold text-gray-700 hover:text-[#4915b0] transition-colors px-4 py-2"
          >
            Login
          </Link>
          <Link
            href="/demo"
            className="bg-[#F59E0B] text-gray-900 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-amber-400 transition-colors"
          >
            Book Free Demo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
            className="block w-5 h-0.5 bg-gray-800 origin-center transition-transform"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="block w-5 h-0.5 bg-gray-800"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
            className="block w-5 h-0.5 bg-gray-800 origin-center transition-transform"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`py-3 px-3 rounded-xl font-medium text-sm transition-colors ${
                    pathname === link.href
                      ? 'bg-violet-50 text-[#4915b0]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
                <Link
                  href="/login"
                  className="text-center border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/demo"
                  className="text-center bg-[#F59E0B] text-gray-900 font-semibold py-3 rounded-xl text-sm hover:bg-amber-400 transition-colors"
                >
                  Book Free Demo
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
