import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { wishlistAPI } from '../services/api';
import { removeFromWishlist } from '../slices/wishlistSlice';
import { addToCart } from '../slices/cartSlice';
import { LoadingSpinner } from '../components/Loaders';
import { showSuccessToast, showErrorToast } from '../utils/toastNotifications';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const token = auth.token || auth.userInfo?.token;

  useEffect(() => {
    if (token) {
      fetchWishlist();
    } else {
      navigate('/login?redirect=/wishlist');
    }
  }, [token]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistAPI.getWishlist();
      setWishlistItems((response.data.products || []).filter((item) => item.product));
    } catch (error) {
      showErrorToast('Error fetching wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      setWishlistItems((prev) =>
        prev.filter((item) => item.product?._id !== productId)
      );
      dispatch(removeFromWishlist(productId));
      showSuccessToast('Removed from wishlist');
    } catch (error) {
      showErrorToast('Error removing from wishlist');
    }
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.images?.[0],
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      })
    );
    showSuccessToast('Added to cart');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <Heart className="text-red-500" size={32} fill="red" />
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto mb-4 text-gray-300" size={64} />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500">Add products to your wishlist to save them for later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <Link
                  to={`/product/${item.product._id}`}
                  className="relative block overflow-hidden bg-gray-100 h-48"
                >
                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="p-4">
                  <Link
                    to={`/product/${item.product._id}`}
                    className="font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-purple-600"
                  >
                    {item.product.name}
                  </Link>

                  <div className="mb-4">
                    <span className="text-xl font-bold text-purple-600">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item.product)}
                      className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
