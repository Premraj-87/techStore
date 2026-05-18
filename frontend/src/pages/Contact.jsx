import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-white min-h-screen py-20 font-sans text-gray-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Contact Us</h1>
        <p className="text-gray-500 text-lg mb-12 max-w-2xl">
          Have a question about an order, a product, or just want to say hi? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                <textarea rows="5" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow resize-none" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white font-medium py-4 rounded-xl hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-10 p-4 md:p-12">
            <div className="flex items-start gap-4">
              <div className="bg-gray-50 p-4 rounded-full"><MapPin size={24} className="text-gray-900"/></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Office</h3>
                <p className="text-gray-500 leading-relaxed">123 Tech Boulevard<br/>Silicon Valley, CA 94043<br/>United States</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-gray-50 p-4 rounded-full"><Mail size={24} className="text-gray-900"/></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-500 leading-relaxed">support@techstore.com<br/>sales@techstore.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-gray-50 p-4 rounded-full"><Phone size={24} className="text-gray-900"/></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-500 leading-relaxed">+1 (555) 123-4567<br/>Mon - Fri, 9am - 5pm PST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
