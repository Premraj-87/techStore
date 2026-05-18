import React from 'react';

const Terms = () => {
  return (
    <div className="bg-white min-h-screen py-20 font-sans text-gray-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Terms & Conditions</h1>
        <p className="text-sm text-gray-400 mb-12 uppercase tracking-widest font-bold">Last Updated: October 2024</p>
        
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
          <p>Please read these terms and conditions carefully before using our service.</p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using the techStore website, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Products and Pricing</h2>
          <p>All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Accuracy of Information</h2>
          <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
