import React from "react";
import BasePageLayout from "./PageLayoutProps";
import { 
  Diamond, Crown, Clock, Target, 
  Star, BarChart, Building, Lightbulb
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { InvestmentAnimation } from "./CommonComponents";

const PrivateBoutique = () => {
  const { theme } = useTheme();

  const MainInfoSection = () => {
    const facts = [
      {
        title: "Sachin's Success",
        description: "Cricket legend Sachin Tendulkar's ₹5 crore investment in Azad Engineering grew to ₹72.59 crore, with shares trading above ₹1,500."
      },
      {
        title: "Avenue Supermarts Growth",
        description: "Pre-IPO shares offered at ₹299 saw substantial gains post-IPO, delivering exceptional returns to early investors."
      },
      {
        title: "Celebrity Investments",
        description: "Cricketers Rahul Dravid and Zaheer Khan invested in Swiggy's pre-IPO shares, showing growing interest in tech startups."
      },
      {
        title: "Apple's Early Days",
        description: "Mike Marrkula's $250,000 investment for 30% stake grew to $203 million after IPO, delivering 812x returns"
      },
      {
        title: "ICICI Prudential Success",
        description: "₹1 lakh pre-IPO investment grew to ₹2.3 lakh after listing, showing 130% growth in value"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="mt-24">
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              What Is Private Boutique?
            </h2>
            <div>
              <p className={`mb-4 text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Private Boutique provides exclusive access to shares of companies planning to go public soon. 
                This unique service allows you to invest in pre-IPO opportunities and potentially benefit 
                from significant price appreciation once the company is officially listed.
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                By investing before the IPO, you position yourself for potential listing gains and long-term 
                growth as these companies transition from private to public markets.
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
        Icon: Diamond,
        title: "Sophisticated Investors",
        description: "Those who understand the risks and rewards of pre-IPO investments"
      },
      {
        Icon: Crown,
        title: "High-Net-Worth Individuals",
        description: "Investors seeking high-growth opportunities with substantial returns"
      },
      {
        Icon: Clock,
        title: "Long-Term Investors",
        description: "Those with capacity to invest for extended periods without immediate liquidity needs"
      },
      {
        Icon: Target,
        title: "Risk-Tolerant Investors",
        description: "Those willing to take higher risks for early access to potentially high-performing companies"
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
        Icon: Star,
        title: "Early Access",
        description: "Get in before the company goes public and potentially benefit from listing gains"
      },
      {
        Icon: BarChart,
        title: "High Growth Potential",
        description: "Opportunity for substantial returns through pre-IPO investments"
      },
      {
        Icon: Building,
        title: "Portfolio Diversification",
        description: "Access unique investment opportunities not available in public markets"
      },
      {
        Icon: Lightbulb,
        title: "Strategic Positioning",
        description: "Be among the first to invest in promising companies before they go public"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
          Why Consider Private Boutique?
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
      title={<>Private <span className="text-blue-500">Boutique</span></>}
      subtitle="Access exclusive pre-IPO opportunities and invest in tomorrow's market leaders"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        <MainInfoSection />,
        <InvestorTypesSection />,
        <BenefitsSection />
      ]}
      ctaTitle="Ready to Access Pre-IPO Opportunities?"
      ctaDescription="Join sophisticated investors who have already discovered the potential of pre-IPO investments. Start your journey into exclusive investment opportunities today."
    />
  );
};

export default PrivateBoutique;