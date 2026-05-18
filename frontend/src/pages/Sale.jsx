import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgePercent } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const getDiscount = (product) => {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
};

const Sale = () => {
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
        setError(err.response?.data?.message || 'Could not load sale products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const saleProducts = useMemo(
    () =>
      products
        .filter((product) => product.originalPrice && product.originalPrice > product.price)
        .sort((a, b) => getDiscount(b) - getDiscount(a)),
    [products]
  );

  const strongestDeal = saleProducts[0];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <section className="bg-[#111111] text-white rounded-[2rem] overflow-hidden mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[360px]">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#f3ba2f] font-bold text-sm uppercase tracking-widest mb-4">
                <BadgePercent size={18} />
                Limited offers
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-5">
                Sale
              </h1>
              <p className="text-white/70 max-w-lg">
                Save on selected phones, laptops, audio gear, cases, and accessories while stock lasts.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full mt-8 w-fit hover:bg-gray-200 transition-colors"
              >
                Browse all products <ArrowRight size={17} />
              </Link>
            </div>
            <div className="bg-white/5 flex items-center justify-center p-8">
              {strongestDeal ? (
                <img
                  src={strongestDeal.images?.[0]}
                  alt={strongestDeal.name}
                  className="max-h-80 w-full object-contain mix-blend-screen"
                />
              ) : (
                <div className="text-white/50">Loading deal...</div>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-semibold">Current Deals</h2>
            <p className="text-gray-500 mt-2">
              {saleProducts.length} discounted product{saleProducts.length !== 1 && 's'} available.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center text-gray-500">Loading sale products...</div>
        ) : error ? (
          <div className="py-24 text-center text-red-500">{error}</div>
        ) : saleProducts.length === 0 ? (
          <div className="py-24 text-center bg-gray-50 rounded-[2rem]">
            <h2 className="text-2xl font-semibold mb-2">No sale products right now</h2>
            <p className="text-gray-500 mb-6">The full catalog is still available.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold">
              Go to shop <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {saleProducts.map((product) => (
              <ProductCard key={product._id} product={product} showDiscount />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sale;
