import React from "react";
import BasePageLayout from "./PageLayoutProps";
import { 
  Users, Clock, LineChart, Target, 
  Shield, BarChart, Wallet, Coins
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { InvestmentAnimation } from "./CommonComponents";

const MutualFunds = () => {
  const { theme } = useTheme();

  const MainInfoSection = () => {
    const facts = [
      {
        title: "Power of SIP",
        description: "A modest SIP of ₹1,800 per month grew to an astounding ₹8 crore over 20 years through disciplined investing."
      },
      {
        title: "Wealth Creation",
        description: "₹20,000 monthly investment in select equity mutual funds could turn into ₹1 crore in just 10 years."
      },
      {
        title: "Tax Benefits",
        description: "ELSS funds offer tax deductions under Section 80C of the Income Tax Act while providing market returns."
      },
      {
        title: "High Performance Success",
        description: "Select mutual funds have delivered impressive annualized returns exceeding 20% through strategic portfolio management."
      },
      {
        title: "SIP Success Story",
        description: "A dedicated investor's journey: Monthly SIP of ₹1,800 transformed into ₹8 crore over a 20-year investment period."
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="mt-24">
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              What Are Mutual Funds?
            </h2>
            <div>
              <p className={`mb-4 text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Mutual funds are investment tools that gather funds from numerous investors to build 
                a diversified portfolio consisting of stocks, bonds, or other securities.
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Managed by professional fund managers, these funds cater to various risk profiles 
                and investment goals, making them an accessible option for individuals looking to 
                grow their wealth without needing extensive market knowledge.
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
        Icon: Users,
        title: "Beginners",
        description: "Those looking to enter the investment world without extensive knowledge"
      },
      {
        Icon: Clock,
        title: "Busy Individuals",
        description: "People with limited time or expertise to manage investments actively"
      },
      {
        Icon: LineChart,
        title: "Diversification Seekers",
        description: "Investors looking for a diversified portfolio managed by professionals"
      },
      {
        Icon: Target,
        title: "Goal-Oriented Investors",
        description: "Individuals with specific objectives like tax saving or wealth accumulation"
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
        Icon: Shield,
        title: "Professional Management",
        description: "Expert fund managers handling your investments"
      },
      {
        Icon: BarChart,
        title: "Diversification",
        description: "Spread risk across multiple securities and sectors"
      },
      {
        Icon: Wallet,
        title: "Accessibility",
        description: "Start investing with as little as ₹500 per month"
      },
      {
        Icon: Coins,
        title: "Tax Benefits",
        description: "ELSS funds offer tax deductions under Section 80C"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
          Why Consider Mutual Funds?
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
      title={<>Discover <span className="text-blue-500">Mutual Funds</span></>}
      subtitle="Your path to professional investment management and wealth creation"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        <MainInfoSection />,
        <InvestorTypesSection />,
        <BenefitsSection />
      ]}
      ctaTitle="Ready to Start Your Investment Journey?"
      ctaDescription="Join millions of investors who have discovered the power of mutual funds. Start your journey towards systematic wealth creation today."
    />
  );
};

export default MutualFunds;