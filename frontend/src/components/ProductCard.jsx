import React from 'react';
import { Link } from 'react-router-dom';

const formatPrice = (price) => `Rs. ${Number(price || 0).toLocaleString('en-IN')}`;

const getDiscountPercent = (product) => {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
};

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop';

const ProductCard = ({ product, showDiscount = false }) => {
  const discount = getDiscountPercent(product);
  const imageSrc = product.images?.[0] || PLACEHOLDER_IMAGE;

  return (
    <Link to={`/product/${product._id}`} className="group block text-left">
      <div className="relative bg-gray-50 rounded-[2rem] p-8 mb-4 aspect-square flex items-center justify-center overflow-hidden">
        {showDiscount && discount > 0 && (
          <span className="absolute left-4 top-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {discount}% off
          </span>
        )}
        <img
          src={imageSrc}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="px-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="font-semibold text-gray-900">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
