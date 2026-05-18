import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Headphones, Laptop, Plug, Shield } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const categoryTiles = [
  {
    title: 'Technology',
    category: 'technology',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop',
  },
  {
    title: 'Audio',
    category: 'audio',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop',
  },
  {
    title: 'Accessories',
    category: 'accessories',
    icon: Plug,
    image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&auto=format&fit=crop',
  },
  {
    title: 'Cases',
    category: 'cases',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=800&auto=format&fit=crop',
  },
];

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products', {
          params: { limit: 100 },
        });
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const topRated = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 4),
    [products]
  );

  const newest = useMemo(
    () => [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4),
    [products]
  );

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
            Curated browsing
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Explore</h1>
          <p className="text-gray-500 mt-4 max-w-2xl">
            Start with a category, jump into top-rated gear, or scan the newest arrivals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {categoryTiles.map((tile) => {
            const Icon = tile.icon;

            return (
              <Link
                key={tile.category}
                to={`/category/${tile.category}`}
                className="group bg-gray-50 rounded-[2rem] overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <Icon size={19} />
                    </span>
                    <span className="font-semibold text-lg">{tile.title}</span>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>

        {loading ? (
          <div className="py-24 text-center text-gray-500">Loading collections...</div>
        ) : error ? (
          <div className="py-24 text-center text-red-500">{error}</div>
        ) : (
          <>
            <section className="mb-16">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-semibold">Top Rated</h2>
                  <p className="text-gray-500 mt-2">Products customers keep coming back to.</p>
                </div>
                <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold border-b border-black pb-1">
                  View all <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {topRated.map((product) => (
                  <ProductCard key={product._id} product={product} showDiscount />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-semibold">Newest Arrivals</h2>
                  <p className="text-gray-500 mt-2">Freshly added products across the store.</p>
                </div>
                <Link to="/sale" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold border-b border-black pb-1">
                  See sale <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {newest.map((product) => (
                  <ProductCard key={product._id} product={product} showDiscount />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
