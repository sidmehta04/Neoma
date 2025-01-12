import React from "react";
import { Link } from "react-router-dom";
import BasePageLayout from "./PageLayoutProps";
import { 
  Users, Clock, LineChart, Lightbulb, 
  Rocket, TrendingUp, BarChart, Building,
  ArrowRight
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { InvestmentAnimation } from "./CommonComponents";

const GetStarted = () => {
  const { theme } = useTheme();

  const MainInfoSection = () => {
    const facts = [
      {
        title: "Facebook & Paytm Success",
        description: "Many successful companies started as private entities, offering substantial returns to early investors after going public."
      },
      {
        title: "Unique Sectors",
        description: "Access sectors not represented in public markets, like innovative startups in technology or healthcare."
      },
      {
        title: "Tata Technologies Success",
        description: "Share price soared from ₹172.5 to ₹1,400 on first trading day, delivering phenomenal 711% returns to early investors"
      },
      {
        title: "Nazara Technologies Growth",
        description: "Strong market debut at ₹1,981, representing an impressive 81% increase from the issue price of ₹1,101"
      }
    ];

    return (
      <>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="mt-24">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
                What Are Unlisted Shares?
              </h2>
              <div>
                <p className={`mb-4 text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Unlisted shares are equity in companies that are not publicly traded on stock exchanges. 
                  This unique investment avenue allows you to tap into promising businesses before they make 
                  their debut on the market.
                </p>
                <p className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  From innovative startups to established enterprises, unlisted shares encompass a diverse 
                  range of industries, offering a chance to invest in the next big success story.
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

        {/* Navigation Button */}
        <div className="flex justify-center mt-12">
          <Link 
            to="/#shares-section"
            className={`inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg
              transform transition-all hover:scale-105 hover:shadow-lg
              ${theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/#shares-section';
              setTimeout(() => {
                const sharesSection = document.getElementById('shares-section');
                if (sharesSection) {
                  sharesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
          >
            View All Shares
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </>
    );
  };

  const InvestorTypesSection = () => {
    const investorTypes = [
      {
        Icon: Users,
        title: "High-Net-Worth Individuals",
        description: "HNIs and Institutional Investors seeking exclusive opportunities"
      },
      {
        Icon: Clock,
        title: "Long-Term Investors",
        description: "Looking for capital appreciation over extended periods"
      },
      {
        Icon: LineChart,
        title: "Risk-Tolerant Individuals",
        description: "Comfortable with moderate-to-high risk and longer holding periods"
      },
      {
        Icon: Lightbulb,
        title: "Sector Enthusiasts",
        description: "Interested in niche industries underrepresented in public markets"
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
        title: "Early-Stage Access",
        description: "Get in on the ground floor of promising companies"
      },
      {
        Icon: TrendingUp,
        title: "Higher Return Potential",
        description: "Greater capital appreciation compared to listed shares"
      },
      {
        Icon: BarChart,
        title: "Portfolio Diversification",
        description: "Reduce risk through exposure to different sectors"
      },
      {
        Icon: Building,
        title: "Support Innovation",
        description: "Fuel entrepreneurship and economic growth"
      }
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
          Why Consider Unlisted Shares?
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
      title={<>Discover <span className="text-blue-500">Unlisted Shares</span></>}
      subtitle="Your gateway to exclusive pre-market investment opportunities"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        <MainInfoSection />,
        <InvestorTypesSection />,
        <BenefitsSection />
      ]}
      ctaTitle="Ready to Start Your Investment Journey?"
      ctaDescription="Join thousands of investors who have already discovered the potential of unlisted shares. Start your journey towards financial growth today."
    />
  );
};

export default GetStarted;