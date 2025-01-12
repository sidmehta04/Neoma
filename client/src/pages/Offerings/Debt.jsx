import React from "react";
import BasePageLayout from "./PageLayoutProps";
import { 
  Shield, Banknote, Scale, Target, 
  Calculator, BarChart, Landmark
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { InvestmentAnimation } from "./CommonComponents";

const Bonds = () => {
  const { theme } = useTheme();

  const MainInfoSection = () => {
    const facts = [
      {
        title: "Government Security",
        description: "Indian government bonds are among the safest investments, backed by sovereign guarantee."
      },
      {
        title: "Market Growth",
        description: "Corporate bond issuances have reached over ₹6 lakh crores, offering diverse investment options."
      },
      {
        title: "Tax Benefits",
        description: "Tax-free bonds offer attractive interest rates without taxation on earned income."
      },
      {
        title: "Inflation Protection",
        description: "Long-term government bonds historically provide effective protection against inflation rates"
      },
      {
        title: "Fund Performance",
        description: "Bond mutual funds consistently deliver attractive returns while maintaining lower risk profiles"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="mt-24">
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              What Are Bonds?
            </h2>
            <div>
              <p className={`mb-4 text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Bonds are fixed-income securities that provide regular interest payments (coupon payments) 
                and return of principal at maturity. They offer a safer investment option compared to 
                stocks.
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Ideal for conservative investors, bonds provide capital safety and predictable income, 
                making them a cornerstone of balanced investment portfolios.
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
        Icon: Shield,
        title: "Risk-Averse Investors",
        description: "Individuals seeking stable returns without equity market volatility"
      },
      {
        Icon: Banknote,
        title: "Retirees",
        description: "Those looking for reliable regular income during retirement"
      },
      {
        Icon: Scale,
        title: "Portfolio Balancers",
        description: "Investors wanting to diversify with low-risk investments"
      },
      {
        Icon: Target,
        title: "Goal-Oriented Savers",
        description: "Those saving for specific goals with fixed timelines"
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
        Icon: Calculator,
        title: "Regular Income",
        description: "Consistent interest payments for steady cash flow"
      },
      {
        Icon: Shield,
        title: "Capital Preservation",
        description: "Lower volatility helping preserve invested capital"
      },
      {
        Icon: BarChart,
        title: "Diversification",
        description: "Reduce overall portfolio risk and enhance stability"
      },
      {
        Icon: Landmark,
        title: "Tax Benefits",
        description: "Tax-free options available for enhanced returns"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
          Why Consider Bonds?
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
      title={<>Fixed Income <span className="text-blue-500">Bonds</span></>}
      subtitle="Secure your wealth with stable returns and regular income"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        <MainInfoSection />,
        <InvestorTypesSection />,
        <BenefitsSection />
      ]}
      ctaTitle="Ready to Invest in Bonds?"
      ctaDescription="Join investors who value stability and regular income. Start your journey into fixed-income investments today and secure your financial future."
    />
  );
};

export default Bonds;