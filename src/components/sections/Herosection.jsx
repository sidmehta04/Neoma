import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import moonvideo from "../../assets/moon.mp4";
import ContactDialog from "./Inquiry";

const HeroSection = () => {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const fullText = "Exploring Oppurtunities\nWith Neoma.";
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-mount");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-in");
      }, index * 200);
    });
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="w-full min-h-[calc(100vh-72px)] relative overflow-hidden">
      {/* Responsive Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <video
            className={`absolute top-1/2 left-1/2 min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-70" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
          >
            <source src={moonvideo} type="video/mp4" />
          </video>
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
              isVideoLoaded ? "bg-opacity-50" : "bg-opacity-80"
            }`}
          ></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-72px)] 
                    px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="max-w-4xl w-full mx-auto md:ml-8 lg:ml-16 xl:ml-24">
          {/* Badge */}
          <div className="mb-4 sm:mb-6 md:mb-8 animate-fade-in">
            <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 
                         rounded-full text-xs sm:text-sm font-medium 
                         bg-gray-500 text-white
                         transform transition-all duration-300 hover:scale-105
                         hover:bg-gray-400 cursor-pointer">
              JOIN NEOMA
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl 
                      font-bold mb-4 sm:mb-6 text-white 
                      whitespace-pre-line text-left tracking-tight
                      leading-tight sm:leading-tight md:leading-tight">
            {text}
            <span
              className={`inline-block w-0.5 h-8 sm:h-10 md:h-12 lg:h-14 ml-1 -mb-1 
                       bg-white transition-opacity duration-200
                       ${cursorVisible ? "opacity-100" : "opacity-0"}`}
            ></span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg
                     mb-6 sm:mb-8 md:mb-12 text-left 
                     max-w-2xl animate-shimmer 
                     bg-gradient-to-r from-white via-gray-100 to-white 
                     bg-clip-text text-transparent bg-300% 
                     leading-relaxed sm:leading-relaxed
                     opacity-100 animate-fade-in">
Experience the 'next moon' as a beacon of fresh starts and financial growth. Just as the moon's phases mark new beginnings, let us guide you through the cycles of wealth creation.           </p>

          {/* CTA Button */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex items-center gap-2 
                     px-5 sm:px-6 md:px-8 
                     py-3 sm:py-3.5 md:py-4 
                     rounded-lg font-medium
                     bg-gray-500 text-white 
                     hover:bg-blue-400
                     transform transition-all duration-300
                     hover:scale-105 hover:shadow-lg
                     text-sm sm:text-base
                     w-full sm:w-auto 
                     justify-center sm:justify-start
                     opacity-0 animate-fade-in-up"
          >
            <span>Let's get started</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Dialog */}
      <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

      {/* Add custom styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-shimmer {
          animation: shimmer 8s linear infinite;
        }

        @keyframes shimmer {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;