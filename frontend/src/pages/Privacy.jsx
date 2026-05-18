import React from 'react';

const Privacy = () => {
  return (
    <div className="bg-white min-h-screen py-20 font-sans text-gray-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12 uppercase tracking-widest font-bold">Last Updated: October 2024</p>
        
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
          <p>At techStore, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our store.</p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Personal Information We Collect</h2>
          <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view.</p>

          <div className="bg-gray-50 p-8 rounded-[2rem] my-8">
             <h3 className="text-xl font-semibold text-gray-900 mt-0 mb-3">Order Information</h3>
             <p className="mb-0">When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.</p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How Do We Use Your Info?</h2>
          <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to communicate with you and screen our orders for potential risk or fraud.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Retention</h2>
          <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
