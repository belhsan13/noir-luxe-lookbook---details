import React, { useContext, useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { ShopContext } from '../App';
import { clsx } from 'clsx';

export default function Navbar() {
  const { cart, setIsCartOpen, searchQuery, setSearchQuery, view, setView } = useContext(ShopContext);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', action: () => setView('shop') },
    { name: 'Lookbook', action: () => setView('lookbook') },
    { name: 'The Journal', action: () => {} },
    { name: 'Bespoke', action: () => {} },
  ];

  return (
    <nav className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 md:px-12 py-5 flex items-center justify-between",
      scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="flex items-center gap-12">
        <h1 
          onClick={() => setView('shop')}
          className="text-2xl font-serif tracking-tighter font-bold cursor-pointer hover:opacity-70 transition-opacity"
        >
          NOIR
        </h1>
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
          {navLinks.map(link => (
            <button 
              key={link.name} 
              onClick={link.action}
              className={clsx(
                "hover:text-white transition-colors",
                view === link.name.toLowerCase() ? "text-white" : "text-gray-500"
              )}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search objects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-white/20 w-48 lg:w-64 transition-all"
          />
        </div>
        
        <button className="hover:text-gray-400 transition-colors hidden sm:block">
          <User size={18} />
        </button>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative group flex items-center gap-2"
        >
          <ShoppingBag size={20} className="group-hover:text-white transition-colors" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden hover:text-white transition-colors p-2"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-black z-40 p-8 flex flex-col gap-8 md:hidden">
          {navLinks.map(link => (
            <button 
              key={link.name}
              onClick={() => { link.action(); setIsMobileMenuOpen(false); }}
              className="text-4xl font-serif text-left border-b border-white/5 pb-4"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}