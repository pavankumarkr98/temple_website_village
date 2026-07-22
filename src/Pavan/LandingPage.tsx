import { useState, useEffect, useRef, createContext, useContext } from 'react';
import PlanYourVisit from './PlanYourVisit';

// Language translations
const translations = {
  en: {
    // Navigation
    navAbout: 'About',
    navRituals: 'Rituals',
    navVillage: 'Village',
    navContact: 'Contact',
    navPlans: 'Plan Your Visit', // ← Updated
    
    // Hero Section
    heroTitle: 'Sri Dhaitha Maramma Temple & Village',
    heroSubtitle: 'ಶ್ರೀ ಧೈತ್ಯ ಮಾರಮ್ಮ ದೇವಸ್ಥಾನ, ಕಾಡಶೆಟ್ಟಿಹಳ್ಳಿ',
    heroDesc: 'Discover the Divine Heritage of Kunigal Taluk, Tumkur',
    heroButton: 'Plan Your Visit',
    
    // Gallery
    galleryTitle: 'Temple Gallery',
    gallerySubtitle: 'Explore the divine beauty of our temple',
    pause: 'Pause',
    play: 'Play',
    
    // About
    aboutTitle: 'About the Temple',
    aboutText: 'The temple is dedicated to ',
    aboutTextBold: 'Goddess Dhaitha Maramma',
    aboutTextRest: ', the powerful ',
    aboutTextItalic: 'Gramadevathe',
    aboutTextRest2: ' (guardian deity) of Kadashettyhalli, worshipped for ',
    aboutTextBold2: 'protection and prosperity',
    aboutTextRest3: '.',
    aboutHighlight: 'New Grand Temple Construction',
    aboutHighlightRest: ' launched under the divine blessings of ',
    aboutHighlightBold: 'Jagadguru Dr. Nirmalanandanatha Swamiji',
    aboutHighlightRest2: ' and managed by the ',
    aboutHighlightBold2: 'Sri Dhaitha Maramma Charitable Trust',
    aboutHighlightRest3: '.',
    
    // Rituals
    ritualsTitle: 'Rituals & Timings',
    dailyDarshan: 'Daily Darshan',
    auspiciousDays: 'Auspicious Days',
    keyEvents: 'Key Events',
    time1: '8:30 AM – 1:00 PM',
    time2: '5:00 PM – 8:00 PM',
    days: 'Tuesdays & Fridays',
    daysDesc: 'Maximum regional devotees',
    events: 'Annual Village Festival',
    eventsDesc: 'Ugadi celebrations, Yoga, Health camps',
    
    // Village
    villageTitle: 'Village Profile',
    district: 'District',
    taluk: 'Taluk',
    gramPanchayat: 'Gram Panchayat',
    postalCode: 'Postal PIN Code',
    districtVal: 'Tumkur (Tumakuru), Karnataka',
    talukVal: 'Kunigal',
    gramPanchayatVal: 'Markonahalli region',
    postalCodeVal: '572111',
    villageDesc: 'A peaceful, vibrant rural landscape thriving on culture and agriculture.',
    
    // Footer
    address: 'Address',
    location: 'Location',
    templeName: 'Sri Dhaitha Maramma Temple',
    villageName: 'ಕಾಡಶೆಟ್ಟಿಹಳ್ಳಿ (Kadashettyhalli), Kunigal Taluk',
    districtFooter: 'Tumkur District, Karnataka - 572111',
    phone: 'Phone',
    mapButton: 'Open in Google Maps',
    rights: '© 2026 Sri Dhaitha Maramma Charitable Trust. All Rights Reserved.',
    made: 'Pavan K'
  },
  kn: {
    // Navigation
    navAbout: 'ವಿವರಗಳು',
    navRituals: 'ಪೂಜಾ ವಿಧಿಗಳು',
    navVillage: 'ಗ್ರಾಮ',
    navContact: 'ಸಂಪರ್ಕಿಸಿ',
    navPlans: 'ಭೇಟಿ ಯೋಜನೆ', // ← Updated
    
    // Hero Section
    heroTitle: 'ಶ್ರೀ ಧೈತ್ಯ ಮಾರಮ್ಮ ದೇವಸ್ಥಾನ ಮತ್ತು ಗ್ರಾಮ',
    heroSubtitle: 'Sri Dhaitha Maramma Temple, Kadashettyhalli',
    heroDesc: 'ಕುಣಿಗಲ್ ತಾಲೂಕು, ತುಮಕೂರಿನ ದೈವಿಕ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
    heroButton: 'ಭೇಟಿ ಯೋಜನೆ',
    
    // Gallery
    galleryTitle: 'ದೇವಸ್ಥಾನದ ಚಿತ್ರಸಂಗ್ರಹ',
    gallerySubtitle: 'ನಮ್ಮ ದೇವಸ್ಥಾನದ ದಿವ್ಯ ಸೌಂದರ್ಯವನ್ನು ಅನ್ವೇಷಿಸಿ',
    pause: 'ವಿರಾಮ',
    play: 'ಪ್ಲೇ',
    
    // About
    aboutTitle: 'ದೇವಸ್ಥಾನದ ವಿವರಗಳು',
    aboutText: 'ಈ ದೇವಸ್ಥಾನವು ',
    aboutTextBold: 'ಶ್ರೀ ಧೈತ್ಯ ಮಾರಮ್ಮ ದೇವಿ',
    aboutTextRest: ' ರವರಿಗೆ ಸಮರ್ಪಿತವಾಗಿದೆ, ಇವರು ',
    aboutTextItalic: 'ಗ್ರಾಮದೇವತೆ',
    aboutTextRest2: ' (ರಕ್ಷಣಾ ದೇವತೆ) ಆಗಿದ್ದು, ಕಾಡಶೆಟ್ಟಿಹಳ್ಳಿಯ ',
    aboutTextBold2: 'ರಕ್ಷಣೆ ಮತ್ತು ಸಮೃದ್ಧಿಗಾಗಿ',
    aboutTextRest3: ' ಪೂಜಿಸಲ್ಪಡುತ್ತಾರೆ.',
    aboutHighlight: 'ಹೊಸ ಭವ್ಯ ದೇವಸ್ಥಾನ ನಿರ್ಮಾಣ',
    aboutHighlightRest: ' ',
    aboutHighlightBold: 'ಜಗದ್ಗುರು ಡಾ. ನಿರ್ಮಲಾನಂದನಾಥ ಸ್ವಾಮೀಜಿ',
    aboutHighlightRest2: ' ರವರ ಆಶೀರ್ವಾದದಡಿಯಲ್ಲಿ ಪ್ರಾರಂಭಿಸಲಾಗಿದೆ ಮತ್ತು ',
    aboutHighlightBold2: 'ಶ್ರೀ ಧೈತ್ಯ ಮಾರಮ್ಮ ಚಾರಿಟೇಬಲ್ ಟ್ರಸ್ಟ್',
    aboutHighlightRest3: ' ರವರಿಂದ ನಿರ್ವಹಿಸಲ್ಪಡುತ್ತಿದೆ.',
    
    // Rituals
    ritualsTitle: 'ಪೂಜಾ ವಿಧಿಗಳು ಮತ್ತು ಸಮಯಗಳು',
    dailyDarshan: 'ದೈನಂದಿನ ದರ್ಶನ',
    auspiciousDays: 'ಶುಭ ದಿನಗಳು',
    keyEvents: 'ಪ್ರಮುಖ ಕಾರ್ಯಕ್ರಮಗಳು',
    time1: 'ಬೆಳಿಗ್ಗೆ ೮:೩೦ – ಮಧ್ಯಾಹ್ನ ೧:೦೦',
    time2: 'ಸಂಜೆ ೫:೦೦ – ರಾತ್ರಿ ೮:೦೦',
    days: 'ಮಂಗಳವಾರ ಮತ್ತು ಶುಕ್ರವಾರ',
    daysDesc: 'ಹೆಚ್ಚಿನ ಪ್ರಾದೇಶಿಕ ಭಕ್ತರು',
    events: 'ವಾರ್ಷಿಕ ಗ್ರಾಮ ಉತ್ಸವ',
    eventsDesc: 'ಯುಗಾದಿ ಆಚರಣೆ, ಯೋಗ, ಆರೋಗ್ಯ ಶಿಬಿರಗಳು',
    
    // Village
    villageTitle: 'ಗ್ರಾಮದ ವಿವರಗಳು',
    district: 'ಜಿಲ್ಲೆ',
    taluk: 'ತಾಲೂಕು',
    gramPanchayat: 'ಗ್ರಾಮ ಪಂಚಾಯತ್',
    postalCode: 'ಪಿನ್ ಕೋಡ್',
    districtVal: 'ತುಮಕೂರು (ತುಮಕುರು), ಕರ್ನಾಟಕ',
    talukVal: 'ಕುಣಿಗಲ್',
    gramPanchayatVal: 'ಮಾರ್ಕೋನಹಳ್ಳಿ ಪ್ರದೇಶ',
    postalCodeVal: '೫೭೨೧೧೧',
    villageDesc: 'ಸಂಸ್ಕೃತಿ ಮತ್ತು ಕೃಷಿಯಿಂದ ಸಮೃದ್ಧವಾಗಿರುವ ಶಾಂತ, ರೋಮಾಂಚಕ ಗ್ರಾಮೀಣ ಭೂದೃಶ್ಯ.',
    
    // Footer
    address: 'ವಿಳಾಸ',
    location: 'ಸ್ಥಳ',
    templeName: 'ಶ್ರೀ ಧೈತ್ಯ ಮಾರಮ್ಮ ದೇವಸ್ಥಾನ',
    villageName: 'ಕಾಡಶೆಟ್ಟಿಹಳ್ಳಿ, ಕುಣಿಗಲ್ ತಾಲೂಕು',
    districtFooter: 'ತುಮಕೂರು ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ - ೫೭೨೧೧೧',
    phone: 'ದೂರವಾಣಿ',
    mapButton: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ನಲ್ಲಿ ತೆರೆಯಿರಿ',
    rights: '© ೨೦೨೬ ಶ್ರೀ ಧೈತ್ಯ ಮಾರಮ್ಮ ಚಾರಿಟೇಬಲ್ ಟ್ರಸ್ಟ್. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಮೀಸಲು.',
    made: 'Pavan K'
  }
};

