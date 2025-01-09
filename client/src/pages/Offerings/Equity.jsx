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
  Diamond, Crown, Clock, Target, 
  Star, BarChart, Building, Lightbulb
} from "lucide-react";

const PrivateBoutique = () => {
  const facts = [
    {
      title: "Sachin's Success",
      description: "Cricket legend Sachin Tendulkar's ₹5 crore investment in Azad Engineering grew to ₹72.59 crore, with shares trading above ₹1,500."
    },
    {
      title: "Avenue Supermarts Growth",
      description: "Pre-IPO shares offered at ₹299 saw substantial gains post-IPO, delivering exceptional returns to early investors."
    },
    {
      title: "Celebrity Investments",
      description: "Cricketers Rahul Dravid and Zaheer Khan invested in Swiggy's pre-IPO shares, showing growing interest in tech startups."
    }
  ];

  const successStories = [
    {
      title: "Apple Investment",
      description: "Mike Marrkula's $250,000 investment for 30% stake grew to $203 million after IPO",
      highlight: "812x Returns"
    },
    {
      title: "ICICI Prudential",
      description: "₹1 lakh pre-IPO investment grew to ₹2.3 lakh after listing",
      highlight: "130% Growth"
    }
  ];

  const investorTypes = [
    {
      icon: Diamond,
      title: "Sophisticated Investors",
      description: "Those who understand the risks and rewards of pre-IPO investments"
    },
    {
      icon: Crown,
      title: "High-Net-Worth Individuals",
      description: "Investors seeking high-growth opportunities with substantial returns"
    },
    {
      icon: Clock,
      title: "Long-Term Investors",
      description: "Those with capacity to invest for extended periods without immediate liquidity needs"
    },
    {
      icon: Target,
      title: "Risk-Tolerant Investors",
      description: "Those willing to take higher risks for early access to potentially high-performing companies"
    }
  ];

  const benefits = [
    {
      icon: Star,
      title: "Early Access",
      description: "Get in before the company goes public and potentially benefit from listing gains"
    },
    {
      icon: BarChart,
      title: "High Growth Potential",
      description: "Opportunity for substantial returns through pre-IPO investments"
    },
    {
      icon: Building,
      title: "Portfolio Diversification",
      description: "Access unique investment opportunities not available in public markets"
    },
    {
      icon: Lightbulb,
      title: "Strategic Positioning",
      description: "Be among the first to invest in promising companies before they go public"
    }
  ];

  // What Is Private Boutique Section
  const WhatIsPrivateBoutiqueSection = (
    <ResponsiveSection
      title="What Is Private Boutique?"
      spacing="normal"
    >
      <ResponsiveGrid columns={2}>
        <ResponsiveText>
          <p className="mb-4">
            Private Boutique provides exclusive access to shares of companies planning to go public soon. 
            This unique service allows you to invest in pre-IPO opportunities and potentially benefit 
            from significant price appreciation once the company is officially listed.
          </p>
          <p>
            By investing before the IPO, you position yourself for potential listing gains and long-term 
            growth as these companies transition from private to public markets.
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
      title="Investment Success Stories"
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
      title="Why Consider Private Boutique?"
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
          Private Boutique investments offer a unique opportunity to participate in the growth of 
          promising companies before they enter the public market. This approach can lead to substantial 
          financial rewards if the company performs well after its IPO.
        </p>
        <p>
          While investing in pre-IPO shares comes with its own set of risks, including illiquidity 
          and lack of transparency, the potential for significant returns makes it an attractive option 
          for sophisticated investors. Our team is here to help you navigate these opportunities and 
          make informed investment decisions aligned with your financial goals.
        </p>
      </ResponsiveText>
    </ResponsiveSection>
  );

  return (
    <BasePageLayout 
      title={<>Private <span className="text-blue-500">Boutique</span></>}
      subtitle="Access exclusive pre-IPO opportunities and invest in tomorrow's market leaders"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        WhatIsPrivateBoutiqueSection,
        SuccessStoriesSection,
        InvestorTypesSection,
        BenefitsSection
      ]}
      ctaTitle="Ready to Access Pre-IPO Opportunities?"
      ctaDescription="Join sophisticated investors who have already discovered the potential of pre-IPO investments. Start your journey into exclusive investment opportunities today."
      summaryContent={SummaryContent}
    />
  );
};

export default PrivateBoutique;