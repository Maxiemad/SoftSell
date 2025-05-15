import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 z-0" />
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 dark:bg-blue-600/20 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-teal-400/20 dark:bg-teal-600/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero content */}
          <div className={`lg:w-1/2 text-center lg:text-left ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Turn Unused Software<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300">
                Into Cash
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              SoftSell helps businesses sell unused software licenses quickly and securely, maximizing the value of your tech investments.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get a Quote
              </button>
              <button 
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 text-base font-medium rounded-lg text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Learn More
              </button>
            </div>
          </div>
          
          {/* Hero illustration */}
          <div className={`lg:w-1/2 mt-12 lg:mt-0 flex items-center justify-center ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <video
              src="/Screen Recording 2025-05-15 at 3.16.38 PM.mov"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl shadow-2xl w-full h-64 md:h-96 object-cover bg-black"
              style={{ background: 'black' }}
            />
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToHowItWorks}
            className="flex flex-col items-center text-sm text-gray-600 dark:text-gray-400"
          >
            <span className="mb-2">Scroll Down</span>
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;