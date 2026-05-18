import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 pt-16 pb-8 rounded-t-3xl mt-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-800 pb-12">
          
          {/* Logo & Company */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6">techStore.</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              High-quality tech gadgets & accessories. We provide the best modern devices for your digital lifestyle.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/category/smartphones" className="hover:text-white transition-colors">Technology</Link></li>
              <li><Link to="/category/audio" className="hover:text-white transition-colors">Audio</Link></li>
              <li><Link to="/category/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/category/cases" className="hover:text-white transition-colors">Cases</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition-colors">Help & FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} techStore. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-[#151515] px-3 py-1.5 rounded-full border border-gray-800">
              <span>₹ INR</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
