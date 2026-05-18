import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const keyword = sp.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/products', {
          params: { keyword },
        });
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500 font-sans">Loading results...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 font-sans">{error}</div>;
  }

  return (
    <div className="bg-white min-h-screen py-12 md:py-24 font-sans text-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          Search Results
        </h1>
        <p className="text-gray-500 mb-12">
          {products.length} result{products.length !== 1 && 's'} found for "<span className="font-semibold text-gray-900">{keyword}</span>"
        </p>

        {products.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 rounded-[2rem]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No matching products</h2>
            <p className="text-gray-500">Try adjusting your search or browse our categories.</p>
            <Link to="/" className="inline-block mt-6 px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
              Return Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
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
        )}
      </div>
    </div>
  );
};

export default Search;
