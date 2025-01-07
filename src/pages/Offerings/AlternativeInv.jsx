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
  Briefcase, Crown, Gem, Clock, 
  Building, Shield, Scale, Rocket, 
  Info as InfoIcon
} from "lucide-react";

const AlternativeInvestmentFunds = () => {
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
    }
  ];

  const successStories = [
    {
      title: "Private Equity Success",
      description: "PE funds within AIF framework achieving high annualized returns",
      highlight: "20%+ Returns"
    },
    {
      title: "Real Estate Growth",
      description: "AIFs capitalizing on India's booming property market through strategic investments",
      highlight: "Strategic Growth"
    }
  ];

  const investorTypes = [
    {
      icon: Briefcase,
      title: "Experienced Investors",
      description: "Looking to diversify beyond traditional asset classes"
    },
    {
      icon: Crown,
      title: "HNIs and UHNIs",
      description: "High-risk appetite investors seeking substantial returns"
    },
    {
      icon: Gem,
      title: "Niche Opportunity Seekers",
      description: "Those interested in unique investment opportunities"
    },
    {
      icon: Clock,
      title: "Long-Term Investors",
      description: "Able to lock in capital for extended periods"
    }
  ];

  const benefits = [
    {
      icon: Building,
      title: "Unique Assets",
      description: "Access alternative asset classes for enhanced diversification"
    },
    {
      icon: Shield,
      title: "Professional Management",
      description: "Experienced professionals employing sophisticated strategies"
    },
    {
      icon: Scale,
      title: "Regulatory Oversight",
      description: "SEBI-regulated for security and transparency"
    },
    {
      icon: Rocket,
      title: "High Return Potential",
      description: "Target high-growth sectors for substantial appreciation"
    }
  ];

  // What Are AIFs Section
  const WhatIsAIFSection = (
    <ResponsiveSection
      title="What Are Alternative Investment Funds?"
      spacing="normal"
    >
      <ResponsiveGrid columns={2}>
        <ResponsiveText>
          <p className="mb-4">
            Alternative Investment Funds (AIFs) are privately pooled investment vehicles that provide 
            exposure to non-traditional asset classes such as private equity, hedge funds, real estate, 
            and commodities.
          </p>
          <p>
            Designed for sophisticated investors, AIFs aim to generate higher returns by investing in 
            unique opportunities that are not typically available through traditional investment channels.
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
      title="Why Consider AIFs?"
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
          Alternative Investment Funds offer sophisticated investors access to unique investment 
          opportunities beyond traditional markets. With professional management, regulatory oversight, 
          and exposure to diverse asset classes, AIFs present a compelling option for portfolio 
          diversification and potential high returns.
        </p>
        <p>
          Whether you're an experienced investor looking to diversify or a high-net-worth individual 
          seeking substantial returns, our team can help you navigate the world of alternative 
          investments and identify opportunities aligned with your investment goals.
        </p>
      </ResponsiveText>
    </ResponsiveSection>
  );

  return (
    <BasePageLayout 
      title={<>Alternative <span className="text-blue-500">Investment Funds</span></>}
      subtitle="Access sophisticated investment strategies beyond traditional markets"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        WhatIsAIFSection,
        SuccessStoriesSection,
        InvestorTypesSection,
        BenefitsSection
      ]}
      ctaTitle="Ready to Explore Alternative Investments?"
      ctaDescription="Join sophisticated investors who are accessing unique investment opportunities through AIFs. Start your journey into alternative investments today."
      summaryContent={SummaryContent}
    />
  );
};

export default AlternativeInvestmentFunds;