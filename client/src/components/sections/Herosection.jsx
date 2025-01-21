import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import moonvideo from "../../assets/moon1.mp4";
import ContactDialog from "./Inquiry";

const HeroSection = () => {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const fullText = "Discover Unlisted,Pre-IPO,\nDelisted Shares with Neoma";
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
    <div className="w-full min-h-[30vh] relative overflow-hidden">
      {/* Video Background Section */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <video
            className={`absolute top-[55%] left-1/2 min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-95" : "opacity-0"
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
            className={`absolute inset-0 transition-opacity duration-1000 ${
              theme === "dark" 
                ? "bg-black " + (isVideoLoaded ? "bg-opacity-50" : "bg-opacity-80")
                : "bg-blue-200 " + (isVideoLoaded ? "bg-opacity-15" : "bg-opacity-60")
            }`}
          ></div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative z-10 flex flex-col justify-center min-h-[45vh] px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className="max-w-4xl w-full mx-auto md:ml-8 lg:ml-16 xl:ml-24">
          {/* Main Heading */}
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl
                      font-bold mb-2 text-white 
                      whitespace-pre-line text-left tracking-tight
                      leading-tight animate-fade-in">
            {text}
            <span
              className={`inline-block w-0.5 h-4 sm:h-5 md:h-6 lg:h-8 ml-1 -mb-1 
                       bg-white transition-opacity duration-200
                       ${cursorVisible ? "opacity-100" : "opacity-0"}`}
            ></span>
          </h1>

          {/* Description */}
          <p className={`text-xs 
                     mb-2 sm:mb-3 text-left 
                     max-w-xl
                     leading-relaxed
                     opacity-0 animate-fade-in
                     ${theme === "dark" ? "text-gray-200" : "text-white font-medium"}`}
            style={{ animationDelay: "1s" }}>
            Buy and sell unlisted , pre-ipo and delisted shares at prices with us.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className={`inline-flex items-center gap-2 
                     px-3 sm:px-4
                     py-1.5 sm:py-2
                     rounded-lg font-medium
                     transform transition-all duration-300
                     hover:scale-105 hover:shadow-lg
                     text-sm
                     w-full sm:w-auto 
                     justify-center sm:justify-start
                     opacity-0 animate-fade-in-up
                     shadow-xl
                     ${theme === "dark"
                       ? "bg-gray-500 text-white hover:bg-blue-400"
                       : "bg-blue-500 text-white hover:bg-blue-400 hover:shadow-blue-300/50"
                     }`}
            style={{ animationDelay: "1.5s" }}
          >
            <span>Let's get started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

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
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;