import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/users', { name, email, password });
      dispatch(setCredentials(data));
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || err.error || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20 flex flex-col justify-center font-sans text-gray-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-md">
        
        <div className="bg-white rounded-4xl p-10 shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Create an account</h1>
            <p className="text-gray-500 text-sm">Sign up to purchase premium tech gear.</p>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium text-center">{error}</div>}

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" 
                placeholder="Jane Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" 
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" 
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" 
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors mt-6 disabled:bg-gray-400"
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-black font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Register;
