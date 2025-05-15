import { ShieldCheck, Zap, Banknote, Users } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      icon: ShieldCheck,
      title: 'Secure Transactions',
      description: 'End-to-end encryption and secure payment processing for every transaction.',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Get valuations within minutes and payment within 24 hours of acceptance.',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    },
    {
      icon: Banknote,
      title: 'Maximum Value',
      description: 'Our market data ensures you get the best possible price for your licenses.',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Our team of license specialists is available to assist you every step of the way.',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    }
  ];

  return (
    <section id="why-choose-us" ref={sectionRef} className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-blue-600 dark:text-blue-400">SoftSell</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We've simplified the license resale process to provide you with the best possible experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-700 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              
              {/* Hover Reveal Info */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Learn more about our {feature.title.toLowerCase()} process and how it benefits you.
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-8 text-white shadow-xl">
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-lg font-medium">Customer Satisfaction</div>
          </div>
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 rounded-xl p-8 text-white shadow-xl">
            <div className="text-4xl font-bold mb-2">$10M+</div>
            <div className="text-lg font-medium">Licenses Resold</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 rounded-xl p-8 text-white shadow-xl">
            <div className="text-4xl font-bold mb-2">24h</div>
            <div className="text-lg font-medium">Average Turnaround</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;