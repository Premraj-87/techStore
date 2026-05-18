import React from 'react';

const Blog = () => {
  const posts = [
    { id: 1, title: 'Best accessories for your new laptop', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop', date: 'Oct 12, 2024' },
    { id: 2, title: 'How to pick the best smart speaker for your home?', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop', date: 'Oct 05, 2024' },
    { id: 3, title: 'The ultimate guide to mechanical keyboards', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop', date: 'Sep 28, 2024' },
    { id: 4, title: 'Is the Apple Watch Ultra worth it?', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop', date: 'Sep 15, 2024' },
  ];

  return (
    <div className="bg-white min-h-screen py-20 font-sans text-gray-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12">Latest News & Articles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {posts.map(post => (
            <div key={post.id} className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 bg-gray-50">
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">{post.date}</div>
              <h3 className="font-semibold text-2xl mb-4 pr-8 group-hover:text-gray-600 transition-colors">{post.title}</h3>
              <span className="bg-gray-100 text-gray-900 text-sm font-medium px-6 py-2.5 rounded-full inline-block group-hover:bg-black group-hover:text-white transition-colors">Read Article</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
