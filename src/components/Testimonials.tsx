import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
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

  // Auto-advance testimonials
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechNova Solutions',
      content: 'SoftSell made it incredibly easy to liquidate our unused licenses after downsizing. We received payment within 24 hours and the entire process was smooth and transparent.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Finance Director',
      company: 'InnovateCorp',
      content: 'As a finance director, I was skeptical about the value we\'d get for our unused software. SoftSell exceeded our expectations with valuations 20% higher than competitors.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
    },
    {
      name: 'Elena Ramirez',
      role: 'IT Manager',
      company: 'Globe Industries',
      content: 'The security measures implemented by SoftSell gave us confidence in the license transfer process. Their team was professional and thorough throughout the entire transaction.',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4,
    },
  ];

  const next = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-blue-600 dark:text-blue-400">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what businesses like yours have to say about SoftSell.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel */}
          <div 
            className={`relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <blockquote className="text-xl italic text-gray-800 dark:text-gray-200 mb-4">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-5 w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center z-10 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-5 w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center z-10 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-blue-600 dark:bg-blue-400 w-8' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;