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
  Shield, Banknote, Scale, Target, 
  Calculator, ChartBar, Landmark
} from "lucide-react";

const Bonds = () => {
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
    }
  ];

  const successStories = [
    {
      title: "Inflation Protection",
      description: "Long-term government bonds historically outpace inflation rates",
      highlight: "Value Preservation"
    },
    {
      title: "Fund Performance",
      description: "Bond mutual funds delivering attractive returns with lower risk profiles",
      highlight: "Stable Returns"
    }
  ];

  const investorTypes = [
    {
      icon: Shield,
      title: "Risk-Averse Investors",
      description: "Individuals seeking stable returns without equity market volatility"
    },
    {
      icon: Banknote,
      title: "Retirees",
      description: "Those looking for reliable regular income during retirement"
    },
    {
      icon: Scale,
      title: "Portfolio Balancers",
      description: "Investors wanting to diversify with low-risk investments"
    },
    {
      icon: Target,
      title: "Goal-Oriented Savers",
      description: "Those saving for specific goals with fixed timelines"
    }
  ];

  const benefits = [
    {
      icon: Calculator,
      title: "Regular Income",
      description: "Consistent interest payments for steady cash flow"
    },
    {
      icon: Shield,
      title: "Capital Preservation",
      description: "Lower volatility helping preserve invested capital"
    },
    {
      icon: ChartBar,
      title: "Diversification",
      description: "Reduce overall portfolio risk and enhance stability"
    },
    {
      icon: Landmark,
      title: "Tax Benefits",
      description: "Tax-free options available for enhanced returns"
    }
  ];

  const WhatAreBondsSection = (
    <ResponsiveSection
      title="What Are Bonds?"
      spacing="normal"
    >
      <ResponsiveGrid columns={2}>
        <ResponsiveText>
          <p className="mb-4">
            Bonds are fixed-income securities that provide regular interest payments (coupon payments) 
            and return of principal at maturity. They offer a safer investment option compared to 
            stocks.
          </p>
          <p>
            Ideal for conservative investors, bonds provide capital safety and predictable income, 
            making them a cornerstone of balanced investment portfolios.
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
      title="Performance Highlights"
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
      title="Why Consider Bonds?"
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
          Bonds offer a reliable way to generate regular income while preserving capital. With 
          options ranging from government securities to corporate bonds, they provide stability 
          and predictability to your investment portfolio. Their lower volatility compared to 
          stocks makes them an excellent choice for conservative investors.
        </p>
        <p>
          Whether you're planning for retirement, saving for specific goals, or looking to 
          diversify your portfolio, our team can help you identify the right bond investments 
          that align with your financial objectives and risk tolerance.
        </p>
      </ResponsiveText>
    </ResponsiveSection>
  );

  return (
    <BasePageLayout 
      title={<>Fixed Income <span className="text-blue-500">Bonds</span></>}
      subtitle="Secure your wealth with stable returns and regular income"
      heroAnimation={<InvestmentAnimation />}
      sections={[
        WhatAreBondsSection,
        SuccessStoriesSection,
        InvestorTypesSection,
        BenefitsSection
      ]}
      ctaTitle="Ready to Invest in Bonds?"
      ctaDescription="Join investors who value stability and regular income. Start your journey into fixed-income investments today and secure your financial future."
      summaryContent={SummaryContent}
    />
  );
};

export default Bonds;