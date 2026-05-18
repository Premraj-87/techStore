import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products', {
          params: { category: categoryName, limit: 100 },
        });
        setProducts(Array.isArray(data) ? data : data.products || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  // Filter products by category (case-insensitive)
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName?.toLowerCase()
  );

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 py-12 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <nav className="flex text-sm text-gray-500 mb-4 gap-2">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium capitalize">{categoryName}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight capitalize">
            {categoryName}
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl">
            Explore our curated selection of premium {categoryName?.toLowerCase()} to elevate your daily digital lifestyle.
          </p>
        </div>

        {/* Product Grid */}
        {categoryProducts.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 rounded-[2rem]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-500">We couldn't find any items in this category.</p>
            <Link to="/" className="inline-block mt-6 px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
              Return Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map(product => (
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

export default Category;
