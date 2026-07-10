import { useState, useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#d35400] to-[#a04000]">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-1 bg-[#f1c40f] rounded-full"></div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg animate-fade-in">
          Sri Dhaitha Maramma Temple & Village
        </h1>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f1c40f] mt-3 font-serif drop-shadow-lg animate-fade-in-delay">
          ಶ್ರೀ ಧೈತ್ಯ ಮಾರಮ್ಮ ದೇವಸ್ಥಾನ, ಕಾಡಶೆಟ್ಟಿಹಳ್ಳಿ
        </h2>
        
        <div className="mt-8 bg-white/90 backdrop-blur-sm border border-[#f1c40f]/30 rounded-2xl p-6 sm:p-8 shadow-xl inline-block animate-fade-in-delay-2">
          <p className="text-lg sm:text-xl text-[#5d4037] font-medium">
            Discover the Divine Heritage of Kunigal Taluk, Tumkur
          </p>
          <button className="mt-5 px-8 py-3 bg-[#d35400] hover:bg-[#a04000] text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 mx-auto">
            <i className="fas fa-map-pin"></i> Plan Your Visit
          </button>
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

// Photo Gallery/Carousel Section - Separate section for images
const PhotoGallerySection: React.FC = () => {
  // Array of image paths
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

  // Auto-slide every 4 seconds
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

  // Keyboard navigation
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
    <section className="relative min-h-[70vh] bg-[#fcf8f2] py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#d35400] inline-block border-b-4 border-[#f1c40f] pb-2">
            Temple Gallery
          </h2>
          <p className="text-gray-600 mt-2">Explore the divine beauty of our temple</p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl" style={{ height: '800px' }}>
          {/* Image Carousel Background */}
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

          {/* Left Arrow Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 group shadow-lg"
            aria-label="Previous image"
          >
            <i className="fas fa-chevron-left text-2xl group-hover:scale-110 transition-transform"></i>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 group shadow-lg"
            aria-label="Next image"
          >
            <i className="fas fa-chevron-right text-2xl group-hover:scale-110 transition-transform"></i>
          </button>

          {/* Dots Indicator */}
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

          {/* Pause/Play Button */}
          <button
            onClick={togglePause}
            className="absolute top-4 right-4 z-20 text-white/80 text-sm bg-black/40 hover:bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'} text-xs`}></i>
            <span>{isPaused ? 'Play' : 'Pause'}</span>
          </button>

          {/* Slide Counter */}
          <div className="absolute top-4 left-4 z-20 text-white/80 text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-2">
            <span className="text-[#f1c40f] font-bold">{currentIndex + 1}</span>
            <span className="opacity-50">/</span>
            <span>{images.length}</span>
          </div>
        </div>

        {/* Thumbnail Navigation - Optional */}
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


// About Section
const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#fcf8f2]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#d35400] inline-block border-b-4 border-[#f1c40f] pb-2">
            About the Temple
          </h2>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <p className="text-lg text-[#4e342e] leading-relaxed">
              The temple is dedicated to <span className="font-bold text-[#d35400]">Goddess Dhaitha Maramma</span>, 
              the powerful <span className="italic">Gramadevathe</span> (guardian deity) of Kadashettyhalli, 
              worshipped for <span className="font-semibold">protection and prosperity</span>.
            </p>
            
            <div className="bg-[#f1c40f]/10 border-l-4 border-[#f1c40f] p-5 rounded-r-xl">
              <p className="text-[#4e342e]">
                <span className="font-bold">New Grand Temple Construction</span> launched under the divine blessings of 
                <span className="font-semibold text-[#d35400]"> Jagadguru Dr. Nirmalanandanatha Swamiji</span> 
                and managed by the <span className="font-semibold">Sri Dhaitha Maramma Charitable Trust</span>.
              </p>
            </div>
            
            {/* <div className="bg-[#d35400]/5 border border-[#d35400]/20 rounded-xl p-5 flex items-start gap-3">
              <i className="fas fa-om text-[#d35400] text-2xl mt-1"></i>
              <p className="text-[#4e342e]">
                <span className="font-bold">Sacred Connection:</span> The temple holds a divine bond with the 
                <span className="font-semibold text-[#d35400]"> Adichunchanagiri Mahasamsthana Math</span>, 
                a revered spiritual lineage.
              </p>
            </div> */}
          </div>
          
          <div className="md:col-span-2 bg-[#fcf8f2] rounded-2xl shadow-xl border border-[#f1c40f]/20 p-6 flex items-center justify-center">
            <div className="text-center">
              <i className="fas fa-temple text-7xl text-[#d35400] opacity-60 mb-3"></i>
           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Rituals & Timings Card Grid
const RitualsSection: React.FC = () => {
  const cards = [
    {
      icon: 'fa-clock',
      title: 'Daily Darshan',
      detail: '8:30 AM – 1:00 PM',
      detail2: '5:00 PM – 8:00 PM',
      color: 'border-[#d35400]',
      bg: 'bg-[#fcf8f2]'
    },
    {
      icon: 'fa-calendar-alt',
      title: 'Auspicious Days',
      detail: 'Tuesdays & Fridays',
      detail2: 'Maximum regional devotees',
      color: 'border-[#f1c40f]',
      bg: 'bg-[#fcf8f2]'
    },
    {
      icon: 'fa-flag',
      title: 'Key Events',
      detail: 'Annual Village Festival',
      detail2: 'Ugadi celebrations, Yoga, Health camps',
      color: 'border-[#d35400]',
      bg: 'bg-[#fcf8f2]'
    }
  ];

  return (
    <section id="rituals" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fcf8f2] to-[#f5ede4]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#d35400] inline-block border-b-4 border-[#f1c40f] pb-2">
            Rituals & Timings
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className={`${card.bg} rounded-2xl shadow-lg border-t-4 ${card.color} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
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

// Village Profile
const VillageProfile: React.FC = () => {
  const info = [
    { label: 'District', value: 'Tumkur (Tumakuru), Karnataka' },
    { label: 'Taluk', value: 'Kunigal' },
    { label: 'Gram Panchayat', value: 'Markonahalli region' },
    { label: 'Postal PIN Code', value: '572111' }
  ];

  return (
    <section id="village" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#fcf8f2]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#d35400] inline-block border-b-4 border-[#f1c40f] pb-2">
            Village Profile
          </h2>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#f1c40f]/20 overflow-hidden">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#f1c40f]/30">
            <div className="p-6">
              <ul className="space-y-4">
                {info.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="font-semibold text-[#d35400] w-28 shrink-0">{item.label}:</span>
                    <span className="text-[#4e342e]">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <p className="text-[#4e342e] leading-relaxed">
                <i className="fas fa-leaf text-[#d35400] mr-2"></i>
                A peaceful, vibrant rural landscape thriving on culture and agriculture.
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

// Travel & Location Footer
const TravelFooter: React.FC = () => {
  const googleMapsUrl = "https://www.google.com/maps?q=WV6R+QHG,+Kadashettyhalli,+Karnataka+572111";

  return (
    <footer id="contact" className="bg-[#4e342e] text-[#fcf8f2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-[#f1c40f] mb-4 flex items-center gap-2">
              <i className="fas fa-location-dot"></i> Address
            </h3>
            <address className="not-italic space-y-2 text-[#f5ede4]">
              <p>Sri Dhaitha Maramma Temple</p>
              <p>ಕಾಡಶೆಟ್ಟಿಹಳ್ಳಿ (Kadashettyhalli), Kunigal Taluk</p>
              <p>Tumkur District, Karnataka - 572111</p>
              <p className="text-sm text-[#f1c40f]/70 mt-2">
                <i className="fas fa-phone mr-2"></i> +91 9945730082 (Trust Office)
              </p>
            </address>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#f1c40f] mb-4 flex items-center gap-2">
                <i className="fas fa-map"></i> Location
              </h3>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#d35400] hover:bg-[#a04000] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <i className="fas fa-globe"></i> Open in Google Maps
              </a>
              <p className="mt-3 text-sm text-[#f5ede4]/60">
                <i className="fas fa-map-pin mr-1"></i> WV6R+QHG, Kadashettyhalli
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-[#f1c40f]/20 text-center text-sm text-[#f5ede4]/60">
          <p>© 2026 Sri Dhaitha Maramma Charitable Trust. All Rights Reserved.</p>
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

// Main App Component
const TempleWebsite: React.FC = () => {
  // Smooth scroll for navigation
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
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
            <div className="flex gap-6 text-sm font-medium text-[#4e342e]">
              <a href="#about" className="hover:text-[#d35400] transition-colors">About</a>
              <a href="#rituals" className="hover:text-[#d35400] transition-colors">Rituals</a>
              <a href="#village" className="hover:text-[#d35400] transition-colors">Village</a>
              <a href="#contact" className="hover:text-[#d35400] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection />
      <PhotoGallerySection/>
      <AboutSection />
      <RitualsSection />
      <VillageProfile />
      <TravelFooter />
    </div>
  );
};

export default TempleWebsite;