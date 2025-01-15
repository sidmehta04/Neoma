import React, { useState, useEffect } from 'react';
import { Search, Users, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

const StepCard = ({ icon: Icon, title, description, step, isVisible, delay }) => (
  <div 
    className={`transform transition-all duration-500 ease-out ${
      isVisible 
        ? 'translate-y-0 opacity-100 rotate-0' 
        : 'translate-y-16 opacity-0 rotate-12'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <Card className="h-full relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:rotate-1 bg-gray-800/50 border-gray-700 group">
      <div className="absolute -top-3 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm text-white
                    transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-blue-400">
        {step}
      </div>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="rounded-lg bg-blue-500/20 p-3 transform transition-all duration-300 
                        group-hover:scale-110 group-hover:bg-blue-500/30 group-hover:rotate-12">
            <Icon className="h-5 w-5 text-blue-400 transition-all duration-300 group-hover:rotate-12" />
          </div>
          <div className="transition-all duration-300">
            <h3 className="font-semibold text-base mb-1 text-white group-hover:text-blue-400 
                         transition-colors duration-300">{title}</h3>
            <p className="text-gray-400 text-sm transition-all duration-300 
                       group-hover:text-gray-300 leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ProgressLine = ({ progress }) => (
  <div className="absolute left-0 right-0 top-3 h-px bg-gray-800 overflow-hidden">
    <div 
      className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 transition-all duration-1000 ease-out animate-pulse"
      style={{ 
        width: `${progress}%`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    />
  </div>
);

const UnlistedStocksSteps = () => {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      icon: Search,
      title: "Browse Unlisted Stocks",
      description: "Browse available unlisted stocks and inquire about current market prices."
    },
    {
      icon: Users,
      title: "Buying and Selling of Shares",
      description: "We'll guide you through selecting the right number of shares and managing your buy and sell transactions."
    },
    {
      icon: CheckCircle,
      title: "Confirmation",
      description: "Once the transaction is processed, you will receive a confirmation along with detailed information about the transaction, including the number of shares, purchase of selling and buying price, and other relevant details."
    },
    {
      icon: FileText,
      title: "Stock Transfer",
      description: "The stocks will be transferred to your account following all the necessary procedures and verifications at earliest."
    }
  ];

  useEffect(() => {
    const stepInterval = 500; // Faster animations
    const progressInterval = 15;
    let currentProgress = 0;

    const progressTimer = setInterval(() => {
      currentProgress += 2;
      setProgress(Math.min(currentProgress, 100));
    }, progressInterval);

    const stepTimer = setInterval(() => {
      setVisibleSteps(prev => {
        if (prev < steps.length) {
          return prev + 1;
        }
        clearInterval(stepTimer);
        return prev;
      });
    }, stepInterval);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [steps.length]);

  return (
    <div className="min-h-[400px] md:min-h-[500px] lg:min-h-[500px] h-screen-800 p-4 sm:p-6 flex flex-col justify-center" style={{ background: 'rgb(11, 15, 23)' }}>
      <h2 className="text-xl sm:text-2xl md:text-3xl 
                   font-bold mb-12
                   text-center transform transition-all duration-300
                   hover:scale-105 hover:-rotate-1 text-blue-400 px-4
                   tracking-tight animate-fade-in">
        <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
          How to Transact From Us
        </span>
      </h2>
      
      <div className="max-w-6xl mx-auto relative px-4">
        <ProgressLine progress={progress} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isVisible={index < visibleSteps}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnlistedStocksSteps;