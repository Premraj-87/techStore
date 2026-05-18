import React from 'react';

const Shipping = () => {
  return (
    <div className="bg-white min-h-screen py-20 font-sans text-gray-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-12">Shipping & Returns</h1>
        
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
          <div className="bg-gray-50 p-8 rounded-[2rem] mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mt-0 mb-4">Domestic Shipping</h2>
            <p className="mb-0">We offer free standard shipping on all domestic orders over ₹5000. For orders under ₹5000, a flat rate of ₹500 applies. Standard shipping typically takes 3-5 business days. Expedited shipping options (2-day and overnight) are available at checkout for an additional fee.</p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">International Shipping</h2>
          <p>We ship internationally to most countries. Shipping costs are calculated dynamically at checkout based on package weight and destination. Please note that international customers are responsible for any customs duties, taxes, or import fees levied by their respective countries.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Our Return Policy</h2>
          <p>We want you to be completely satisfied with your purchase. If you are not happy with your item, you may return it within 30 days of receipt for a full refund or exchange. To be eligible for a return, your item must be unused, in the same condition that you received it, and in the original packaging.</p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">How to Return an Item</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Contact our support team at support@techstore.com with your order number.</li>
            <li>We will provide you with a prepaid return shipping label (for domestic returns).</li>
            <li>Pack the item securely and attach the label.</li>
            <li>Drop off the package at any authorized shipping location.</li>
          </ol>
          <p className="mt-6">Once we receive and inspect your return, we will process your refund within 5-7 business days to your original method of payment.</p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
