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
  Users, Clock, LineChart, Lightbulb, 
  Rocket, TrendingUp, ChartBar, Building
} from "lucide-react";

const GetStarted = () => {
  const facts = [
    {
      title: "Facebook & Paytm Success",
      description: "Many successful companies started as private entities, offering substantial returns to early investors after going public."
    },
    {
      title: "Unique Sectors",
      description: "Access sectors not represented in public markets, like innovative startups in technology or healthcare."
    }
  ];

  const successStories = [
    {
      title: "Tata Technologies",
      description: "Share price soared from ₹172.5 to ₹1,400 on first trading day, delivering 711% returns",
      highlight: "711% Return"
    },
    {
      title: "Nazara Technologies",
      description: "Debuted at ₹1,981, an 81% increase from issue price of ₹1,101",
      highlight: "81% Day-1 Gain"
    }
  ];

  const investorTypes = [
    {
      icon: Users,
      title: "High-Net-Worth Individuals",
      description: "HNIs and Institutional Investors seeking exclusive opportunities"
    },
    {
      icon: Clock,
      title: "Long-Term Investors",
      description: "Looking for capital appreciation over extended periods"
    },
    {
      icon: LineChart,
      title: "Risk-Tolerant Individuals",
      description: "Comfortable with moderate-to-high risk and longer holding periods"
    },
    {
      icon: Lightbulb,
      title: "Sector Enthusiasts",
      description: "Interested in niche industries underrepresented in public markets"
    }
  ];

  const benefits = [
    {
      icon: Rocket,
      title: "Early-Stage Access",
      description: "Get in on the ground floor of promising companies"
    },
    {
      icon: TrendingUp,
      title: "Higher Return Potential",
      description: "Greater capital appreciation compared to listed shares"
    },
    {
      icon: ChartBar,
      title: "Portfolio Diversification",
      description: "Reduce risk through exposure to different sectors"
    },
    {
      icon: Building,
      title: "Support Innovation",
      description: "Fuel entrepreneurship and economic growth"
    }
  ];

  // What Are Unlisted Shares Section
  const WhatAreUnlistedSharesSection = (
    <ResponsiveSection
      title="What Are Unlisted Shares?"
      spacing="normal"
    >
      <ResponsiveGrid columns={2}>
        <ResponsiveText>
          <p className="mb-4">
            Unlisted shares are equity in companies that are not publicly traded on stock exchanges. 
            This unique investment avenue allows you to tap into promising businesses before they make 
            their debut on the market.
          </p>
          <p>
            From innovative startups to established enterprises, unlisted shares encompass a diverse 
            range of industries, offering a chance to invest in the next big success story.
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
      title="Who Should Invest?"
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
      title="Why Consider Unlisted Shares?"
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
          Unlisted shares provide an exciting opportunity for investors looking to diversify their 
          portfolios and engage with companies at various stages of development. This investment avenue 
          offers unique advantages such as early access to promising companies, potential for higher 
          returns, and portfolio diversification benefits.
        </p>
        <p>
          Whether you're an experienced investor or just starting your investment journey, unlisted 
          shares can be a valuable addition to your investment strategy. Our team is here to help you 
          navigate this unique investment landscape and make informed decisions aligned with your 
          financial goals.
        </p>
      </ResponsiveText>
    </ResponsiveSection>
  );

  return (
    <BasePageLayout 
      title={<>Discover <span className="text-blue-500">Unlisted Shares</span></>}
      subtitle="Your gateway to exclusive pre-market investment opportunities"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        WhatAreUnlistedSharesSection,
        SuccessStoriesSection,
        InvestorTypesSection,
        BenefitsSection
      ]}
      ctaTitle="Ready to Start Your Investment Journey?"
      ctaDescription="Join thousands of investors who have already discovered the potential of unlisted shares. Start your journey towards financial growth today."
      summaryContent={SummaryContent}
    />
  );
};

export default GetStarted;