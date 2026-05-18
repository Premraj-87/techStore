import React from 'react';

const About = () => {
  return (
    <div className="bg-white min-h-screen py-20 font-sans text-gray-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8">About Us</h1>
        
        <div className="aspect-[21/9] bg-gray-50 rounded-[2rem] overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover mix-blend-multiply" />
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
          <p className="text-xl text-gray-900 font-medium">
            We believe that technology should seamlessly integrate into your life, enhancing your capabilities without complicating your routine.
          </p>
          <p>
            Founded in 2024, techStore was born out of a desire to curate the most exceptional digital accessories and gadgets in one place. We recognized that the modern consumer doesn't just want functional tools; they want beautifully designed objects that they are proud to use every day.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Our Mission</h2>
          <p>
            Our mission is simple: to provide high-quality, beautifully designed technology products that empower our customers to work smarter and live better. We carefully select every item in our inventory, ensuring it meets our rigorous standards for performance, durability, and aesthetics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
