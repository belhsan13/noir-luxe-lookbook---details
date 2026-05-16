import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { ShopContext } from '../App';

export default function CartDrawer() {
  const { cart, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, setIsCheckoutOpen } = useContext(ShopContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
      onClick={() => setIsCartOpen(false)}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 p-8 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif flex items-center gap-3">
            <ShoppingBag size={24} />
            Bag
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <ShoppingBag size={24} />
              </div>
              <p>Your bag is currently empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-white text-xs uppercase tracking-[0.2em] underline underline-offset-8"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-24 h-24 bg-zinc-900 rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-600 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-gold-400"><Minus size={12} /></button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-gold-400"><Plus size={12} /></button>
                      </div>
                      <span className="text-sm font-serif text-gray-400">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex justify-between mb-4">
              <span className="text-gray-500 uppercase tracking-widest text-xs">Subtotal</span>
              <span className="text-xl font-serif font-bold">${cartTotal}</span>
            </div>
            <button 
              onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
              className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Secure Checkout
            </button>
            <p className="text-[10px] text-center text-gray-600 mt-4 tracking-wider">
              FREE EXPRESS SHIPPING ON ORDERS OVER $500
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}