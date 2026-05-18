import React, { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const categories = ['all', 'technology', 'audio', 'accessories', 'cases'];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');

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

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesKeyword =
          !normalizedKeyword ||
          product.name.toLowerCase().includes(normalizedKeyword) ||
          product.brand.toLowerCase().includes(normalizedKeyword) ||
          product.description.toLowerCase().includes(normalizedKeyword);

        return matchesCategory && matchesKeyword;
      })
      .sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price;
        if (sort === 'price-high') return b.price - a.price;
        if (sort === 'rating') return b.rating - a.rating;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [category, keyword, products, sort]);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
              Product catalog
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Shop</h1>
            <p className="text-gray-500 mt-4 max-w-2xl">
              Browse every device, audio product, case, and everyday tech accessory in one place.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
            <SlidersHorizontal size={18} />
            {filteredProducts.length} products
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search products or brands"
              className="w-full h-12 bg-gray-50 border border-gray-200 rounded-full pl-11 pr-4 text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-12 bg-gray-50 border border-gray-200 rounded-full px-5 text-sm font-medium focus:outline-none focus:border-gray-900"
          >
            <option value="newest">Newest</option>
            <option value="rating">Top rated</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2.5 rounded-full border text-sm font-semibold capitalize whitespace-nowrap transition-colors ${
                category === item
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-24 text-center text-gray-500">Loading products...</div>
        ) : error ? (
          <div className="py-24 text-center text-red-500">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center bg-gray-50 rounded-[2rem]">
            <h2 className="text-2xl font-semibold mb-2">No products found</h2>
            <p className="text-gray-500">Try another search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} showDiscount />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
