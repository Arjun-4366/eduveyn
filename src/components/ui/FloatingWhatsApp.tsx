'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingWhatsApp({ whatsapp }: { whatsapp: string }) {
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  // Appear after 1.5 s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Hide when footer enters viewport so it never overlaps Privacy / Terms
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!whatsapp) return null;

  const show = visible && !footerVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="wa-btn"
          href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white font-semibold pl-4 pr-5 py-3.5 rounded-full shadow-2xl shadow-green-300/40"
          aria-label="Chat on WhatsApp"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 0C4.925 0 0 4.925 0 11c0 1.937.5 3.755 1.38 5.338L.05 21.6l5.4-1.31A10.94 10.94 0 0011 22c6.075 0 11-4.925 11-11S17.075 0 11 0zm5.55 15.425c-.237.665-1.375 1.27-1.875 1.3-.487.03-.5.37-3.15-.735-2.65-1.105-4.275-3.775-4.4-3.95-.125-.175-.975-1.3-.95-2.45.025-1.15.625-1.7.85-1.937.212-.225.462-.275.612-.275l.437.01c.15 0 .35-.05.55.425l.712 1.763c.2.487.087.637-.05.875l-.35.575c-.125.212-.262.437-.113.675.15.237.675 1.1 1.463 1.787.987.862 1.85 1.162 2.1 1.287.25.125.412.1.562-.062l.55-.65c.175-.225.338-.163.562-.075l1.725.8c.488.225.788.363.888.563.1.2.1 1.137-.137 1.8z" />
          </svg>
          <span className="text-sm">Chat with us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

