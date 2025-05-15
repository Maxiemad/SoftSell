import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  'default': "Hello! I'm SoftSell's AI assistant. How can I help you today?",
  'greeting': "Hello! I'm here to help you with any questions about software license reselling.",
  'how to sell': "Selling your software license is easy with SoftSell! Just upload your license details, we'll provide a valuation, and then you can accept the offer to get paid. The entire process typically takes 1-2 business days.",
  'valuation time': "Our valuations are typically completed within 24 hours of license submission. For common licenses like Microsoft or Adobe products, we often provide instant valuations.",
  'payment methods': "We offer various payment methods including bank transfer, PayPal, and cryptocurrency (Bitcoin, Ethereum). You can select your preferred method during the acceptance process.",
  'license types': "We accept most major software licenses including Microsoft Office, Adobe Creative Cloud, Autodesk, VMware, Oracle, SAP, Salesforce, and many others. If you're unsure, just upload your license details and we'll let you know.",
  'support': "Our support team is available Monday through Friday, 9am-6pm PST. You can reach us via email at support@SoftSell.com or call us at +1 (555) 123-4567.",
};

const suggestedQuestions = [
  "How do I sell a license?",
  "How long does valuation take?",
  "What payment methods do you offer?",
  "What license types do you accept?",
  "How can I contact support?",
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          type: 'ai',
          text: predefinedResponses['default'],
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);
  
  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSendMessage();
    }
  };
  
  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return predefinedResponses['greeting'];
    } else if (message.includes('sell') || message.includes('how to sell') || message.includes('selling')) {
      return predefinedResponses['how to sell'];
    } else if (message.includes('valuation') || message.includes('how long') || message.includes('time')) {
      return predefinedResponses['valuation time'];
    } else if (message.includes('payment') || message.includes('pay') || message.includes('money')) {
      return predefinedResponses['payment methods'];
    } else if (message.includes('license') || message.includes('software') || message.includes('type')) {
      return predefinedResponses['license types'];
    } else if (message.includes('support') || message.includes('help') || message.includes('contact')) {
      return predefinedResponses['support'];
    } else {
      return "I'm not sure I understand. Could you rephrase your question? You can also ask about how to sell a license, valuation time, payment methods, or supported license types.";
    }
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      type: 'user' as const,
      text: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response with delay
    setTimeout(() => {
      const aiMessage = {
        type: 'ai' as const,
        text: getResponse(userMessage.text),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleSuggestedQuestion = (question: string) => {
    // Add user message
    const userMessage = {
      type: 'user' as const,
      text: question,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response with delay
    setTimeout(() => {
      const aiMessage = {
        type: 'ai' as const,
        text: getResponse(question),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 left-6 p-4 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      
      {/* Chat widget */}
      <div
        className={`fixed bottom-0 left-0 md:left-6 md:bottom-6 bg-white dark:bg-gray-800 rounded-t-xl md:rounded-xl shadow-2xl transition-all duration-300 z-50 ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-full md:translate-y-20 pointer-events-none'
        }`}
        style={{ width: '100%', maxWidth: '400px', maxHeight: '600px' }}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">SoftSell Assistant</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ask me anything about license reselling</p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close chat"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Chat messages */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <p>{message.text}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="mb-4 flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
        
        {/* Suggested questions */}
        {messages.length < 3 && (
          <div className="px-4 pb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Chat input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className={`p-2 rounded-lg ${
                input.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;