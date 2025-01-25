import React from 'react';

const RiskDeclaration = ({ theme }) => {
  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 text-sm ${
      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
    }`}>
      <h4 className={`font-semibold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>Disclaimer</h4>
      
      <p className="mb-4">
        Neoma Capital facilitates access to opportunities in unlisted shares, Alternative Investment Funds (AIFs), and private boutique investments. We do not provide investment advice, portfolio management, or any recommendations regarding specific investment products.
      </p>
      
      <p className="mb-4">
        All investments carry inherent risks, and investors are encouraged to independently assess the suitability of any investment after conducting their own due diligence. We recommend consulting with financial, legal, or tax advisors before making any decisions.
      </p>
      
      <p className="mb-4">
        Neoma Capital's role is limited to providing a platform for facilitating transactions, and we are not liable for any financial outcomes arising from investment activities.
      </p>
    </div>
  );
};

export default RiskDeclaration;