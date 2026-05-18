import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress, clearCartItems } from '../slices/cartSlice';
import { CheckCircle, ShieldCheck, CreditCard, Lock, Package } from 'lucide-react';
import { ordersAPI } from '../services/api';
import { showErrorToast, showSuccessToast } from '../utils/toastNotifications';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/checkout');
    }
  }, [navigate, userInfo]);

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const itemsPrice = Number(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  );
  const taxPrice = Number((itemsPrice * 0.15).toFixed(2));
  const shippingPrice = 0;
  const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const savedShippingAddress = { address, city, postalCode, country };
    dispatch(saveShippingAddress(savedShippingAddress));

    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image || item.images?.[0],
          price: item.price,
          product: item.product || item._id,
        })),
        shippingAddress: savedShippingAddress,
        paymentMethod: 'MockPayment',
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      const { data } = await ordersAPI.createOrder(orderPayload);
      setCreatedOrder(data);
      setIsPaid(true);
      dispatch(clearCartItems());
      showSuccessToast('Order placed successfully');
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Could not place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !isPaid) {
    navigate('/');
    return null;
  }

  if (isPaid) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden text-center p-10 border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Payment Successful!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for your order. Your mock payment has been processed successfully. We've sent a confirmation email with order details.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left border border-gray-100">
             <div className="flex items-center gap-3 text-sm text-gray-700 font-medium mb-2">
                <Package size={16} className="text-gray-900" /> Order ID: #{createdOrder?._id?.slice(-8)}
             </div>
             <div className="text-xs text-gray-500 ml-7">Estimated Delivery: 3-5 Business Days</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-black/30"
              onClick={() => navigate(`/order/${createdOrder?._id}`)}
            >
              View Order
            </button>
            <button
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 rounded-xl transition-colors border border-gray-200"
              onClick={() => navigate('/orders')}
            >
              My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
          <p className="text-gray-500 mt-2 flex items-center justify-center gap-2">
            <Lock size={16} /> Secure checkout
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Checkout Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-xs font-bold flex items-center justify-center">1</div>
                <h2 className="text-lg font-bold tracking-wide">Shipping Address</h2>
              </div>
              <div className="p-6 sm:p-8">
                <form id="checkout-form" onSubmit={submitHandler}>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block p-3.5 font-medium transition-all"
                      placeholder="123 Tech Boulevard"
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block p-3.5 font-medium transition-all"
                        placeholder="Silicon Valley"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block p-3.5 font-medium transition-all"
                        placeholder="94043"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block p-3.5 font-medium transition-all"
                      placeholder="United States"
                      value={country}
                      required
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-xs font-bold flex items-center justify-center">2</div>
                <h2 className="text-lg font-bold tracking-wide">Payment Method</h2>
              </div>
              <div className="p-6 sm:p-8">
                <div className="max-w-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-gray-900">Card</h3>
                      <p className="text-sm text-gray-500 mt-1">All transactions are encrypted and secure.</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 border border-green-100">
                      <Lock size={13} />
                      Secure
                    </span>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <label className="block text-xs font-bold text-gray-500 mb-2">Card number</label>
                      <div className="flex items-center gap-3">
                        <CreditCard size={20} className="text-gray-400 shrink-0" />
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="1234 1234 1234 1234"
                          className="w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        />
                        <div className="hidden sm:flex items-center gap-1">
                          <span className="rounded border border-gray-200 px-2 py-1 text-[10px] font-bold text-gray-500">VISA</span>
                          <span className="rounded border border-gray-200 px-2 py-1 text-[10px] font-bold text-gray-500">MC</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 border-b border-gray-200">
                      <div className="p-4 border-r border-gray-200">
                        <label className="block text-xs font-bold text-gray-500 mb-2">Expiration</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="MM / YY"
                          className="w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        />
                      </div>
                      <div className="p-4">
                        <label className="block text-xs font-bold text-gray-500 mb-2">CVC</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="CVC"
                          className="w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                      <label className="block text-xs font-bold text-gray-500 mb-2">Name on card</label>
                      <input
                        type="text"
                        placeholder="Full name"
                        className="w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                      />
                    </div>

                    <div className="p-4">
                      <label className="block text-xs font-bold text-gray-500 mb-2">Country or region</label>
                      <select className="w-full border-0 p-0 text-gray-900 bg-white focus:outline-none">
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-600">
                    <ShieldCheck size={18} className="text-green-600 shrink-0 mt-0.5" />
                    <span>This project uses a simulated payment after you click pay. No real card is charged.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-28">
                <h2 className="text-xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4 flex items-center justify-between">
                  Order Summary
                  <span className="bg-gray-100 text-gray-600 text-xs py-1 px-3 rounded-full">{cartItems.length} Items</span>
                </h2>
                
                {/* Mini Cart Items */}
                <div className="max-h-64 overflow-y-auto pr-2 space-y-4 mb-6 scrollbar-thin">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 border border-gray-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <div className="font-bold text-sm text-gray-900">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-6 border-t border-gray-100 pt-6">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₹{itemsPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Estimated Tax (15%)</span>
                    <span className="font-semibold text-gray-900">
                      ₹{taxPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-extrabold text-blue-600">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-gray-900/30"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CreditCard size={20} /> Pay ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </button>
                
                <div className="mt-6 flex flex-col items-center justify-center gap-2 text-xs text-gray-500 text-center">
                  <div className="flex gap-1 items-center text-green-600 font-semibold">
                     <ShieldCheck size={16} /> 256-bit Encrypted
                  </div>
                  Test payment only. No real card is charged.
                </div>
              </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
