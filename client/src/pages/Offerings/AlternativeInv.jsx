import React from "react";
import BasePageLayout from "./PageLayoutProps";
import { 
  Briefcase, Crown, Gem, Clock, 
  Building, Shield, Scale, Rocket
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { InvestmentAnimation } from "./CommonComponents";

const AlternativeInvestmentFunds = () => {
  const { theme } = useTheme();

  const MainInfoSection = () => {
    const facts = [
      {
        title: "Growing Interest",
        description: "Total commitments raised by AIFs in India exceeded ₹11.3 lakh crores as of March 2024."
      },
      {
        title: "High Returns",
        description: "Some private equity funds within AIF framework have reported annualized returns exceeding 20%."
      },
      {
        title: "Market Growth",
        description: "Ultra-high-net-worth individuals in India expected to rise by 58% over next five years."
      },
      {
        title: "Private Equity Performance",
        description: "PE funds within AIF framework consistently achieving high annualized returns of 20%+ through strategic investments"
      },
      {
        title: "Real Estate Opportunities",
        description: "AIFs successfully capitalizing on India's booming property market through strategic real estate investments"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="mt-24">
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              What Are Alternative Investment Funds?
            </h2>
            <div>
              <p className={`mb-4 text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Alternative Investment Funds (AIFs) are privately pooled investment vehicles that provide 
                exposure to non-traditional asset classes such as private equity, hedge funds, real estate, 
                and commodities.
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Designed for sophisticated investors, AIFs aim to generate higher returns by investing in 
                unique opportunities that are not typically available through traditional investment channels.
              </p>
            </div>
          </div>
          
          <div className={`p-8 rounded-xl backdrop-blur-md ${theme === 'dark' ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/90 border border-gray-200'}`}>
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              Did You Know?
            </h2>
            <div className="h-96 overflow-y-auto space-y-4 pr-4">
              {facts.map((fact, index) => (
                <div key={index} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
                    {fact.title}
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {fact.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const InvestorTypesSection = () => {
    const investorTypes = [
      {
        Icon: Briefcase,
        title: "Experienced Investors",
        description: "Looking to diversify beyond traditional asset classes"
      },
      {
        Icon: Crown,
        title: "HNIs and UHNIs",
        description: "High-risk appetite investors seeking substantial returns"
      },
      {
        Icon: Gem,
        title: "Niche Opportunity Seekers",
        description: "Those interested in unique investment opportunities"
      },
      {
        Icon: Clock,
        title: "Long-Term Investors",
        description: "Able to lock in capital for extended periods"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
          Who Should Invest?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {investorTypes.map(({ Icon, title, description }, index) => (
            <div key={index} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200'}`}>
              <Icon className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
                {title}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const BenefitsSection = () => {
    const benefits = [
      {
        Icon: Building,
        title: "Unique Assets",
        description: "Access alternative asset classes for enhanced diversification"
      },
      {
        Icon: Shield,
        title: "Professional Management",
        description: "Experienced professionals employing sophisticated strategies"
      },
      {
        Icon: Scale,
        title: "Regulatory Oversight",
        description: "SEBI-regulated for security and transparency"
      },
      {
        Icon: Rocket,
        title: "High Return Potential",
        description: "Target high-growth sectors for substantial appreciation"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
          Why Consider AIFs?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map(({ Icon, title, description }, index) => (
            <div key={index} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200'}`}>
              <Icon className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
                {title}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <BasePageLayout 
      title={<>Alternative <span className="text-blue-500">Investment Funds</span></>}
      subtitle="Access sophisticated investment strategies beyond traditional markets"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        <MainInfoSection />,
        <InvestorTypesSection />,
        <BenefitsSection />
      ]}
      ctaTitle="Ready to Explore Alternative Investments?"
      ctaDescription="Join sophisticated investors who are accessing unique investment opportunities through AIFs. Start your journey into alternative investments today."
    />
  );
};

export default AlternativeInvestmentFunds;