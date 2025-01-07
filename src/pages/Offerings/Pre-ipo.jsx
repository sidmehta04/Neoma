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
  Heart, Briefcase, Scale, Handshake,
  Rocket, Lightbulb, Network, ChartBar
} from "lucide-react";

const AngelInvestment = () => {
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
    }
  ];

  const successStories = [
    {
      title: "Angel Networks",
      description: "Indian Angel Network (IAN) facilitates collaboration among investors for funding promising startups",
      highlight: "Collective Impact"
    },
    {
      title: "Digital Revolution",
      description: "Early angel investors in Paytm saw the company become a household name in digital payments",
      highlight: "Market Leader"
    }
  ];

  const investorTypes = [
    {
      icon: Heart,
      title: "Passionate Investors",
      description: "Individuals enthusiastic about innovation and entrepreneurship"
    },
    {
      icon: Briefcase,
      title: "High-Net-Worth Individuals",
      description: "Those looking to diversify portfolios with high-growth potential"
    },
    {
      icon: Scale,
      title: "Risk-Tolerant Investors",
      description: "Those willing to take higher risks for substantial rewards"
    },
    {
      icon: Handshake,
      title: "Impact-Minded Investors",
      description: "People who want to make a difference by supporting new businesses"
    }
  ];

  const benefits = [
    {
      icon: Rocket,
      title: "High Return Potential",
      description: "Successful startups can provide significant returns exceeding traditional investments"
    },
    {
      icon: Lightbulb,
      title: "Mentorship Opportunities",
      description: "Leverage expertise and networks to guide startups to success"
    },
    {
      icon: Network,
      title: "Access to Innovation",
      description: "Early access to groundbreaking ideas and technologies"
    },
    {
      icon: ChartBar,
      title: "Portfolio Diversification",
      description: "Add unique asset class to spread risk across different sectors"
    }
  ];

  // What Is Angel Investment Section
  const WhatIsAngelInvestmentSection = (
    <ResponsiveSection
      title="What Is Angel Investment?"
      spacing="normal"
    >
      <ResponsiveGrid columns={2}>
        <ResponsiveText>
          <p className="mb-4">
            Angel investing involves funding startups or early-stage companies in exchange for equity. 
            This form of investment provides essential capital to help businesses grow while offering 
            investors the potential for high returns.
          </p>
          <p>
            As an angel investor, you become part of the entrepreneurial journey, supporting 
            innovative ideas and helping transform promising startups into successful enterprises.
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
      title="Impact Stories"
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
      title="Why Consider Angel Investment?"
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
          Angel investing offers a unique opportunity to support innovative startups while potentially 
          achieving significant returns. Beyond financial gains, it allows you to be part of entrepreneurial 
          journeys and contribute to groundbreaking innovations.
        </p>
        <p>
          While angel investing carries inherent risks, the potential for both financial returns and 
          meaningful impact makes it an attractive option for forward-thinking investors. Our team is 
          here to help you identify promising opportunities and make informed investment decisions 
          aligned with your goals and risk tolerance.
        </p>
      </ResponsiveText>
    </ResponsiveSection>
  );

  return (
    <BasePageLayout 
      title={<>Angel <span className="text-blue-500">Investment</span></>}
      subtitle="Support innovative startups and be part of the next big success story"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        WhatIsAngelInvestmentSection,
        SuccessStoriesSection,
        InvestorTypesSection,
        BenefitsSection
      ]}
      ctaTitle="Ready to Become an Angel Investor?"
      ctaDescription="Join a community of visionary investors who are shaping the future by supporting innovative startups. Start your angel investing journey today."
      summaryContent={SummaryContent}
    />
  );
};

export default AngelInvestment;