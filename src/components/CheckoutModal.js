import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { ShopContext } from '../App';

export default function CheckoutModal() {
  const { setIsCheckoutOpen, cartTotal, cart } = useContext(ShopContext);
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(s => s + 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsCheckoutOpen(false)} />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden"
      >
        <button 
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-6 right-6 text-gray-500 hover:text-white"
        >
          <X size={24} />
        </button>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-serif">Shipping Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm focus:border-white transition-colors outline-none" />
                <input placeholder="Last Name" className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm focus:border-white transition-colors outline-none" />
                <input placeholder="Email" className="col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl text-sm focus:border-white transition-colors outline-none" />
                <input placeholder="Address" className="col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl text-sm focus:border-white transition-colors outline-none" />
              </div>
              <button onClick={nextStep} className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest">
                Continue to Payment
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-serif">Payment</h2>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Secure Card Checkout</p>
                    <p className="text-xs text-gray-500">Encrypted by Stripe</p>
                  </div>
                </div>
                <Shield size={20} className="text-green-500" />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Items ({cart.length})</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-500 uppercase text-xs font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <span className="text-xl font-serif">Total Due</span>
                  <span className="text-xl font-serif font-bold">${cartTotal}</span>
                </div>
              </div>

              <button onClick={nextStep} className="w-full bg-blue-600 text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors">
                Authorize Payment
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-serif">Order Confirmed</h2>
              <p className="text-gray-400">Your objects are being prepared for dispatch. <br />A confirmation email has been sent.</p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-block px-12 py-4 border border-white/20 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
              >
                Return Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}