import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ChatWidget from './components/ChatWidget';
import { ThemeProvider } from './context/ThemeContext';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const [scrolled, setScrolled] = useState(false);

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      {/* Global Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: ["grab", "repulse"] },
              resize: true,
            },
            modes: {
              grab: { distance: 200, links: { opacity: 1 } },
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ff0000" },
            links: {
              enable: true,
              color: "#ff0000",
              distance: 150,
              opacity: 0.7,
              width: 2,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
              attract: { enable: false },
            },
            number: { value: 80, density: { enable: true, area: 800 } },
            opacity: { value: 0.7 },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 7 } },
          },
          detectRetina: true,
        }}
        style={{
          position: "fixed",
          zIndex: -1,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      />
      {/* Main App Content */}
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 z-10 relative">
        <Navbar scrolled={scrolled} />
        <main>
          <HeroSection />
          <HowItWorks />
          <WhyChooseUs />
          <Testimonials />
          <ContactForm />
        </main>
        <Footer />
        <ScrollToTop />
        <ChatWidget />
      </div>
    </ThemeProvider>
  );
}

export default App;