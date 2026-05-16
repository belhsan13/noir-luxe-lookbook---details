import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ShopContext } from '../App';
import { products } from '../data/products';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const looks = [
  {
    title: "Shadow Play",
    description: "An exploration of texture and depth. Featuring the Shadow Silk Robe and Ebon Essence.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    products: [2, 3]
  },
  {
    title: "Precision & Void",
    description: "The intersection of technical mastery and minimalist aesthetics. The Void Speaker meets the Onyx Chronograph.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    products: [1, 5]
  },
  {
    title: "The Modern Nomad",
    description: "Essentials for the journey. Lunar Leather Tote and Nocturnal Shades crafted for movement.",
    image: "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=1000&auto=format&fit=crop",
    products: [4, 6]
  }
];

export default function Lookbook() {
  const { setView, setSelectedProduct } = useContext(ShopContext);

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <button 
          onClick={() => setView('shop')}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Back to Shop
        </button>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-4">Volume I: 2024</p>
          <h1 className="text-6xl md:text-9xl font-serif tracking-tighter leading-tight">
            Monolith <br />
            <span className="italic text-gray-400">Collection</span>
          </h1>
        </motion.div>
      </section>

      {/* Editorial Content */}
      <div className="space-y-40 pb-40">
        {looks.map((look, index) => (
          <section key={look.title} className="px-6 md:px-12">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>
              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="w-full md:w-3/5 aspect-[3/4] overflow-hidden bg-zinc-900"
              >
                <img src={look.image} alt={look.title} className="w-full h-full object-cover" />
              </motion.div>

              <div className="w-full md:w-2/5 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-4xl font-serif mb-6">{look.title}</h2>
                  <p className="text-gray-400 leading-relaxed text-lg mb-8">{look.description}</p>
                  
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">Featured Objects</p>
                    {look.products.map(id => {
                      const product = products.find(p => p.id === id);
                      return (
                        <button 
                          key={id}
                          onClick={() => setSelectedProduct(product)}
                          className="flex items-center justify-between w-full p-4 border border-white/10 hover:border-white/30 transition-all group"
                        >
                          <span className="text-sm">{product.name}</span>
                          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="py-40 bg-zinc-900 text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Discover the Full Collection</h2>
          <button 
            onClick={() => setView('shop')}
            className="bg-white text-black px-12 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-gray-200 transition-all"
          >
            Return to Gallery
          </button>
        </motion.div>
      </section>
    </div>
  );
}