type Language = 'en' | 'kn';

// Language Context
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
});

// Language Provider
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'kn')) return saved;
    return 'kn';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use translations
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Language Switcher Component
const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-[#d35400]/10 rounded-full p-1">
      <button
        onClick={() => setLanguage('kn')}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 ${
          language === 'kn'
            ? 'bg-[#d35400] text-white shadow-lg shadow-[#d35400]/30'
            : 'text-[#4e342e] hover:bg-[#d35400]/20'
        }`}
      >
        ಕನ್ನಡ
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 ${
          language === 'en'
            ? 'bg-[#d35400] text-white shadow-lg shadow-[#d35400]/30'
            : 'text-[#4e342e] hover:bg-[#d35400]/20'
        }`}
      >
        English
      </button>
    </div>
  );
};

// HeroSection with translations and scroll animations
const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#d35400] to-[#a04000] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-1 bg-[#f1c40f] rounded-full"></div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg animate-fade-in">
          {language === 'kn' ? translations.kn.heroTitle : translations.en.heroTitle}
        </h1>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f1c40f] mt-3 font-serif drop-shadow-lg animate-fade-in-delay">
          {language === 'kn' ? translations.kn.heroSubtitle : translations.en.heroSubtitle}
        </h2>
        
        <div className="mt-8 bg-white/90 backdrop-blur-sm border border-[#f1c40f]/30 rounded-2xl p-6 sm:p-8 shadow-xl inline-block animate-fade-in-delay-2">
          <p className="text-lg sm:text-xl text-[#5d4037] font-medium">
            {t.heroDesc}
          </p>
          <div className="flex justify-center">
            <a 
              href="#plans" 
              className="mt-5 px-8 py-3 bg-[#d35400] hover:bg-[#a04000] text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
            >
              <i className="fas fa-map-pin"></i> {t.heroButton}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay-2 {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in-delay-2 1s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

// PhotoGallerySection with scroll animations
const PhotoGallerySection: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const images = [
    '/good_1.jpeg',
    '/good_2.jpeg',
    '/good_3.jpeg',
    '/good_4.jpeg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, currentIndex]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isTransitioning]);

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-[70vh] bg-[#fcf8f2] py-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#d35400] inline-block border-b-4 border-[#f1c40f] pb-2">
            {t.galleryTitle}
          </h2>
          <p className="text-gray-600 mt-2">{t.gallerySubtitle}</p>
        </div>

        <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl" style={{ height: '800px' }}>
          <div className="absolute inset-0 w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`Temple view ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full bg-gradient-to-br from-[#d35400]/30 to-[#f1c40f]/30 flex items-center justify-center text-white';
                      fallback.innerHTML = `
                        <div class="text-center">
                          <i class="fas fa-temple text-6xl mb-2"></i>
                          <p>ಶ್ರೀ ಧೈತ್ಯ ಮಾರಮ್ಮ</p>
                          <p class="text-sm">Image ${index + 1}</p>
                        </div>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            ))}
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 group shadow-lg"
            aria-label="Previous image"
          >
            <i className="fas fa-chevron-left text-2xl group-hover:scale-110 transition-transform"></i>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 group shadow-lg"
            aria-label="Next image"
          >
            <i className="fas fa-chevron-right text-2xl group-hover:scale-110 transition-transform"></i>
          </button>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-10 h-3 bg-[#f1c40f] shadow-lg shadow-[#f1c40f]/50'
                    : 'w-3 h-3 bg-white/50 hover:bg-white/80 hover:scale-125'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={togglePause}
            className="absolute top-4 right-4 z-20 text-white/80 text-sm bg-black/40 hover:bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'} text-xs`}></i>
            <span>{isPaused ? t.play : t.pause}</span>
          </button>

          <div className="absolute top-4 left-4 z-20 text-white/80 text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-2">
            <span className="text-[#f1c40f] font-bold">{currentIndex + 1}</span>
            <span className="opacity-50">/</span>
            <span>{images.length}</span>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4 overflow-x-auto px-4 py-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? 'border-[#f1c40f] shadow-lg shadow-[#f1c40f]/30 scale-110' 
                  : 'border-transparent hover:border-[#d35400]/50'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '';
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// AboutSection with scroll animations
const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-16 px-4 sm:px-6 lg:px-8 bg-[#fcf8f2] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#d35400] inline-block border-b-4 border-[#f1c40f] pb-2">
            {t.aboutTitle}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <p className="text-lg text-[#4e342e] leading-relaxed">
              {t.aboutText}
              <span className="font-bold text-[#d35400]">{t.aboutTextBold}</span>
              {t.aboutTextRest}
              <span className="italic">{t.aboutTextItalic}</span>
              {t.aboutTextRest2}
              <span className="font-semibold">{t.aboutTextBold2}</span>
              {t.aboutTextRest3}
            </p>
            
            <div className="bg-[#f1c40f]/10 border-l-4 border-[#f1c40f] p-5 rounded-r-xl hover:shadow-xl transition-shadow duration-300">
              <p className="text-[#4e342e]">
                <span className="font-bold">{t.aboutHighlight}</span>
                {t.aboutHighlightRest}
                <span className="font-semibold text-[#d35400]">{t.aboutHighlightBold}</span>
                {t.aboutHighlightRest2}
                <span className="font-semibold">{t.aboutHighlightBold2}</span>
                {t.aboutHighlightRest3}
              </p>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-[#fcf8f2] rounded-2xl shadow-xl border border-[#f1c40f]/20 p-6 flex items-center justify-center hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center">
              <i className="fas fa-temple text-7xl text-[#d35400] opacity-60 mb-3"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// RitualsSection with scroll animations
const RitualsSection: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      icon: 'fa-clock',
      title: t.dailyDarshan,
      detail: t.time1,
      detail2: t.time2,
      color: 'border-[#d35400]',
      bg: 'bg-[#fcf8f2]',
      delay: '0s'
    },
    {
      icon: 'fa-calendar-alt',
      title: t.auspiciousDays,
      detail: t.days,
      detail2: t.daysDesc,
      color: 'border-[#f1c40f]',
      bg: 'bg-[#fcf8f2]',
      delay: '0.2s'
    },
    {
      icon: 'fa-flag',
      title: t.keyEvents,
      detail: t.events,
      detail2: t.eventsDesc,
      color: 'border-[#d35400]',
      bg: 'bg-[#fcf8f2]',
      delay: '0.4s'
    }
  ];

  return (
    <section 
      id="rituals" 
      ref={sectionRef}
      className={`py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fcf8f2] to-[#f5ede4] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#d35400] inline-block border-b-4 border-[#f1c40f] pb-2">
            {t.ritualsTitle}
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className={`${card.bg} rounded-2xl shadow-lg border-t-4 ${card.color} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-102`}
              style={{ transitionDelay: card.delay }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#d35400]/10 flex items-center justify-center text-[#d35400] text-2xl">
                  <i className={`fas ${card.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#4e342e]">{card.title}</h3>
              </div>
              <p className="text-lg font-medium text-[#d35400]">{card.detail}</p>
              <p className="text-[#5d4037]">{card.detail2}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// VillageProfile with scroll animations
const VillageProfile: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const info = [
    { label: t.district, value: t.districtVal },
    { label: t.taluk, value: t.talukVal },
    { label: t.gramPanchayat, value: t.gramPanchayatVal },
    { label: t.postalCode, value: t.postalCodeVal }
  ];

  return (
    <section 
      id="village" 
      ref={sectionRef}
      className={`py-16 px-4 sm:px-6 lg:px-8 bg-[#fcf8f2] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#d35400] inline-block border-b-4 border-[#f1c40f] pb-2">
            {t.villageTitle}
          </h2>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#f1c40f]/20 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#f1c40f]/30">
            <div className="p-6">
              <ul className="space-y-4">
                {info.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 hover:bg-[#f1c40f]/5 p-2 rounded-lg transition-colors duration-200">
                    <span className="font-semibold text-[#d35400] w-28 shrink-0">{item.label}:</span>
                    <span className="text-[#4e342e]">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <p className="text-[#4e342e] leading-relaxed">
                <i className="fas fa-leaf text-[#d35400] mr-2"></i>
                {t.villageDesc}
              </p>
              <div className="mt-3 flex gap-2 text-[#d35400]">
                <i className="fas fa-tree"></i>
                <i className="fas fa-seedling"></i>
                <i className="fas fa-cloud-sun"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// TravelFooter
const TravelFooter: React.FC = () => {
  const { t } = useLanguage();
  const googleMapsUrl = "https://www.google.com/maps?q=WV6R+QHG,+Kadashettyhalli,+Karnataka+572111";

  return (
    <footer id="contact" className="bg-[#4e342e] text-[#fcf8f2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-[#f1c40f] mb-4 flex items-center gap-2">
              <i className="fas fa-location-dot"></i> {t.address}
            </h3>
            <address className="not-italic space-y-2 text-[#f5ede4]">
              <p>{t.templeName}</p>
              <p>{t.villageName}</p>
              <p>{t.districtFooter}</p>
              <p className="text-sm text-[#f1c40f]/70 mt-2">
                <i className="fas fa-phone mr-2"></i> {t.phone}: +91 9945730082 (Trust Office)
              </p>
            </address>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#f1c40f] mb-4 flex items-center gap-2">
                <i className="fas fa-map"></i> {t.location}
              </h3>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#d35400] hover:bg-[#a04000] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <i className="fas fa-globe"></i> {t.mapButton}
              </a>
              <p className="mt-3 text-sm text-[#f5ede4]/60">
                <i className="fas fa-map-pin mr-1"></i> WV6R+QHG, Kadashettyhalli
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-[#f1c40f]/20 text-center text-sm text-[#f5ede4]/60">
          <p>{t.rights}</p> <br></br>
          <p>Built by {t.made}</p>
          <div className="flex justify-center gap-4 mt-3 text-[#f1c40f]/40">
            <i className="fas fa-om"></i>
            <i className="fas fa-spa"></i>
            <i className="fas fa-pray"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  // Smooth scroll for navigation
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf8f2]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#fcf8f2]/95 backdrop-blur-sm shadow-sm border-b border-[#f1c40f]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <i className="fas fa-temple text-[#d35400] text-2xl"></i>
              <span className="font-bold text-[#4e342e] hidden sm:inline">Sri Dhaitha Maramma</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-6 text-sm font-medium text-[#4e342e]">
                <a href="#about" className="hover:text-[#d35400] transition-colors duration-300 relative group">
                  {t.navAbout}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d35400] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#rituals" className="hover:text-[#d35400] transition-colors duration-300 relative group">
                  {t.navRituals}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d35400] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#village" className="hover:text-[#d35400] transition-colors duration-300 relative group">
                  {t.navVillage}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d35400] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#contact" className="hover:text-[#d35400] transition-colors duration-300 relative group">
                  {t.navContact}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d35400] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#plans" className="hover:text-[#d35400] transition-colors duration-300 relative group">
                  {t.navPlans}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d35400] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <HeroSection />
      <PhotoGallerySection />
      <AboutSection />
      <RitualsSection />
      <VillageProfile />
      
      {/* Plan Your Visit Section */}
      <section id="plans" className="scroll-mt-16">
      </section>
      <PlanYourVisit/>
      <TravelFooter />
    </div>
  );
};

// Main Export
export const TempleWebsite: React.FC = () => {
  return (
    <LanguageProvider>
      <LandingPage />
    </LanguageProvider>
  );
};