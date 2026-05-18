import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../slices/wishlistSlice';
import { ShieldCheck, RotateCcw, Star, Minus, Plus, Heart } from 'lucide-react';
import axios from 'axios';
import { wishlistAPI } from '../services/api';
import { showErrorToast, showSuccessToast } from '../utils/toastNotifications';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = auth.token || auth.userInfo?.token;
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        const images = data.images?.length ? data.images : [PLACEHOLDER_IMAGE];
        setProduct({ ...data, images });
        setMainImage(images[0]);
        setQty(1);
        setActiveTab('description');
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!token) {
        setIsInWishlist(false);
        return;
      }

      try {
        const { data } = await wishlistAPI.checkWishlist(id);
        setIsInWishlist(data.inWishlist);
      } catch (error) {
        setIsInWishlist(false);
      }
    };

    checkWishlist();
  }, [id, token]);

  const addToCartHandler = () => {
    if(product) {
      dispatch(addToCart({ ...product, image: product.images[0], qty }));
      navigate('/cart');
    }
  };

  const wishlistHandler = async () => {
    if (!token) {
      navigate(`/login?redirect=/product/${id}`);
      return;
    }

    if (!product) return;

    try {
      setWishlistLoading(true);

      if (isInWishlist) {
        await wishlistAPI.removeFromWishlist(product._id);
        dispatch(removeFromWishlist(product._id));
        setIsInWishlist(false);
        showSuccessToast('Removed from wishlist');
      } else {
        await wishlistAPI.addToWishlist(product._id);
        dispatch(addToWishlist(product));
        setIsInWishlist(true);
        showSuccessToast('Added to wishlist');
      }
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Could not update wishlist');
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading product...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Product not found</div>;
  }

  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8 gap-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/category/laptops" className="hover:text-blue-600 transition-colors">Laptops</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="aspect-square bg-gray-50 rounded-2xl mb-6 flex items-center justify-center p-4">
                <img
                  src={mainImage}
                  alt={product.name}
                  onError={(event) => {
                    event.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-1">
                {product.images.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 shrink-0 rounded-2xl border-2 overflow-hidden bg-gray-50 ${mainImage === img ? 'border-black shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      onError={(event) => {
                        event.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
              <div className="mb-2 text-sm font-bold text-gray-500 uppercase tracking-widest">{product.brand}</div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{product.rating} ({product.numReviews} reviews)</span>
                <span className="text-gray-300">|</span>
                <span className={`text-sm font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-extrabold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">Free shipping on this item.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                {product.countInStock > 0 && (
                  <div className="flex items-center border border-gray-300 rounded-full bg-white h-14 w-36 overflow-hidden">
                    <button 
                      onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                      className="w-12 h-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="flex-1 text-center font-semibold text-lg">{qty}</span>
                    <button 
                      onClick={() => setQty(qty < product.countInStock ? qty + 1 : qty)}
                      className="w-12 h-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                )}
                
                <button 
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold h-14 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  Add to Cart
                </button>
                <button
                  onClick={wishlistHandler}
                  disabled={wishlistLoading}
                  className={`h-14 px-6 rounded-full border font-bold transition-colors flex items-center justify-center gap-2 ${
                    isInWishlist
                      ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                      : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                  {isInWishlist ? 'Saved' : 'Wishlist'}
                </button>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                  <ShieldCheck className="text-gray-900 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">2 Year Warranty</h4>
                    <p className="text-xs text-gray-500">Guaranteed protection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                  <RotateCcw className="text-gray-900 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">30 Day Returns</h4>
                    <p className="text-xs text-gray-500">No questions asked</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Detailed Tabs */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('description')}
              className={`flex-1 py-5 text-center font-bold text-sm tracking-widest uppercase transition-colors ${activeTab === 'description' ? 'text-gray-900 border-b-2 border-gray-900 bg-gray-50' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={`flex-1 py-5 text-center font-bold text-sm tracking-widest uppercase transition-colors ${activeTab === 'specs' ? 'text-gray-900 border-b-2 border-gray-900 bg-gray-50' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Specifications
            </button>
          </div>
          
          <div className="p-8 lg:p-12">
            {activeTab === 'description' ? (
              <div className="prose max-w-none text-gray-600 leading-loose">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Overview</h3>
                <p>{product.description}</p>
                <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio quis lacus finibus varius. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
              </div>
            ) : (
              <div className="max-w-3xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {product.specs.map((spec, index) => (
                    <div key={index} className={`flex px-6 py-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200 last:border-0`}>
                      <span className="w-1/3 font-semibold text-gray-900">{spec.label}</span>
                      <span className="w-2/3 text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
