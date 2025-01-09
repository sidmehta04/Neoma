import React from 'react';

const RiskDeclaration = ({ theme }) => {
  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 text-sm ${
      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
    }`}>
      <h4 className={`font-semibold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>Declaration of Risk</h4>
      
      <p className="mb-4">
        Investment in securities market are subject to market risks. The valuation of securities may increase or decrease depending on various factors affecting capital markets such as price and volume volatility, interest rates, currency exchange rates, changes in regulatory and administrative policies of the Government or any other appropriate authority (including tax laws) or other political and economic developments. Consequently, our company does not guarantee any returns on investments.
      </p>
      
      <p className="mb-4">
        Past performance is not indicative of future results. The information provided on this platform is for general informational purposes only and should not be considered as investment advice. Investors should carefully consider their specific investment objectives, financial situation, and risk tolerance before making any investment decisions.
      </p>
      
      <p className="mb-2">
        By accessing and using our services, you acknowledge that:
      </p>
      
      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li>Your capital is at risk and you may lose part or all of your investment</li>
        <li>We do not provide personalized investment advice or recommendations</li>
        <li>You are responsible for conducting your own due diligence</li>
        <li>Market data may be delayed by 15-20 minutes unless specified</li>
      </ul>
      
      
    </div>
  );
};

export default RiskDeclaration;