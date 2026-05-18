import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(userInfo ? '/checkout' : '/login?redirect=/checkout');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is currently empty</h2>
            <p className="text-gray-500 mb-8">Before proceed to checkout you must add some products to your shopping cart. You will find a lot of interesting products on our "Shop" page.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30">
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Cart Items List */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-6 bg-gray-50 border-b border-gray-200 text-sm font-bold text-gray-500 uppercase tracking-widest">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-1 text-right"></div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center" key={item._id}>
                      {/* Product Image & Name */}
                      <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0 border border-gray-100">
                          <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{item.brand || 'TECHNO'}</p>
                          <Link to={`/product/${item._id}`} className="font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-1 sm:col-span-2 text-left sm:text-center font-bold text-gray-900">
                        <span className="sm:hidden text-gray-500 font-normal mr-2">Price:</span>
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-1 sm:col-span-3 flex items-center justify-start sm:justify-center">
                        <span className="sm:hidden text-gray-500 font-normal mr-2">Qty:</span>
                        <select
                          value={item.qty}
                          onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                          className="bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 font-semibold"
                        >
                          {[...Array(item.countInStock > 0 ? item.countInStock : 10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Remove Button */}
                      <div className="col-span-1 sm:col-span-1 text-right">
                        <button
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          onClick={() => removeFromCartHandler(item._id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-28">
                <h2 className="text-xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                    <span className="font-semibold text-gray-900">
                      ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-gray-900">
                      ₹{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * 0.15).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-extrabold text-gray-900">
                      ₹{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * 1.15).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                
                <button
                  className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-black/30"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <ShieldCheck size={16} className="text-green-500" />
                  <span>Secure Checkout Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
