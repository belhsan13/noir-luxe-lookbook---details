import React, { useState, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import Lookbook from './components/Lookbook';
import { products } from './data/products';

export const ShopContext = createContext();

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState('shop'); // 'shop' | 'lookbook'

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <ShopContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, cartTotal, 
      isCartOpen, setIsCartOpen, 
      selectedProduct, setSelectedProduct, 
      isCheckoutOpen, setIsCheckoutOpen,
      searchQuery, setSearchQuery,
      category, setCategory,
      view, setView
    }}>
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-gold-500 selection:text-black">
        <Navbar />
        
        <main className="pt-20">
          <AnimatePresence mode="wait">
            {view === 'shop' ? (
              <motion.div
                key="shop-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Hero />
                <ProductGrid />
              </motion.div>
            ) : (
              <motion.div
                key="lookbook-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Lookbook />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {isCartOpen && <CartDrawer />}
          {selectedProduct && <ProductModal product={selectedProduct} />}
          {isCheckoutOpen && <CheckoutModal />}
        </AnimatePresence>

        <footer className="py-20 border-t border-white/10 text-center">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-16">
            <div>
              <h4 className="font-serif text-xl mb-4">Noir Luxe</h4>
              <p className="text-gray-500 text-sm leading-relaxed">The vanguard of quiet luxury. Crafting timeless objects for those who appreciate the poetry of minimalism.</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white mb-6">Concierge</h4>
              <ul className="text-gray-500 text-sm space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bespoke Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Lifetime Warranty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white mb-6">The Journal</h4>
              <p className="text-gray-500 text-sm mb-4">Receive updates on private collections and seasonal lookbooks.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 px-4 py-2 text-sm flex-1 focus:outline-none" />
                <button className="text-xs uppercase tracking-widest font-bold">Join</button>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em]">© 2024 NOIR LUXE. CRAFTED FOR THE EXTRAORDINARY.</p>
        </footer>
      </div>
    </ShopContext.Provider>
  );
}