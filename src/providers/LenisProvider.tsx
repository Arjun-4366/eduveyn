'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Scroll to hash anchor using Lenis (fixes stuck/jumpy scroll on anchor links)
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const target = document.querySelector(hash);
      if (target) lenis.scrollTo(target as HTMLElement, { offset: -72, immediate: false });
    };

    // Handle clicks on all anchor links so Lenis drives the scroll
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      // Same-page hash link (e.g. /#testimonials or #testimonials)
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      history.pushState(null, '', href);
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('hashchange', scrollToHash);

    // Handle hash present on initial load
    if (window.location.hash) setTimeout(scrollToHash, 200);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('click', handleClick);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return <>{children}</>;
}
