import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products', { params: { limit: 8 } });
        setProducts(Array.isArray(data) ? data : data.products || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { title: 'Technology', desc: 'Latest devices & smart gadgets for everyday use.', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&auto=format&fit=crop', link: '/category/technology' },
    { title: 'Audio', desc: 'Premium headphones, earbuds, and speakers.', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&auto=format&fit=crop', link: '/category/audio' },
    { title: 'Cases', desc: 'Durable and stylish protection for your devices.', image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&auto=format&fit=crop', link: '/category/cases' },
    { title: 'Accessories', desc: 'Chargers, stands, and essential tech add-ons.', image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&auto=format&fit=crop', link: '/category/accessories' },
  ];

  // Slice centralized products for display
  const exploreProducts = products.slice(0, 6);
  const latestProducts = products.slice(6, 8);

  return (
    <div className="w-full bg-white font-sans text-gray-900">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight mb-6">
              High-quality tech gadgets & accessories
            </h1>
            <p className="text-gray-500 text-lg mb-10 max-w-lg">
              Explore our wide selection of premium devices, smart accessories, and protective gear designed for the modern lifestyle.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/shop" className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-full transition-colors">
                Shop now
              </Link>
              <Link to="/explore" className="bg-white border border-gray-200 hover:border-gray-900 text-gray-900 font-medium px-8 py-4 rounded-full transition-colors">
                Explore
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-end">
            {/* Minimalist Phone Image */}
            <div className="relative w-full max-w-md aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden flex items-center justify-center p-8">
               <img 
                 src="https://images.unsplash.com/photo-1601593346740-925612772716?w=800&auto=format&fit=crop" 
                 alt="Premium Phone Case" 
                 className="w-full h-full object-cover mix-blend-multiply rounded-xl shadow-2xl"
               />
               {/* Abstract light streaks effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-gray-50 rounded-[2rem] p-8 md:p-12 flex flex-col sm:flex-row items-center sm:items-start justify-between group hover:bg-gray-100 transition-colors">
              <div className="max-w-[200px] mb-8 sm:mb-0">
                <h3 className="text-2xl font-semibold mb-3">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{cat.desc}</p>
                <Link to={cat.link} className="inline-flex items-center gap-2 text-sm font-semibold border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                  Explore <ArrowRight size={16} />
                </Link>
              </div>
              <div className="w-40 h-40 shrink-0">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Latest Products Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">Explore our latest products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {exploreProducts.map(product => (
            <Link to={`/product/${product._id}`} key={product._id} className="group block text-left">
              <div className="bg-gray-50 rounded-[2rem] p-10 mb-4 aspect-square flex items-center justify-center">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-2">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-gray-600 transition-colors">{product.name}</h3>
                <p className="text-gray-500">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Dark Promotional Banner */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="bg-[#111111] rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
           <div className="relative z-10 max-w-md text-center md:text-left mb-10 md:mb-0">
             <h2 className="text-3xl md:text-5xl font-semibold mb-8 leading-tight text-[#f3ba2f]">
               Only this week<br/> <span className="text-white">20% off!</span>
             </h2>
             <Link to="/sale" className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-gray-200 transition-colors inline-block">
               Shop now
             </Link>
           </div>
           
           <div className="relative z-10 w-full max-w-sm">
             <img 
               src="https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&auto=format&fit=crop" 
               alt="Promo Product" 
               className="w-full h-full object-contain mix-blend-screen scale-125"
             />
           </div>
           
           {/* Decorative background blob */}
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </section>

      {/* Latest Products Carousel */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold">Latest Products</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestProducts.map(product => (
            <div key={product._id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4">
              <Link to={`/product/${product._id}`} className="w-full sm:w-1/2 aspect-[4/3] bg-gray-50 rounded-[2rem] p-6 flex items-center justify-center group relative overflow-hidden">
                <button className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white rounded-full shadow-sm"><ChevronLeft size={16}/></button>
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white rounded-full shadow-sm"><ChevronRight size={16}/></button>
              </Link>
              <div className="w-full sm:w-1/2 text-left sm:pr-8">
                <Link to={`/product/${product._id}`} className="font-semibold text-xl mb-2 hover:underline block">{product.name}</Link>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.desc || product.description?.substring(0, 50) + '...'}</p>
                <p className="font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold mb-10 max-w-2xl mx-auto leading-tight">
            Subscribe to our email newsletter and get 20% off
          </h2>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 bg-white border border-gray-200 px-6 py-4 rounded-full text-center sm:text-left focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            <button className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-full transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* News / Articles Section */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold">Our article and news</h2>
          <Link to="/blog" className="text-sm font-semibold border-b border-black pb-1 hover:text-gray-600 transition-colors">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Article 1 */}
          <div className="group cursor-pointer">
            <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 bg-gray-50">
               <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop" alt="Laptop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <h3 className="font-semibold text-2xl mb-3 pr-8">Best accessories for your new laptop</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">Discover the essential add-ons that will maximize your productivity and protect your investment...</p>
            <span className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full inline-block">Read</span>
          </div>
          
          {/* Article 2 */}
          <div className="group cursor-pointer">
            <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 bg-gray-50">
               <img src="https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop" alt="Speaker" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <h3 className="font-semibold text-2xl mb-3 pr-8">How to pick the best smart speaker for your home?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">A comprehensive guide to choosing the right voice assistant and audio quality for your living space...</p>
            <span className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full inline-block">Read</span>
          </div>
        </div>
      </section>

      {/* Value Propositions / Features bar */}
      <section className="border-t border-gray-100 mt-10">
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-center md:justify-around items-center gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Truck size={32} strokeWidth={1} className="text-gray-400" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Free delivery</h4>
                <p className="text-xs text-gray-500 mt-1">On orders over ₹5000</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <RotateCcw size={32} strokeWidth={1} className="text-gray-400" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">30 days return</h4>
                <p className="text-xs text-gray-500 mt-1">Money back guarantee</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <ShieldCheck size={32} strokeWidth={1} className="text-gray-400" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">1 year warranty</h4>
                <p className="text-xs text-gray-500 mt-1">On all electronics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
