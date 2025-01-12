import React from "react";
import { Link } from "react-router-dom";
import BasePageLayout from "./PageLayoutProps";
import { 
  Heart, Briefcase, Scale, Handshake,
  Rocket, Lightbulb, Network, BarChart,
  ArrowRight
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { InvestmentAnimation } from "./CommonComponents";

const AngelInvestment = () => {
  const { theme } = useTheme();

  const MainInfoSection = () => {
    const facts = [
      {
        title: "Ola's Success Story",
        description: "Angel investors like Anupam Mittal and Raghunandan G backed Ola early, helping it become a leading ride-hailing company."
      },
      {
        title: "Paytm's Growth",
        description: "Early angel funding helped Vijay Shekhar Sharma scale Paytm into a digital payments giant."
      },
      {
        title: "Tax Benefits",
        description: "Angel investors can benefit from tax exemptions under Section 54AA when investing in eligible startups."
      },
      {
        title: "Network Impact",
        description: "Indian Angel Network (IAN) demonstrates the power of collaborative investing, enabling investors to pool resources and expertise for maximum startup impact."
      },
      {
        title: "Digital Transformation Success",
        description: "Early angel investors in Paytm witnessed the company's meteoric rise to become India's leading digital payments platform, revolutionizing financial transactions."
      }
    ];

    return (
      <>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="mt-24">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
                What Is Angel Investment?
              </h2>
              <div>
                <p className={`mb-4 text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Angel investing involves funding startups or early-stage companies in exchange for equity. 
                  This form of investment provides essential capital to help businesses grow while offering 
                  investors the potential for high returns.
                </p>
                <p className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  As an angel investor, you become part of the entrepreneurial journey, supporting 
                  innovative ideas and helping transform promising startups into successful enterprises.
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


      </>
    );
  };

  const InvestorTypesSection = () => {
    const investorTypes = [
      {
        Icon: Heart,
        title: "Passionate Investors",
        description: "Individuals enthusiastic about innovation and entrepreneurship"
      },
      {
        Icon: Briefcase,
        title: "High-Net-Worth Individuals",
        description: "Those looking to diversify portfolios with high-growth potential"
      },
      {
        Icon: Scale,
        title: "Risk-Tolerant Investors",
        description: "Those willing to take higher risks for substantial rewards"
      },
      {
        Icon: Handshake,
        title: "Impact-Minded Investors",
        description: "People who want to make a difference by supporting new businesses"
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
        Icon: Rocket,
        title: "High Return Potential",
        description: "Successful startups can provide significant returns exceeding traditional investments"
      },
      {
        Icon: Lightbulb,
        title: "Mentorship Opportunities",
        description: "Leverage expertise and networks to guide startups to success"
      },
      {
        Icon: Network,
        title: "Access to Innovation",
        description: "Early access to groundbreaking ideas and technologies"
      },
      {
        Icon: BarChart,
        title: "Portfolio Diversification",
        description: "Add unique asset class to spread risk across different sectors"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
          Why Consider Angel Investment?
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
      title={<>Angel <span className="text-blue-500">Investment</span></>}
      subtitle="Support innovative startups and be part of the next big success story"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        <MainInfoSection />,
        <InvestorTypesSection />,
        <BenefitsSection />
      ]}
      ctaTitle="Ready to Become an Angel Investor?"
      ctaDescription="Join a community of visionary investors who are shaping the future by supporting innovative startups. Start your angel investing journey today."
    />
  );
};

export default AngelInvestment;