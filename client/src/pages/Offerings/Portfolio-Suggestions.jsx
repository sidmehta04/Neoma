import React from "react";
import BasePageLayout from "./PageLayoutProps";
import { 
  BarChart2, ShieldCheck, Clock, Compass,
  Users, Target, Scale
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { InvestmentAnimation } from "./CommonComponents";

const PortfolioSuggestions = () => {
  const { theme } = useTheme();

  const MainInfoSection = () => {
    const facts = [
      {
        title: "Diversification Benefits",
        description: "Effectively diversified portfolios achieved returns up to 2-3% higher than concentrated investments."
      },
      {
        title: "SIP Success",
        description: "Disciplined SIP investments have led to substantial wealth creation with returns exceeding 15% annually."
      },
      {
        title: "Tax Efficiency",
        description: "Professional portfolio management incorporates tax-efficient strategies to enhance overall returns."
      },
      {
        title: "Benchmark Excellence",
        description: "Our professional portfolio managers have consistently outperformed benchmark indices through strategic investment decisions."
      },
      {
        title: "Proven Wealth Creation",
        description: "Systematic investment approach has helped investors achieve returns exceeding 15% annually through disciplined portfolio management."
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="mt-24">
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              What Are Portfolio Suggestions?
            </h2>
            <div>
              <p className={`mb-4 text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Portfolio management is a personalized service that evaluates your current investments 
                and provides expert recommendations to optimize your portfolio. This service helps you 
                make informed decisions about what to buy, sell, or hold.
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Based on market trends and your individual financial goals, our experts provide 
                tailored suggestions to help you achieve better returns while managing risk effectively.
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
        Icon: Compass,
        title: "Uncertain Investors",
        description: "Individuals seeking guidance on portfolio performance optimization"
      },
      {
        Icon: Users,
        title: "Professional Guidance Seekers",
        description: "Those looking for expert advice to maximize investment returns"
      },
      {
        Icon: Target,
        title: "Goal-Oriented Investors",
        description: "People wanting to adapt investments to market trends and objectives"
      },
      {
        Icon: Scale,
        title: "All Levels of Investors",
        description: "Both beginners and seasoned investors seeking data-driven insights"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
          Who Should Consider Portfolio Management?
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
        Icon: BarChart2,
        title: "Expert Analysis",
        description: "Benefit from experienced professionals analyzing market conditions"
      },
      {
        Icon: ShieldCheck,
        title: "Risk Management",
        description: "Diversification strategies to mitigate market volatility"
      },
      {
        Icon: Compass,
        title: "Tailored Strategies",
        description: "Personalized investment plans aligned with your goals"
      },
      {
        Icon: Clock,
        title: "Continuous Monitoring",
        description: "Regular portfolio assessment to maintain alignment with objectives"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
          Why Consider Portfolio Management?
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
      title={<>Portfolio <span className="text-blue-500">Suggestions</span></>}
      subtitle="Expert guidance for optimizing your investment portfolio"
      heroAnimation={<InvestmentAnimation/>}
      sections={[
        <MainInfoSection />,
        <InvestorTypesSection />,
        <BenefitsSection />
      ]}
      ctaTitle="Ready to Optimize Your Portfolio?"
      ctaDescription="Join investors who have transformed their portfolios with expert guidance. Get personalized suggestions to maximize your investment returns today."
    />
  );
};

export default PortfolioSuggestions;