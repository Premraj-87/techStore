import React from 'react';
import { ArrowRight } from 'lucide-react';

const Careers = () => {
  const jobs = [
    { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'Remote / US' },
    { id: 2, title: 'Product Designer', department: 'Design', location: 'San Francisco, CA' },
    { id: 3, title: 'Customer Support Specialist', department: 'Operations', location: 'Remote / Global' },
    { id: 4, title: 'E-commerce Manager', department: 'Marketing', location: 'New York, NY' },
  ];

  return (
    <div className="bg-white min-h-screen py-20 font-sans text-gray-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Join Our Team</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Help us build the future of tech retail. We're looking for passionate individuals to join our growing team.
          </p>
        </div>

        <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12">
          <h2 className="text-2xl font-semibold mb-8">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer border border-gray-100 hover:border-black transition-colors">
                <div>
                  <h3 className="font-semibold text-xl mb-1 text-gray-900">{job.title}</h3>
                  <div className="flex gap-3 text-sm text-gray-500 font-medium">
                    <span>{job.department}</span>
                    <span>&bull;</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                  <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
