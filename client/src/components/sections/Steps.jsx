import React, { useState, useEffect } from 'react';
import { FileText, Search, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

const StepCard = ({ icon: Icon, title, description, step, isVisible, delay }) => (
  <div 
    className={`transform transition-all duration-300 ease-out ${
      isVisible 
        ? 'translate-x-0 opacity-100' 
        : '-translate-x-full opacity-0'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <Card className="relative mb-6 last:mb-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gray-800/50 border-gray-700">
      <div className="absolute -left-3 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm text-white
                    transform transition-transform duration-500 hover:scale-110 hover:bg-blue-400">
        {step}
      </div>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className="rounded-lg bg-blue-500/20 p-3 transform transition-all duration-300 
                        hover:scale-110 hover:bg-blue-500/30 hover:rotate-3">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
          </div>
          <div className="transition-all duration-300 group flex-1">
            <h3 className="font-semibold text-base sm:text-lg mb-2 text-white group-hover:text-blue-400 
                         transition-colors duration-300">{title}</h3>
            <p className="text-gray-400 text-sm sm:text-base transition-opacity duration-300 
                       group-hover:text-gray-300">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const PDFViewer = ({ pdfUrl, isVisible }) => (
  <div className={`h-[500px] lg:h-full transition-all duration-300 ease-out transform 
                  ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
    <Card className="h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-gray-800/50 border-gray-700">
      <CardContent className="p-4 sm:p-6 h-full">
        <h3 className="text-base sm:text-lg font-semibold mb-4 text-blue-400">
          Stock Purchase Confirmation
        </h3>
        <div className="w-full h-[calc(100%-2rem)] border border-gray-700 rounded-lg overflow-hidden 
                      transition-transform duration-500 hover:border-blue-500/50">
          <iframe
            src={pdfUrl}
            className="w-full h-full bg-white"
            title="Stock Purchase Confirmation"
          />
        </div>
      </CardContent>
    </Card>
  </div>
);

const ProgressLine = ({ progress }) => (
  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800">
    <div 
      className="w-full bg-blue-500 transition-all duration-1000 ease-out"
      style={{ 
        height: `${progress}%`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    />
  </div>
);

const UnlistedStocksSteps = () => {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [showPDF, setShowPDF] = useState(false);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      icon: Search,
      title: "Browse Unlisted Stocks",
      description: "Go through the available unlisted stocks and click on 'Inquire' to know the current market price for each stock you're interested in."
    },
    {
      icon: Users,
      title: "Lot Size Discussion",
      description: "Our team will contact you to discuss the number of lots you want to purchase and guide you through the buying process."
    },
    {
      icon: CheckCircle,
      title: "Stock Transfer",
      description: "Within a week, the stocks will be transferred to your account following all necessary procedures and verifications."
    },
    {
      icon: FileText,
      title: "Confirmation Document",
      description: "You'll receive a PDF document confirming your unlisted stock purchase with all relevant transaction details."
    }
  ];

  useEffect(() => {
    const stepInterval = 700; // Faster step transitions
    const progressInterval = 20; // Faster progress updates
    let currentProgress = 0;

    const progressTimer = setInterval(() => {
      currentProgress += 2; // Increment by 2 for faster progress
      setProgress(Math.min(currentProgress, 100));
    }, progressInterval);

    const stepTimer = setInterval(() => {
      setVisibleSteps(prev => {
        if (prev < steps.length) {
          return prev + 1;
        }
        clearInterval(stepTimer);
        setTimeout(() => setShowPDF(true), 200);
        return prev;
      });
    }, stepInterval);

    // Cleanup function
    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [steps.length]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8" style={{ background: 'rgb(11, 15, 23)' }}>
      <h2 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 
                   font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-12
                   text-center transform transition-all duration-300
                   hover:scale-105 text-blue-400 px-4
                   tracking-tight">
        <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
          How to Buy From Us
        </span>
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left Column - Steps */}
        <div className="w-full lg:w-1/2 relative pl-8">
          <ProgressLine progress={progress} />
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
        
        {/* Right Column - PDF Viewer */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <PDFViewer 
            pdfUrl="/path/to/your/local/confirmation.pdf" 
            isVisible={showPDF}
          />
        </div>
      </div>
    </div>
  );
};

export default UnlistedStocksSteps;