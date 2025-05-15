import { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  licenseType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  licenseType?: string;
  message?: string;
}

const licenseTypes = [
  'Microsoft Office',
  'Adobe Creative Cloud',
  'Autodesk',
  'VMware',
  'Oracle',
  'SAP',
  'Salesforce',
  'Other',
];

const ContactForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
  
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : undefined;
      case 'email':
        return value.trim() === '' 
          ? 'Email is required' 
          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) 
            ? 'Invalid email address' 
            : undefined;
      case 'company':
        return value.trim() === '' ? 'Company name is required' : undefined;
      case 'licenseType':
        return value.trim() === '' ? 'Please select a license type' : undefined;
      case 'message':
        return value.trim() === '' ? 'Message is required' : undefined;
      default:
        return undefined;
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    // Validate all fields
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          company: '',
          licenseType: '',
          message: '',
        });
        setTouched({});
        setErrors({});
      }, 1500);
    }
  };
  
  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form Side */}
              <div className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Ready to <span className="text-blue-600 dark:text-blue-400">Sell</span> Your License?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Fill out the form below and our team will provide you with a valuation within 24 hours.
                </p>
                
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      Your message has been received. We'll get back to you with a valuation within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.name && touched.name
                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
                      />
                      {errors.name && touched.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.email && touched.email
                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
                      />
                      {errors.email && touched.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.company && touched.company
                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
                      />
                      {errors.company && touched.company && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        License Type
                      </label>
                      <select
                        id="licenseType"
                        name="licenseType"
                        value={formData.licenseType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.licenseType && touched.licenseType
                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
                      >
                        <option value="">Select License Type</option>
                        {licenseTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.licenseType && touched.licenseType && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.licenseType}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.message && touched.message
                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
                      />
                      {errors.message && touched.message && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
                        isSubmitting
                          ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg hover:shadow-xl'
                      } flex items-center justify-center`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Get Valuation <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
              
              {/* Information Side */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-lg font-medium mb-1">Email Us</p>
                    <p className="opacity-90">info@SoftSell.com</p>
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium mb-1">Call Us</p>
                    <p className="opacity-90">+1 (555) 123-4567</p>
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium mb-1">Visit Us</p>
                    <p className="opacity-90">
                      1234 Tech Boulevard<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium mb-1">Business Hours</p>
                    <p className="opacity-90">
                      Monday - Friday: 9am - 6pm PST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;