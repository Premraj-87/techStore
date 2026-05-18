import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { question: 'What is your return policy?', answer: 'We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return.' },
    { question: 'Do you ship internationally?', answer: 'Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times will be calculated at checkout based on your location.' },
    { question: 'How long does shipping take?', answer: 'Domestic orders typically arrive within 3-5 business days. International orders can take between 7-14 business days depending on customs.' },
    { question: 'Are your products covered by a warranty?', answer: 'Absolutely. All electronics purchased from techStore come with a standard 1-year manufacturer warranty. You can also purchase extended protection plans at checkout.' },
    { question: 'How can I track my order?', answer: 'Once your order ships, you will receive an email containing a tracking number and a link to the carrier\'s website to monitor your delivery.' },
  ];

  return (
    <div className="bg-white min-h-screen py-20 font-sans text-gray-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-center">Help & FAQ</h1>
        <p className="text-gray-500 text-lg text-center mb-16">Find answers to the most common questions about our products and services.</p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-[2rem] overflow-hidden bg-gray-50">
              <button 
                className="w-full px-8 py-6 flex items-center justify-between text-left font-semibold text-lg hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(index === openIndex ? null : index)}
              >
                {faq.question}
                <ChevronDown className={`shrink-0 transition-transform ${index === openIndex ? 'rotate-180' : ''}`} />
              </button>
              {index === openIndex && (
                <div className="px-8 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
