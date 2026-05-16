import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ShieldCheck, Truck, RefreshCcw, Info, Box, Leaf } from 'lucide-react';
import { ShopContext } from '../App';

export default function ProductModal({ product }) {
  const { setSelectedProduct, addToCart } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'specs' | 'story'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
    >
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
        onClick={() => setSelectedProduct(null)} 
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-2xl"
      >
        <button 
          onClick={() => setSelectedProduct(null)}
          className="absolute top-6 right-6 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-3/5 bg-zinc-950 relative overflow-hidden group">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={product.image} 
            className="w-full h-full object-cover"
            alt={product.name} 
          />
          <div className="absolute bottom-8 left-8 flex gap-4">
             <div className="bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full flex items-center gap-2">
                <Leaf size={12} className="text-green-500" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Sustainable</span>
             </div>
             <div className="bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full flex items-center gap-2">
                <ShieldCheck size={12} className="text-blue-500" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Certified Original</span>
             </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">{product.category}</p>
          <h2 className="text-4xl font-serif mb-4">{product.name}</h2>
          <p className="text-2xl font-serif text-gray-300 mb-8">${product.price}</p>
          
          {/* Custom Tabs */}
          <div className="flex gap-6 border-b border-white/10 mb-8">
            {['details', 'specs', 'story'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-[10px] uppercase tracking-widest font-bold transition-all relative ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="min-h-[200px]"
            >
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <p className="text-gray-400 leading-relaxed">{product.description}</p>
                  <div className="grid grid-cols-1 gap-3">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-xs text-gray-500 uppercase">Dimensions</span>
                    <span className="text-xs text-gray-200">Varies by sizing</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-xs text-gray-500 uppercase">Origin</span>
                    <span className="text-xs text-gray-200">Handcrafted in Italy</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-xs text-gray-500 uppercase">Material</span>
                    <span className="text-xs text-gray-200">High-Grade Composite</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-xs text-gray-500 uppercase">Serial No.</span>
                    <span className="text-xs text-gray-200 tracking-widest">NL-{product.id}00-24</span>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm leading-relaxed italic">
                    "The {product.name} was conceived during a mid-winter expedition to the Arctic Circle. Every line reflects the harsh beauty of the void, designed not just for use, but for contemplation."
                  </p>
                  <p className="text-xs text-gray-500">
                    Designed by Studio Noir Architecture.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 space-y-6">
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-white text-black py-5 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-3 group"
            >
              <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
              Add to Collection
            </button>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="text-center space-y-2">
                <Truck size={16} className="mx-auto text-gray-600" />
                <p className="text-[9px] uppercase tracking-tighter text-gray-500">48h Dispatch</p>
              </div>
              <div className="text-center space-y-2">
                <Box size={16} className="mx-auto text-gray-600" />
                <p className="text-[9px] uppercase tracking-tighter text-gray-500">Gift Wrapped</p>
              </div>
              <div className="text-center space-y-2">
                <Info size={16} className="mx-auto text-gray-600" />
                <p className="text-[9px] uppercase tracking-tighter text-gray-500">Privacy Care</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}