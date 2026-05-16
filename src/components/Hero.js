import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ShopContext } from '../App';

export default function Hero() {
  const { setView } = useContext(ShopContext);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Hero Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-xs uppercase tracking-[0.6em] text-gray-500 mb-8"
        >
          New Monolith Series
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-6xl md:text-9xl font-serif mb-12 tracking-tighter leading-none"
        >
          Poetry in <br />
          <span className="italic text-gray-400">Object Form</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button className="bg-white text-black px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 group">
            Explore Objects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setView('lookbook')}
            className="border border-white/20 backdrop-blur-md px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            View Lookbook
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-gray-600">Scroll to Explore</span>
        <motion.div 
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}