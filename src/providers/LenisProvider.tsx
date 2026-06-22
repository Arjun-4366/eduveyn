'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Create Lenis once on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    // Handle clicks on hash anchor links so Lenis drives the scroll
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      history.pushState(null, '', href);
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const target = document.querySelector(hash);
      if (target) lenis.scrollTo(target as HTMLElement, { offset: -72, immediate: false });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('hashchange', handleHashChange);

    if (window.location.hash) setTimeout(handleHashChange, 200);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.removeEventListener('click', handleClick);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Scroll to top on every page navigation
  useEffect(() => {
    // Always scroll to top first — native browser scroll reset so the
    // new page never starts mid-way from the previous page's position
    window.scrollTo(0, 0);

    const apply = () => {
      const lenis = lenisRef.current;
      if (!lenis) return;

      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -72 });
          return;
        }
      }

      lenis.scrollTo(0, { immediate: true });
    };

    // Small delay ensures Lenis RAF has ticked at least once after navigation
    const t = setTimeout(apply, 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return <>{children}</>;
}
