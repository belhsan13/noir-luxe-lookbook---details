import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { ShopContext } from '../App';
import { Plus, Eye } from 'lucide-react';

export default function ProductGrid() {
  const { searchQuery, category, setCategory, addToCart, setSelectedProduct } = useContext(ShopContext);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Timepieces', 'Fragrance', 'Apparel', 'Accessories', 'Tech'];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#050505]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-serif mb-2">Curated Objects</h2>
          <p className="text-gray-500">Handpicked luxury essentials for the discerning eye.</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-all ${category === cat ? 'bg-white text-black border-white' : 'border-white/10 text-gray-400 hover:border-white/40'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-4 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
              />
              <img 
                src={product.hoverImage} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700"
              />
              
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button 
                  onClick={() => addToCart(product)}
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Plus size={20} />
                </button>
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="w-12 h-12 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-white/20"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-medium text-gray-200 group-hover:text-white transition-colors">{product.name}</h3>
              </div>
              <span className="font-serif text-gray-400">${product.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}