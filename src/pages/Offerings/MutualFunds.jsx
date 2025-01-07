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
  Users, Clock, LineChart, Target, 
  Shield, BarChart, Wallet, Coins
} from "lucide-react";

const MutualFunds = () => {
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
    }
  ];

  const successStories = [
    {
      title: "High Returns",
      description: "Select mutual funds have delivered impressive annualized returns exceeding 20%",
      highlight: "20%+ Returns"
    },
    {
      title: "SIP Success",
      description: "Monthly SIP of ₹1,800 grew to ₹8 crore over 20 years",
      highlight: "₹8 Crore Growth"
    }
  ];

  const investorTypes = [
    {
      icon: Users,
      title: "Beginners",
      description: "Those looking to enter the investment world without extensive knowledge"
    },
    {
      icon: Clock,
      title: "Busy Individuals",
      description: "People with limited time or expertise to manage investments actively"
    },
    {
      icon: LineChart,
      title: "Diversification Seekers",
      description: "Investors looking for a diversified portfolio managed by professionals"
    },
    {
      icon: Target,
      title: "Goal-Oriented Investors",
      description: "Individuals with specific objectives like tax saving or wealth accumulation"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Professional Management",
      description: "Expert fund managers handling your investments"
    },
    {
      icon: BarChart,
      title: "Diversification",
      description: "Spread risk across multiple securities and sectors"
    },
    {
      icon: Wallet,
      title: "Accessibility",
      description: "Start investing with as little as ₹500 per month"
    },
    {
      icon: Coins,
      title: "Tax Benefits",
      description: "ELSS funds offer tax deductions under Section 80C"
    }
  ];

  // What Are Mutual Funds Section
  const WhatAreMutualFundsSection = (
    <ResponsiveSection
      title="What Are Mutual Funds?"
      spacing="normal"
    >
      <ResponsiveGrid columns={2}>
        <ResponsiveText>
          <p className="mb-4">
            Mutual funds are investment tools that gather funds from numerous investors to build 
            a diversified portfolio consisting of stocks, bonds, or other securities.
          </p>
          <p>
            Managed by professional fund managers, these funds cater to various risk profiles 
            and investment goals, making them an accessible option for individuals looking to 
            grow their wealth without needing extensive market knowledge.
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
      title="Why Consider Mutual Funds?"
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
          Mutual funds offer a compelling investment option due to their potential for high returns, 
          professional management, and diversification benefits. They provide a way for investors 
          to access a broad range of securities without needing extensive market knowledge or 
          time commitment.
        </p>
        <p>
          The ability to invest through SIPs allows individuals to build wealth gradually while 
          benefiting from market fluctuations. Whether you're saving for retirement, education, 
          or other financial goals, mutual funds can be a strategic addition to your investment 
          portfolio. Our team is here to help you choose the right mutual funds aligned with your 
          financial objectives and risk tolerance.
        </p>
      </ResponsiveText>
    </ResponsiveSection>
  );

  return (
    <BasePageLayout 
      title={<>Discover <span className="text-blue-500">Mutual Funds</span></>}
      subtitle="Your path to professional investment management and wealth creation"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        WhatAreMutualFundsSection,
        SuccessStoriesSection,
        InvestorTypesSection,
        BenefitsSection
      ]}
      ctaTitle="Ready to Start Your Investment Journey?"
      ctaDescription="Join millions of investors who have discovered the power of mutual funds. Start your journey towards systematic wealth creation today."
      summaryContent={SummaryContent}
    />
  );
};

export default MutualFunds;