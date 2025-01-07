import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ shareName }) => {
  return (
    <div className="sticky top-0 z-50 bg-[#0B0F17] border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm md:text-base">
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Home
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-200">{shareName}</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;