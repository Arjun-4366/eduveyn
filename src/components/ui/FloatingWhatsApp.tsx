'use client';

import { motion } from 'framer-motion';

export default function FloatingWhatsApp({ whatsapp }: { whatsapp: string }) {
  if (!whatsapp) return null;

  return (
    <motion.a
      href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white font-semibold pl-4 pr-5 py-3.5 rounded-full shadow-2xl shadow-green-300/40 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      {/* <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" /> */}

      <svg width="22" height="22" viewBox="0 0 22 22" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 0C4.925 0 0 4.925 0 11c0 1.937.5 3.755 1.38 5.338L.05 21.6l5.4-1.31A10.94 10.94 0 0011 22c6.075 0 11-4.925 11-11S17.075 0 11 0zm5.55 15.425c-.237.665-1.375 1.27-1.875 1.3-.487.03-.5.37-3.15-.735-2.65-1.105-4.275-3.775-4.4-3.95-.125-.175-.975-1.3-.95-2.45.025-1.15.625-1.7.85-1.937.212-.225.462-.275.612-.275l.437.01c.15 0 .35-.05.55.425l.712 1.763c.2.487.087.637-.05.875l-.35.575c-.125.212-.262.437-.113.675.15.237.675 1.1 1.463 1.787.987.862 1.85 1.162 2.1 1.287.25.125.412.1.562-.062l.55-.65c.175-.225.338-.163.562-.075l1.725.8c.488.225.788.363.888.563.1.2.1 1.137-.137 1.8z" />
      </svg>

      <span className="text-sm relative z-10">Chat with us</span>
    </motion.a>
  );
}
