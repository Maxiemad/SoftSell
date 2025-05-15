import { useState, useEffect, useRef } from 'react';
import { Upload, DollarSign, CreditCard, X, Loader2 } from 'lucide-react';

interface StepModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const StepModal: React.FC<StepModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [valuation, setValuation] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setUploadedFile(file);
      
      // Simulate upload process
      setTimeout(() => {
        setIsLoading(false);
        setActiveModal(null);
      }, 2000);
    }
  };

  const handleValuation = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setValuation('$' + (Math.floor(Math.random() * 900) + 100).toString());
      setIsLoading(false);
    }, 2000);
  };

  const handlePayment = () => {
    if (!paymentMethod) return;
    
    setIsLoading(true);
    
    // Simulate payment process
    setTimeout(() => {
      setIsLoading(false);
      setActiveModal(null);
      setPaymentMethod('');
    }, 2000);
  };

  const steps = [
    {
      id: 1,
      title: 'Upload License',
      description: 'Connect your license account or upload license details to our secure platform.',
      icon: Upload,
      color: 'bg-blue-500 dark:bg-blue-600',
      shadowColor: 'shadow-blue-500/30 dark:shadow-blue-600/30',
      action: () => setActiveModal(1),
      modalContent: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Upload your software license file (.pdf, .txt, or image)
          </p>
          <input
            type="file"
            accept=".pdf,.txt,.png,.jpg,.jpeg"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              dark:file:bg-blue-900/50 dark:file:text-blue-400
              hover:file:bg-blue-100 dark:hover:file:bg-blue-900"
          />
          {uploadedFile && (
            <p className="text-sm text-green-600 dark:text-green-400">
              ✓ {uploadedFile.name} uploaded successfully
            </p>
          )}
        </div>
      ),
    },
    {
      id: 2,
      title: 'Get Valuation',
      description: 'Our AI-powered system analyses market data to determine the best price for your license.',
      icon: DollarSign,
      color: 'bg-teal-500 dark:bg-teal-600',
      shadowColor: 'shadow-teal-500/30 dark:shadow-teal-600/30',
      action: () => setActiveModal(2),
      modalContent: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Our AI will analyze your license and provide the best market value.
          </p>
          <button
            onClick={handleValuation}
            disabled={isLoading}
            className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Calculating...
              </span>
            ) : (
              'Get Valuation'
            )}
          </button>
          {valuation && (
            <div className="text-center">
              <p className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                Estimated Value: {valuation}
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 3,
      title: 'Get Paid',
      description: 'Accept the offer and receive payment via your preferred method within 24 hours.',
      icon: CreditCard,
      color: 'bg-indigo-500 dark:bg-indigo-600',
      shadowColor: 'shadow-indigo-500/30 dark:shadow-indigo-600/30',
      action: () => setActiveModal(3),
      modalContent: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Choose your preferred payment method:
          </p>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
          >
            <option value="">Select payment method</option>
            <option value="bank">Bank Transfer</option>
            <option value="paypal">PayPal</option>
            <option value="crypto">Cryptocurrency</option>
          </select>
          <button
            onClick={handlePayment}
            disabled={!paymentMethod || isLoading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Processing...
              </span>
            ) : (
              'Confirm Payment Method'
            )}
          </button>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-blue-600 dark:text-blue-400">Works</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Turn your unused software licenses into cash with our simple three-step process.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-12 lg:space-y-0 lg:space-x-8">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`w-full lg:w-1/3 transition-all duration-700 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                <div 
                  className={`${step.color} ${step.shadowColor} w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-6 transform hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">{step.id}.</span>
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {step.description}
                </p>
                <button
                  onClick={step.action}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
                    step.color
                  } hover:opacity-90 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
                >
                  <span>{step.title}</span>
                  <step.icon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Process connection lines (desktop only) */}
        <div className="hidden lg:block relative">
          <div className="absolute top-0 left-1/6 right-1/6 h-1/2 -mt-28">
            <div className="absolute w-full h-px bg-blue-200 dark:bg-blue-800 top-1/2"></div>
            <div className={`absolute left-0 w-1/3 h-px bg-gradient-to-r from-blue-500 to-teal-500 top-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}></div>
            <div className={`absolute left-1/3 w-1/3 h-px bg-gradient-to-r from-teal-500 to-indigo-500 top-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}></div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {steps.map((step) => (
        <StepModal
          key={step.id}
          isOpen={activeModal === step.id}
          onClose={() => setActiveModal(null)}
          title={step.title}
        >
          {step.modalContent}
        </StepModal>
      ))}
    </section>
  );
};

export default HowItWorks;