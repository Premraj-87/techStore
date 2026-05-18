import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User as UserIcon, LogOut, Heart, Package, Settings } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${keyword}`);
      setKeyword('');
      setIsMenuOpen(false);
    } else {
      navigate('/');
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="font-bold text-2xl tracking-tighter text-gray-900">techStore.</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/" className="text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors">Home</Link>
            <Link to="/category/technology" className="text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors">Technology</Link>
            <Link to="/category/audio" className="text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors">Audio</Link>
            <Link to="/category/accessories" className="text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors">Accessories</Link>
          </nav>

          {/* Search & Icons */}
          <div className="flex items-center gap-6">
            <form onSubmit={submitHandler} className="hidden sm:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 transition-all">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none focus:outline-none text-sm w-48"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit" className="text-gray-400 hover:text-gray-900 ml-2">
                <Search size={18} strokeWidth={2} />
              </button>
            </form>

            <div className="relative">
              {userInfo ? (
                <div 
                  className="flex items-center gap-2 cursor-pointer text-gray-900 hover:text-gray-500 transition-colors"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <UserIcon size={20} strokeWidth={1.5} />
                  <span className="hidden md:block text-sm font-semibold">{userInfo.name.split(' ')[0]}</span>
                </div>
              ) : (
                <Link to="/login" className="text-gray-900 hover:text-gray-500 transition-colors flex items-center gap-2">
                  <UserIcon size={20} strokeWidth={1.5} />
                  <span className="hidden md:block text-sm font-medium">Sign In</span>
                </Link>
              )}

              {/* User Dropdown */}
              {showDropdown && userInfo && (
                <div className="absolute right-0 mt-4 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{userInfo.name}</p>
                    <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                  </div>
                  
                  <Link 
                    to="/orders"
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Package size={16} /> My Orders
                  </Link>
                  
                  <Link 
                    to="/wishlist"
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Heart size={16} /> Wishlist
                  </Link>
                  
                  {userInfo.isAdmin && (
                    <Link 
                      to="/admin"
                      className="w-full text-left px-4 py-3 text-sm text-purple-600 hover:bg-purple-50 flex items-center gap-2 transition-colors border-t border-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Settings size={16} /> Admin Panel
                    </Link>
                  )}
                  
                  <button 
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2 transition-colors border-t border-gray-100"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative text-gray-900 hover:text-gray-500 transition-colors flex items-center">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white text-[0.6rem] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg pb-6">
          <div className="px-4 py-4">
             <form onSubmit={submitHandler} className="flex items-center bg-gray-50 rounded-full px-4 py-3 border border-gray-200">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit" className="text-gray-400">
                <Search size={18} strokeWidth={2} />
              </button>
            </form>
          </div>
          <div className="px-4 space-y-4 flex flex-col">
            <Link to="/" className="block py-2 text-gray-900 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/category/technology" className="block py-2 text-gray-900 font-medium" onClick={() => setIsMenuOpen(false)}>Technology</Link>
            <Link to="/category/audio" className="block py-2 text-gray-900 font-medium" onClick={() => setIsMenuOpen(false)}>Audio</Link>
            <Link to="/category/accessories" className="block py-2 text-gray-900 font-medium" onClick={() => setIsMenuOpen(false)}>Accessories</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
