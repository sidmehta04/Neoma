import React from "react";
import BasePageLayout from "./PageLayoutProps";
import ResponsiveSection, { ResponsiveGrid, ResponsiveText } from "./Responsivetext";
import { 
  RotatingHighlights, 
  FeatureCard, 
  InfoCard, 
  InvestmentAnimation 
} from "./CommonComponents";
import { 
  Compass, Users, Target, Scale,
  BarChart2, ShieldCheck, Clock
} from "lucide-react";

const PortfolioSuggestions = () => {
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
    }
  ];

  const successStories = [
    {
      title: "Benchmark Performance",
      description: "Professional portfolio managers consistently outperform benchmark indices",
      highlight: "Superior Returns"
    },
    {
      title: "Wealth Creation",
      description: "SIP investors see returns exceeding 15% annually through disciplined investing",
      highlight: "15%+ Annual Returns"
    }
  ];

  const investorTypes = [
    {
      icon: Compass,
      title: "Uncertain Investors",
      description: "Individuals seeking guidance on portfolio performance optimization"
    },
    {
      icon: Users,
      title: "Professional Guidance Seekers",
      description: "Those looking for expert advice to maximize investment returns"
    },
    {
      icon: Target,
      title: "Goal-Oriented Investors",
      description: "People wanting to adapt investments to market trends and objectives"
    },
    {
      icon: Scale,
      title: "All Levels of Investors",
      description: "Both beginners and seasoned investors seeking data-driven insights"
    }
  ];

  const benefits = [
    {
      icon: BarChart2,
      title: "Expert Analysis",
      description: "Benefit from experienced professionals analyzing market conditions"
    },
    {
      icon: ShieldCheck,
      title: "Risk Management",
      description: "Diversification strategies to mitigate market volatility"
    },
    {
      icon: Compass,
      title: "Tailored Strategies",
      description: "Personalized investment plans aligned with your goals"
    },
    {
      icon: Clock,
      title: "Continuous Monitoring",
      description: "Regular portfolio assessment to maintain alignment with objectives"
    }
  ];

  // What Is Portfolio Management Section
  const WhatIsPortfolioManagementSection = (
    <ResponsiveSection
      title="What Are Portfolio Suggestions?"
      spacing="normal"
    >
      <ResponsiveGrid columns={2}>
        <ResponsiveText>
          <p className="mb-4">
            Portfolio management is a personalized service that evaluates your current investments 
            and provides expert recommendations to optimize your portfolio. This service helps you 
            make informed decisions about what to buy, sell, or hold.
          </p>
          <p>
            Based on market trends and your individual financial goals, our experts provide 
            tailored suggestions to help you achieve better returns while managing risk effectively.
          </p>
        </ResponsiveText>
        
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Did You Know?</h3>
          <div className="space-y-4">
            {facts.map((fact, index) => (
              <InfoCard 
                key={index} 
                title={fact.title} 
                description={fact.description} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </ResponsiveGrid>
    </ResponsiveSection>
  );

  // Success Stories Section
  const SuccessStoriesSection = (
    <ResponsiveSection
      title="Success Stories"
      titleAlignment="center"
      spacing="loose"
    >
      <RotatingHighlights items={successStories} />
    </ResponsiveSection>
  );

  // Who Should Invest Section
  const InvestorTypesSection = (
    <ResponsiveSection
      title="Who Should Consider Portfolio Management?"
      titleAlignment="center"
      spacing="loose"
    >
      <ResponsiveGrid columns={2}>
        {investorTypes.map((type, index) => (
          <FeatureCard 
            key={index}
            {...type}
            className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-500"
            style={{ animationDelay: `${index * 200}ms` }}
          />
        ))}
      </ResponsiveGrid>
    </ResponsiveSection>
  );

  // Benefits Section
  const BenefitsSection = (
    <ResponsiveSection
      title="Why Consider Portfolio Management?"
      titleAlignment="center"
      spacing="loose"
    >
      <ResponsiveGrid columns={2}>
        {benefits.map((benefit, index) => (
          <FeatureCard 
            key={index}
            {...benefit}
            className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-500"
            style={{ animationDelay: `${index * 200}ms` }}
          />
        ))}
      </ResponsiveGrid>
    </ResponsiveSection>
  );

  // Summary Section Content
  const SummaryContent = (
    <ResponsiveSection spacing="normal">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
        In Summary
      </h2>
      <ResponsiveText>
        <p className="mb-4">
          Portfolio management services provide expert guidance to help you make informed investment 
          decisions. Through professional analysis, risk management, and personalized strategies, 
          we help you optimize your portfolio for better returns while managing risk effectively.
        </p>
        <p>
          Whether you're seeking professional guidance, unsure about your current investments, or 
          looking to adapt to changing market conditions, our team of experts is here to help you 
          achieve your financial goals through data-driven insights and continuous portfolio monitoring.
        </p>
      </ResponsiveText>
    </ResponsiveSection>
  );

  return (
    <BasePageLayout 
      title={<>Portfolio <span className="text-blue-500">Suggestions</span></>}
      subtitle="Expert guidance for optimizing your investment portfolio"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        WhatIsPortfolioManagementSection,
        SuccessStoriesSection,
        InvestorTypesSection,
        BenefitsSection
      ]}
      ctaTitle="Ready to Optimize Your Portfolio?"
      ctaDescription="Join investors who have transformed their portfolios with expert guidance. Get personalized suggestions to maximize your investment returns today."
      summaryContent={SummaryContent}
    />
  );
};

export default PortfolioSuggestions;