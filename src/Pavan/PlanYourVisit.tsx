import { useState } from 'react';

export interface PlanYourVisitProps {
  language?: 'en' | 'kn'; // Made optional
  t?: any;
}

const PlanYourVisit: React.FC<PlanYourVisitProps> = ({ language, t }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pooja' | 'attractions' | 'travel' | 'plan' | 'timings'>('overview');
  const [selectedPooja, setSelectedPooja] = useState<string | null>(null);

  // Pooja Services Data
  const poojaServices = {
    en: [
      {
        id: 'abhishekam',
        name: 'Abhishekam',
        description: 'Sacred bathing ceremony of the deity with milk, honey, and holy water',
        duration: '30-45 mins',
        cost: '₹501',
        items: 'Milk, Honey, Ghee, Curd, Sugar, Sandalwood paste',
        benefits: 'Removes negative energies, brings peace and prosperity'
      },
      {
        id: 'archana',
        name: 'Archana',
        description: 'Chanting of 108 divine names with offerings',
        duration: '15-20 mins',
        cost: '₹251',
        items: 'Flowers, Betel leaves, Coconut, Kumkum',
        benefits: 'Blessings for health, wealth, and happiness'
      },
      {
        id: 'homam',
        name: 'Homam / Havan',
        description: 'Sacred fire ritual with Vedic mantras for powerful blessings',
        duration: '1-2 hours',
        cost: '₹1501',
        items: 'Ghee, Rice, Coconut, Camphor, Sacred wood',
        benefits: 'Protection from evil, fulfillment of wishes, spiritual growth'
      },
      {
        id: 'kumkumarchana',
        name: 'Kumkum Archana',
        description: 'Special offering of vermilion and turmeric to the Goddess',
        duration: '20-30 mins',
        cost: '₹351',
        items: 'Kumkum, Turmeric, Flowers, Coconut',
        benefits: 'Marital bliss, prosperity, and family harmony'
      },
      {
        id: 'sahasranama',
        name: 'Sahasranama Archana',
        description: 'Chanting of 1000 divine names with special offerings',
        duration: '45-60 mins',
        cost: '₹1001',
        items: 'Special flowers, Fruits, Coconut, Betel leaves',
        benefits: 'Overall well-being, removal of obstacles, divine grace'
      },
      {
        id: 'annadanam',
        name: 'Annadanam',
        description: 'Offering of food to devotees as a sacred service',
        duration: 'Varies',
        cost: '₹5001',
        items: 'Food grains, Vegetables, Ghee, Cooking essentials',
        benefits: 'Great blessings, good karma, and divine mercy'
      }
    ],
    kn: [
      {
        id: 'abhishekam',
        name: 'ಅಭಿಷೇಕ',
        description: 'ಹಾಲು, ಜೇನುತುಪ್ಪ ಮತ್ತು ಪವಿತ್ರ ನೀರಿನಿಂದ ದೇವರಿಗೆ ಪವಿತ್ರ ಸ್ನಾನ',
        duration: '೩೦-೪೫ ನಿಮಿಷ',
        cost: '₹೫೦೧',
        items: 'ಹಾಲು, ಜೇನುತುಪ್ಪ, ತುಪ್ಪ, ಮೊಸರು, ಸಕ್ಕರೆ, ಶ್ರೀಗಂಧದ ಪೇಸ್ಟ್',
        benefits: 'ನಕಾರಾತ್ಮಕ ಶಕ್ತಿಗಳನ್ನು ದೂರ ಮಾಡುತ್ತದೆ, ಶಾಂತಿ ಮತ್ತು ಸಮೃದ್ಧಿಯನ್ನು ತರುತ್ತದೆ'
      },
      {
        id: 'archana',
        name: 'ಅರ್ಚನೆ',
        description: '೧೦೮ ದಿವ್ಯ ನಾಮಗಳ ಪಠಣ ಮತ್ತು ಅರ್ಪಣೆಗಳು',
        duration: '೧೫-೨೦ ನಿಮಿಷ',
        cost: '₹೨೫೧',
        items: 'ಹೂವುಗಳು, ವೀಳ್ಯದೆಲೆ, ತೆಂಗಿನಕಾಯಿ, ಕುಂಕುಮ',
        benefits: 'ಆರೋಗ್ಯ, ಸಂಪತ್ತು ಮತ್ತು ಸಂತೋಷಕ್ಕೆ ಆಶೀರ್ವಾದ'
      },
      {
        id: 'homam',
        name: 'ಹೋಮ / ಹವನ',
        description: 'ವೈದಿಕ ಮಂತ್ರಗಳೊಂದಿಗೆ ಪವಿತ್ರ ಅಗ್ನಿ ಆಚರಣೆ',
        duration: '೧-೨ ಗಂಟೆ',
        cost: '₹೧೫೦೧',
        items: 'ತುಪ್ಪ, ಅಕ್ಕಿ, ತೆಂಗಿನಕಾಯಿ, ಕರ್ಪೂರ, ಪವಿತ್ರ ಕಟ್ಟಿಗೆ',
        benefits: 'ದುಷ್ಟಶಕ್ತಿಗಳಿಂದ ರಕ್ಷಣೆ, ಇಚ್ಛೆಗಳ ಪೂರೈಸುವಿಕೆ, ಆಧ್ಯಾತ್ಮಿಕ ಬೆಳವಣಿಗೆ'
      },
      {
        id: 'kumkumarchana',
        name: 'ಕುಂಕುಮ ಅರ್ಚನೆ',
        description: 'ದೇವಿಗೆ ಕುಂಕುಮ ಮತ್ತು ಅರಿಶಿನದ ವಿಶೇಷ ಅರ್ಪಣೆ',
        duration: '೨೦-೩೦ ನಿಮಿಷ',
        cost: '₹೩೫೧',
        items: 'ಕುಂಕುಮ, ಅರಿಶಿನ, ಹೂವುಗಳು, ತೆಂಗಿನಕಾಯಿ',
        benefits: 'ವೈವಾಹಿಕ ಆನಂದ, ಸಮೃದ್ಧಿ ಮತ್ತು ಕುಟುಂಬ ಸಮೃದ್ಧಿ'
      },
      {
        id: 'sahasranama',
        name: 'ಸಹಸ್ರನಾಮ ಅರ್ಚನೆ',
        description: '೧೦೦೦ ದಿವ್ಯ ನಾಮಗಳ ಪಠಣ ಮತ್ತು ವಿಶೇಷ ಅರ್ಪಣೆಗಳು',
        duration: '೪೫-೬೦ ನಿಮಿಷ',
        cost: '₹೧೦೦೧',
        items: 'ವಿಶೇಷ ಹೂವುಗಳು, ಹಣ್ಣುಗಳು, ತೆಂಗಿನಕಾಯಿ, ವೀಳ್ಯದೆಲೆ',
        benefits: 'ಸಮಗ್ರ ಕಲ್ಯಾಣ, ಅಡ್ಡಿಗಳ ನಿವಾರಣೆ, ದೈವಿಕ ಕೃಪೆ'
      },
      {
        id: 'annadanam',
        name: 'ಅನ್ನದಾನ',
        description: 'ಪವಿತ್ರ ಸೇವೆಯಾಗಿ ಭಕ್ತರಿಗೆ ಆಹಾರ ಅರ್ಪಣೆ',
        duration: 'ವ್ಯತ್ಯಾಸವಾಗುತ್ತದೆ',
        cost: '₹೫೦೦೧',
        items: 'ಆಹಾರ ಧಾನ್ಯಗಳು, ತರಕಾರಿಗಳು, ತುಪ್ಪ, ಅಡುಗೆ ಸಾಮಗ್ರಿಗಳು',
        benefits: 'ಮಹಾ ಆಶೀರ್ವಾದ, ಸತ್ಕರ್ಮ, ಮತ್ತು ದೈವಿಕ ಕೃಪೆ'
      }
    ]
  };

  const currentPoojas = language === 'kn' ? poojaServices.kn : poojaServices.en;

  // Nearby Attractions
  const attractions = {
    en: [
      {
        name: 'Markonahalli Dam',
        description: 'Beautiful scenic dam with lush greenery, perfect for photography and nature walks',
        distance: '5 km',
        type: 'Dam & Nature',
        icon: 'fa-water'
      },
      {
        name: 'Markonahalli Dam Backwater',
        description: 'Serene backwater area with boating facilities and picnic spots',
        distance: '2 km',
        type: 'Backwater & Boating',
        icon: 'fa-ship'
      },
      {
        name: 'Yadiyur Siddalingeshwara Swamy Temple',
        description: 'Ancient temple dedicated to Lord Siddalingeshwara, a peaceful spiritual destination',
        distance: '12 km',
        type: 'Temple & Spiritual',
        icon: 'fa-temple'
      },
      {
        name: 'Adi Chunchangiri',
        description: 'Famous pilgrimage center with a beautiful hilltop temple and scenic views',
        distance: '30 km',
        type: 'Pilgrimage & Hills',
        icon: 'fa-mountain'
      }
    ],
    kn: [
      {
        name: 'ಮಾರ್ಕೋನಹಳ್ಳಿ ಅಣೆಕಟ್ಟು',
        description: 'ಹಸಿರಿನಿಂದ ಕೂಡಿದ ಸುಂದರ ಅಣೆಕಟ್ಟು, ಛಾಯಾಚಿತ್ರ ಮತ್ತು ಪ್ರಕೃತಿ ವೀಕ್ಷಣೆಗೆ ಸೂಕ್ತ',
        distance: '೫ ಕಿಮೀ',
        type: 'ಅಣೆಕಟ್ಟು ಮತ್ತು ಪ್ರಕೃತಿ',
        icon: 'fa-water'
      },
      {
        name: 'ಮಾರ್ಕೋನಹಳ್ಳಿ ಅಣೆಕಟ್ಟು ಬ್ಯಾಕ್ ವಾಟರ್',
        description: 'ದೋಣಿ ವಿಹಾರ ಮತ್ತು ವಿಹಾರ ತಾಣಗಳೊಂದಿಗೆ ಸುಂದರ ಬ್ಯಾಕ್ ವಾಟರ್ ಪ್ರದೇಶ',
        distance: '೨ ಕಿಮೀ',
        type: 'ಬ್ಯಾಕ್ ವಾಟರ್ ಮತ್ತು ದೋಣಿ ವಿಹಾರ',
        icon: 'fa-ship'
      },
      {
        name: 'ಯಡಿಯೂರು ಸಿದ್ದಲಿಂಗೇಶ್ವರ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ',
        description: 'ಶ್ರೀ ಸಿದ್ದಲಿಂಗೇಶ್ವರ ಸ್ವಾಮಿಗೆ ಸಮರ್ಪಿತವಾದ ಪ್ರಾಚೀನ ದೇವಸ್ಥಾನ, ಶಾಂತ ಆಧ್ಯಾತ್ಮಿಕ ತಾಣ',
        distance: '೧೨ ಕಿಮೀ',
        type: 'ದೇವಸ್ಥಾನ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ',
        icon: 'fa-temple'
      },
      {
        name: 'ಆದಿ ಚುಂಚನಗಿರಿ',
        description: 'ಸುಂದರ ಬೆಟ್ಟದ ದೇವಾಲಯ ಮತ್ತು ವಿಹಂಗಮ ನೋಟಗಳೊಂದಿಗೆ ಪ್ರಸಿದ್ಧ ಯಾತ್ರಾ ಕೇಂದ್ರ',
        distance: '೩೦ ಕಿಮೀ',
        type: 'ಯಾತ್ರಾ ಕೇಂದ್ರ ಮತ್ತು ಬೆಟ್ಟಗಳು',
        icon: 'fa-mountain'
      }
    ]
  };

  const currentAttractions = language === 'kn' ? attractions.kn : attractions.en;

  // Travel & Transport Information (Updated with hotels)
  const travelInfo = {
    en: {
      busFromBangalore: 'KSRTC buses available from Majestic, Bangalore to Yadiyur (All day - frequent service)',
      busFromYadiyur: 'Local buses from Yadiyur to Kadashettyhalli',
      busTimingsMorning: 'Morning: 7:00 AM, 8:30 AM, 10:00 AM',
      busTimingsEvening: 'Evening: 3:00 PM, 4:30 PM, 6:00 PM',
      autoFromYadiyur: 'Auto-rickshaws available from Yadiyur to Kadashettyhalli (15-20 mins ride)',
      autoCost: 'Approximately ₹150-₹200',
      yadiyurFacilities: 'All pooja items, flowers, coconut, fruits, and other offerings available in Yadiyur market',
      nearbyCars: 'Car rentals and taxis available in Yadiyur for local sightseeing',
      hotels: [
        { 
          name: 'Swathi Delicacy', 
          desc: 'Pure vegetarian cuisine - North & South Indian dishes with variety desserts and beverages. Drive-in restaurant just 4 km from Yediyur on NH 48, Kunigal. Perfect for breakfast, lunch, chat or family dinner.',
          type: 'Restaurant',
          rating: '⭐ 4.1',
          location: 'NH 48, Kunigal (4 km from Yadiyur)',
          cuisine: 'North Indian, South Indian, Chinese',
          features: ['Drive-in', 'Family dining', 'Vegetarian only']
        },
        { 
          name: 'Kicchana Halli Mane', 
          desc: 'Serves Chinese and Vegetarian cuisines. Famous for nicely cooked vada, idli, masala dosa and good pancakes. Known for good cold coffee, spectacular service, and attractive prices.',
          type: 'Restaurant',
          rating: '⭐ 4.1 (Google)',
          location: 'Near Yadiyur',
          cuisine: 'Chinese, Vegetarian, South Indian',
          features: ['Family dining', 'Quick service', 'Good coffee']
        },
        { 
          name: 'Paakashala @ Yediyur', 
          desc: 'Popular restaurant near Yediyur serving authentic local cuisine',
          type: 'Restaurant',
          rating: '⭐ 3.8',
          location: 'Yediyur',
          cuisine: 'South Indian, Vegetarian',
          features: ['Local cuisine', 'Budget friendly']
        },
        { 
          name: 'Empire Restaurant - Kunigal', 
          desc: 'Well-known restaurant in Kunigal serving delicious vegetarian food',
          type: 'Restaurant',
          rating: '⭐ 4.0',
          location: 'Kunigal',
          cuisine: 'South Indian, North Indian',
          features: ['Dine-in', 'Takeaway']
        }
      ]
    },
    kn: {
      busFromBangalore: 'ಮೆಜೆಸ್ಟಿಕ್, ಬೆಂಗಳೂರಿನಿಂದ ಯಡಿಯೂರಿಗೆ ಕೆಎಸ್ಆರ್ಟಿಸಿ ಬಸ್ಸುಗಳು (ದಿನವಿಡೀ - ಆಗಾಗ್ಗೆ ಸೇವೆ)',
      busFromYadiyur: 'ಯಡಿಯೂರಿನಿಂದ ಕಾಡಶೆಟ್ಟಿಹಳ್ಳಿಗೆ ಸ್ಥಳೀಯ ಬಸ್ಸುಗಳು',
      busTimingsMorning: 'ಬೆಳಿಗ್ಗೆ: ೭:೦೦, ೮:೩೦, ೧೦:೦೦',
      busTimingsEvening: 'ಸಂಜೆ: ೩:೦೦, ೪:೩೦, ೬:೦೦',
      autoFromYadiyur: 'ಯಡಿಯೂರಿಂದ ಕಾಡಶೆಟ್ಟಿಹಳ್ಳಿಗೆ ಆಟೋ ರಿಕ್ಷಾಗಳು ಲಭ್ಯ (೧೫-೨೦ ನಿಮಿಷಗಳ ಪ್ರಯಾಣ)',
      autoCost: 'ಸರಿಸುಮಾರು ₹೧೫೦-₹೨೦೦',
      yadiyurFacilities: 'ಯಡಿಯೂರು ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಎಲ್ಲಾ ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು, ಹೂವುಗಳು, ತೆಂಗಿನಕಾಯಿ, ಹಣ್ಣುಗಳು ಮತ್ತು ಇತರೆ ಅರ್ಪಣೆಗಳು ಲಭ್ಯ',
      nearbyCars: 'ಸ್ಥಳೀಯ ಪ್ರವಾಸಕ್ಕಾಗಿ ಯಡಿಯೂರಿನಲ್ಲಿ ಕಾರು ಬಾಡಿಗೆ ಮತ್ತು ಟ್ಯಾಕ್ಸಿಗಳು ಲಭ್ಯ',
      hotels: [
        { 
          name: 'ಸ್ವಾತಿ ಡೆಲಿಕಸಿ', 
          desc: 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ - ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತೀಯ ಭಕ್ಷ್ಯಗಳು, ವಿವಿಧ ಸಿಹಿತಿಂಡಿಗಳು ಮತ್ತು ಪಾನೀಯಗಳು. ಎನ್ಎಚ್ ೪೮, ಕುಣಿಗಲ್ನಲ್ಲಿ ಯೇಡಿಯೂರಿನಿಂದ ೪ ಕಿಮೀ ದೂರದಲ್ಲಿ ಡ್ರೈವ್-ಇನ್ ರೆಸ್ಟೋರೆಂಟ್. ಉಪಹಾರ, ಊಟ, ಚಾಟ್ ಅಥವಾ ಕುಟುಂಬ ಭೋಜನಕ್ಕೆ ಸೂಕ್ತ.',
          type: 'ರೆಸ್ಟೋರೆಂಟ್',
          rating: '⭐ ೪.೧',
          location: 'ಎನ್ಎಚ್ ೪೮, ಕುಣಿಗಲ್ (ಯಡಿಯೂರಿನಿಂದ ೪ ಕಿಮೀ)',
          cuisine: 'ಉತ್ತರ ಭಾರತೀಯ, ದಕ್ಷಿಣ ಭಾರತೀಯ, ಚೈನೀಸ್',
          features: ['ಡ್ರೈವ್-ಇನ್', 'ಕುಟುಂಬ ಊಟ', 'ಸಸ್ಯಾಹಾರಿ ಮಾತ್ರ']
        },
        { 
          name: 'ಕಿಚ್ಚನ ಹಳ್ಳಿ ಮನೆ', 
          desc: 'ಚೈನೀಸ್ ಮತ್ತು ಸಸ್ಯಾಹಾರಿ ಭಕ್ಷ್ಯಗಳನ್ನು ನೀಡುತ್ತದೆ. ರುಚಿಕರವಾದ ವಡೆ, ಇಡ್ಲಿ, ಮಸಾಲಾ ದೋಸೆ ಮತ್ತು ಉತ್ತಮ ಪ್ಯಾನ್ಕೇಕ್ಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ. ಉತ್ತಮ ಕೋಲ್ಡ್ ಕಾಫಿ, ಅತ್ಯುತ್ತಮ ಸೇವೆ ಮತ್ತು ಆಕರ್ಷಕ ಬೆಲೆಗಳಿಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.',
          type: 'ರೆಸ್ಟೋರೆಂಟ್',
          rating: '⭐ ೪.೧ (ಗೂಗಲ್)',
          location: 'ಯಡಿಯೂರು ಬಳಿ',
          cuisine: 'ಚೈನೀಸ್, ಸಸ್ಯಾಹಾರಿ, ದಕ್ಷಿಣ ಭಾರತೀಯ',
          features: ['ಕುಟುಂಬ ಊಟ', 'ತ್ವರಿತ ಸೇವೆ', 'ಉತ್ತಮ ಕಾಫಿ']
        },
        { 
          name: 'ಪಾಕಶಾಲ @ ಯೇಡಿಯೂರು', 
          desc: 'ಯೇಡಿಯೂರು ಬಳಿ ಸ್ಥಳೀಯ ಭೋಜನವನ್ನು ನೀಡುವ ಜನಪ್ರಿಯ ರೆಸ್ಟೋರೆಂಟ್',
          type: 'ರೆಸ್ಟೋರೆಂಟ್',
          rating: '⭐ ೩.೮',
          location: 'ಯೇಡಿಯೂರು',
          cuisine: 'ದಕ್ಷಿಣ ಭಾರತೀಯ, ಸಸ್ಯಾಹಾರಿ',
          features: ['ಸ್ಥಳೀಯ ಭೋಜನ', 'ಬಜೆಟ್ ಸ್ನೇಹಿ']
        },
        { 
          name: 'ಎಂಪೈರ್ ರೆಸ್ಟೋರೆಂಟ್ - ಕುಣಿಗಲ್', 
          desc: 'ಕುಣಿಗಲ್ನಲ್ಲಿ ರುಚಿಕರವಾದ ಸಸ್ಯಾಹಾರಿ ಆಹಾರವನ್ನು ನೀಡುವ ಪ್ರಸಿದ್ಧ ರೆಸ್ಟೋರೆಂಟ್',
          type: 'ರೆಸ್ಟೋರೆಂಟ್',
          rating: '⭐ ೪.೦',
          location: 'ಕುಣಿಗಲ್',
          cuisine: 'ದಕ್ಷಿಣ ಭಾರತೀಯ, ಉತ್ತರ ಭಾರತೀಯ',
          features: ['ಡೈನ್-ಇನ್', 'ಟೇಕ್ ಅವೇ']
        }
      ]
    }
  };

  const currentTravel = language === 'kn' ? travelInfo.kn : travelInfo.en;

  // Suggested Plans
  const visitPlans = {
    en: [
      {
        id: 'plan1',
        title: '🌅 Morning Temple + Dam Trip',
        description: 'Perfect for early risers who want to experience the divine blessings and nature',
        schedule: [
          '7:00 AM - Bus from Majestic to Yadiyur',
          '8:30 AM - Reach Yadiyur, breakfast at Swathi Delicacy (4 km)',
          '9:30 AM - Buy pooja items from Yadiyur market',
          '10:00 AM - Take auto to Kadashettyhalli (₹150-200)',
          '10:30 AM - Temple darshan and pooja (Abhishekam/Archana)',
          '12:00 PM - Visit Markonahalli Dam (5 km) - photography',
          '1:30 PM - Lunch at Kicchana Halli Mane',
          '3:00 PM - Visit Markonahalli Dam Backwater (2 km) - boating',
          '5:00 PM - Return to Yadiyur, evening bus to Bangalore'
        ],
        bestFor: 'Family, Photography, Nature Lovers'
      },
      {
        id: 'plan2',
        title: '🕊️ Spiritual & Heritage Tour',
        description: 'A spiritual journey covering multiple temples and pilgrimage sites',
        schedule: [
          '8:00 AM - Bus from Majestic to Yadiyur',
          '9:30 AM - Reach Yadiyur, visit Siddalingeshwara Swamy Temple (12 km)',
          '11:00 AM - Drive to Kadashettyhalli Temple',
          '11:30 AM - Sri Dhaitha Maramma Temple darshan and special pooja',
          '1:00 PM - Lunch at Paakashala @ Yediyur',
          '2:00 PM - Visit Markonahalli Dam (5 km) - scenic views',
          '3:30 PM - Adi Chunchangiri (30 km) - hilltop temple',
          '6:00 PM - Return to Yadiyur, dinner at Empire Restaurant',
          '7:30 PM - Bus back to Bangalore'
        ],
        bestFor: 'Pilgrims, Spiritual Seekers, Heritage Enthusiasts'
      },
      {
        id: 'plan3',
        title: '🚗 Quick One-Day Trip',
        description: 'A compact but fulfilling trip covering all major attractions',
        schedule: [
          '8:30 AM - Bus from Majestic to Yadiyur',
          '10:00 AM - Reach Yadiyur, auto to Temple',
          '10:30 AM - Temple darshan and quick pooja',
          '11:30 AM - Visit Markonahalli Dam Backwater (2 km)',
          '12:30 PM - Lunch at Kicchana Halli Mane',
          '2:00 PM - Visit Markonahalli Dam (5 km)',
          '3:30 PM - Yadiyur Siddalingeshwara Temple (12 km)',
          '5:30 PM - Return to Yadiyur, snacks at Swathi Delicacy',
          '6:30 PM - Bus to Bangalore'
        ],
        bestFor: 'Quick Trip, Solo Travelers, Couples'
      }
    ],
    kn: [
      {
        id: 'plan1',
        title: '🌅 ಬೆಳಗಿನ ಜಾವ ದೇವಸ್ಥಾನ + ಅಣೆಕಟ್ಟು ಪ್ರವಾಸ',
        description: 'ದೈವಿಕ ಆಶೀರ್ವಾದ ಮತ್ತು ಪ್ರಕೃತಿ ಅನುಭವಿಸಲು ಬಯಸುವ ಮುಂಜಾನೆ ಎದ್ದೇಳುವವರಿಗೆ ಸೂಕ್ತ',
        schedule: [
          'ಬೆಳಿಗ್ಗೆ ೭:೦೦ - ಮೆಜೆಸ್ಟಿಕ್ನಿಂದ ಯಡಿಯೂರಿಗೆ ಬಸ್ಸು',
          'ಬೆಳಿಗ್ಗೆ ೮:೩೦ - ಯಡಿಯೂರು ತಲುಪಿ, ಸ್ವಾತಿ ಡೆಲಿಕಸಿಯಲ್ಲಿ ಉಪಹಾರ (೪ ಕಿಮೀ)',
          'ಬೆಳಿಗ್ಗೆ ೯:೩೦ - ಯಡಿಯೂರು ಮಾರುಕಟ್ಟೆಯಿಂದ ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು',
          'ಬೆಳಿಗ್ಗೆ ೧೦:೦೦ - ಕಾಡಶೆಟ್ಟಿಹಳ್ಳಿಗೆ ಆಟೋ (₹೧೫೦-೨೦೦)',
          'ಬೆಳಿಗ್ಗೆ ೧೦:೩೦ - ದೇವಸ್ಥಾನ ದರ್ಶನ ಮತ್ತು ಪೂಜೆ',
          'ಮಧ್ಯಾಹ್ನ ೧೨:೦೦ - ಮಾರ್ಕೋನಹಳ್ಳಿ ಅಣೆಕಟ್ಟು (೫ ಕಿಮೀ)',
          'ಮಧ್ಯಾಹ್ನ ೧:೩೦ - ಕಿಚ್ಚನ ಹಳ್ಳಿ ಮನೆಯಲ್ಲಿ ಊಟ',
          'ಮಧ್ಯಾಹ್ನ ೩:೦೦ - ಮಾರ್ಕೋನಹಳ್ಳಿ ಅಣೆಕಟ್ಟು ಬ್ಯಾಕ್ ವಾಟರ್ (೨ ಕಿಮೀ)',
          'ಸಂಜೆ ೫:೦೦ - ಯಡಿಯೂರಿಗೆ ಮರಳಿ, ಬೆಂಗಳೂರಿಗೆ ಬಸ್ಸು'
        ],
        bestFor: 'ಕುಟುಂಬ, ಛಾಯಾಚಿತ್ರ, ಪ್ರಕೃತಿ ಪ್ರಿಯರು'
      },
      {
        id: 'plan2',
        title: '🕊️ ಆಧ್ಯಾತ್ಮಿಕ ಮತ್ತು ಪರಂಪರೆ ಪ್ರವಾಸ',
        description: 'ಬಹು ದೇವಾಲಯಗಳು ಮತ್ತು ಯಾತ್ರಾ ಸ್ಥಳಗಳನ್ನು ಒಳಗೊಂಡ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಯಾಣ',
        schedule: [
          'ಬೆಳಿಗ್ಗೆ ೮:೦೦ - ಮೆಜೆಸ್ಟಿಕ್ನಿಂದ ಯಡಿಯೂರಿಗೆ ಬಸ್ಸು',
          'ಬೆಳಿಗ್ಗೆ ೯:೩೦ - ಯಡಿಯೂರು ತಲುಪಿ, ಸಿದ್ದಲಿಂಗೇಶ್ವರ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ (೧೨ ಕಿಮೀ)',
          'ಬೆಳಿಗ್ಗೆ ೧೧:೦೦ - ಕಾಡಶೆಟ್ಟಿಹಳ್ಳಿ ದೇವಸ್ಥಾನಕ್ಕೆ ಪ್ರಯಾಣ',
          'ಬೆಳಿಗ್ಗೆ ೧೧:೩೦ - ಶ್ರೀ ಧೈತ್ಯ ಮಾರಮ್ಮ ದೇವಸ್ಥಾನ ದರ್ಶನ ಮತ್ತು ವಿಶೇಷ ಪೂಜೆ',
          'ಮಧ್ಯಾಹ್ನ ೧:೦೦ - ಪಾಕಶಾಲ @ ಯೇಡಿಯೂರಿನಲ್ಲಿ ಊಟ',
          'ಮಧ್ಯಾಹ್ನ ೨:೦೦ - ಮಾರ್ಕೋನಹಳ್ಳಿ ಅಣೆಕಟ್ಟು (೫ ಕಿಮೀ)',
          'ಮಧ್ಯಾಹ್ನ ೩:೩೦ - ಆದಿ ಚುಂಚನಗಿರಿ (೩೦ ಕಿಮೀ)',
          'ಸಂಜೆ ೬:೦೦ - ಯಡಿಯೂರಿಗೆ ಮರಳಿ, ಎಂಪೈರ್ ರೆಸ್ಟೋರೆಂಟ್ನಲ್ಲಿ ರಾತ್ರಿ ಭೋಜನ',
          'ಸಂಜೆ ೭:೩೦ - ಬೆಂಗಳೂರಿಗೆ ಬಸ್ಸು'
        ],
        bestFor: 'ಯಾತ್ರಿಕರು, ಆಧ್ಯಾತ್ಮಿಕ ಅನ್ವೇಷಕರು, ಪರಂಪರೆ ಪ್ರೇಮಿಗಳು'
      },
      {
        id: 'plan3',
        title: '🚗 ತ್ವರಿತ ಒಂದು ದಿನದ ಪ್ರವಾಸ',
        description: 'ಎಲ್ಲಾ ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳನ್ನು ಒಳಗೊಂಡ ಸಂಕ್ಷಿಪ್ತ ಆದರೆ ತೃಪ್ತಿಕರ ಪ್ರವಾಸ',
        schedule: [
          'ಬೆಳಿಗ್ಗೆ ೮:೩೦ - ಮೆಜೆಸ್ಟಿಕ್ನಿಂದ ಯಡಿಯೂರಿಗೆ ಬಸ್ಸು',
          'ಬೆಳಿಗ್ಗೆ ೧೦:೦೦ - ಯಡಿಯೂರು ತಲುಪಿ, ದೇವಸ್ಥಾನಕ್ಕೆ ಆಟೋ',
          'ಬೆಳಿಗ್ಗೆ ೧೦:೩೦ - ದೇವಸ್ಥಾನ ದರ್ಶನ ಮತ್ತು ತ್ವರಿತ ಪೂಜೆ',
          'ಬೆಳಿಗ್ಗೆ ೧೧:೩೦ - ಮಾರ್ಕೋನಹಳ್ಳಿ ಅಣೆಕಟ್ಟು ಬ್ಯಾಕ್ ವಾಟರ್ (೨ ಕಿಮೀ)',
          'ಮಧ್ಯಾಹ್ನ ೧೨:೩೦ - ಕಿಚ್ಚನ ಹಳ್ಳಿ ಮನೆಯಲ್ಲಿ ಊಟ',
          'ಮಧ್ಯಾಹ್ನ ೨:೦೦ - ಮಾರ್ಕೋನಹಳ್ಳಿ ಅಣೆಕಟ್ಟು (೫ ಕಿಮೀ)',
          'ಮಧ್ಯಾಹ್ನ ೩:೩೦ - ಯಡಿಯೂರು ಸಿದ್ದಲಿಂಗೇಶ್ವರ ದೇವಸ್ಥಾನ (೧೨ ಕಿಮೀ)',
          'ಸಂಜೆ ೫:೩೦ - ಯಡಿಯೂರಿಗೆ ಮರಳಿ, ಸ್ವಾತಿ ಡೆಲಿಕಸಿಯಲ್ಲಿ ತಿಂಡಿ',
          'ಸಂಜೆ ೬:೩೦ - ಬೆಂಗಳೂರಿಗೆ ಬಸ್ಸು'
        ],
        bestFor: 'ತ್ವರಿತ ಪ್ರವಾಸ, ಏಕಾಂಗಿ ಪ್ರಯಾಣಿಕರು, ದಂಪತಿಗಳು'
      }
    ]
  };

  const currentPlans = language === 'kn' ? visitPlans.kn : visitPlans.en;

  // Temple Timings
  const timings = {
    en: {
      days: [
        { day: 'Monday - Saturday', morning: '8:30 AM - 1:00 PM', evening: '5:00 PM - 8:00 PM' },
        { day: 'Sunday & Holidays', morning: '8:00 AM - 1:30 PM', evening: '4:30 PM - 8:30 PM' },
        { day: 'Special Pooja Days', morning: '7:00 AM - 12:00 PM', evening: '5:00 PM - 9:00 PM' }
      ],
      specialDays: ['Tuesdays', 'Fridays', 'Full Moon Days', 'Festival Days'],
      note: 'Timings may change during special festivals and events. Please confirm before visiting.'
    },
    kn: {
      days: [
        { day: 'ಸೋಮವಾರ - ಶನಿವಾರ', morning: 'ಬೆಳಿಗ್ಗೆ ೮:೩೦ - ಮಧ್ಯಾಹ್ನ ೧:೦೦', evening: 'ಸಂಜೆ ೫:೦೦ - ರಾತ್ರಿ ೮:೦೦' },
        { day: 'ಭಾನುವಾರ ಮತ್ತು ರಜಾ ದಿನಗಳು', morning: 'ಬೆಳಿಗ್ಗೆ ೮:೦೦ - ಮಧ್ಯಾಹ್ನ ೧:೩೦', evening: 'ಸಂಜೆ ೪:೩೦ - ರಾತ್ರಿ ೮:೩೦' },
        { day: 'ವಿಶೇಷ ಪೂಜಾ ದಿನಗಳು', morning: 'ಬೆಳಿಗ್ಗೆ ೭:೦೦ - ಮಧ್ಯಾಹ್ನ ೧೨:೦೦', evening: 'ಸಂಜೆ ೫:೦೦ - ರಾತ್ರಿ ೯:೦೦' }
      ],
      specialDays: ['ಮಂಗಳವಾರ', 'ಶುಕ್ರವಾರ', 'ಪೌರ್ಣಮಿ', 'ಉತ್ಸವ ದಿನಗಳು'],
      note: 'ವಿಶೇಷ ಉತ್ಸವಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳ ಸಮಯದಲ್ಲಿ ಸಮಯ ಬದಲಾಗಬಹುದು. ದಯವಿಟ್ಟು ಭೇಟಿ ಮಾಡುವ ಮೊದಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'
    }
  };

  const currentTimings = language === 'kn' ? timings.kn : timings.en;

  // What to Carry
  const whatToCarry = {
    en: {
      items: [
        { icon: 'fa-leaf', name: 'Betel leaves (Vilyadele)', desc: 'Minimum 5-10 leaves' },
        { icon: 'fa-coconut', name: 'Coconut', desc: 'Fresh, with husk' },
        { icon: 'fa-seedling', name: 'Flowers', desc: 'Fresh flowers (jasmine, marigold, rose)' },
        { icon: 'fa-fruit', name: 'Fruits', desc: 'Banana, apple, or any seasonal fruit' },
        { icon: 'fa-candle', name: 'Camphor / Ghee lamp', desc: 'For deepa arathi' },
        { icon: 'fa-spice', name: 'Kumkum / Turmeric', desc: 'Vermilion and turmeric powder' },
        { icon: 'fa-coin', name: 'Dakshina', desc: 'Cash offering (as per your wish)' },
      ],
      tips: [
        'Wear traditional attire (preferably saree for women, dhoti for men)',
        'Remove footwear before entering temple premises',
        'Maintain silence and devotion inside the temple',
        'Avoid leather items (belts, bags) inside the temple',
        'Mobile phones should be switched off or kept silent',
        'All pooja items are available in Yadiyur market'
      ]
    },
    kn: {
      items: [
        { icon: 'fa-leaf', name: 'ವೀಳ್ಯದೆಲೆ (Vilyadele)', desc: 'ಕನಿಷ್ಠ ೫-೧೦ ಎಲೆಗಳು' },
        { icon: 'fa-coconut', name: 'ತೆಂಗಿನಕಾಯಿ', desc: 'ತಾಜಾ, ಸಿಪ್ಪೆಯೊಂದಿಗೆ' },
        { icon: 'fa-seedling', name: 'ಹೂವುಗಳು', desc: 'ತಾಜಾ ಹೂವುಗಳು (ಮಲ್ಲಿಗೆ, ಗುಲಾಬಿ, ಕೆಂಪು ಹೂವು)' },
        { icon: 'fa-fruit', name: 'ಹಣ್ಣುಗಳು', desc: 'ಬಾಳೆಹಣ್ಣು, ಸೇಬು, ಅಥವಾ ಯಾವುದೇ ಕಾಲೋಚಿತ ಹಣ್ಣು' },
        { icon: 'fa-candle', name: 'ಕರ್ಪೂರ / ತುಪ್ಪ ದೀಪ', desc: 'ದೀಪ ಅರತಿಗಾಗಿ' },
        { icon: 'fa-spice', name: 'ಕುಂಕುಮ / ಅರಿಶಿನ', desc: 'ಕುಂಕುಮ ಮತ್ತು ಅರಿಶಿನ ಪುಡಿ' },
        { icon: 'fa-coin', name: 'ದಕ್ಷಿಣೆ', desc: 'ನಗದು ಅರ್ಪಣೆ (ನಿಮ್ಮ ಇಚ್ಛೆಯಂತೆ)' },
      ],
      tips: [
        'ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಗೆ ಧರಿಸಿ (ಮಹಿಳೆಯರಿಗೆ ಸೀರೆ, ಪುರುಷರಿಗೆ ಧೋತಿ)',
        'ದೇವಸ್ಥಾನದ ಆವರಣಕ್ಕೆ ಪ್ರವೇಶಿಸುವ ಮೊದಲು ಪಾದರಕ್ಷೆಗಳನ್ನು ತೆಗೆಯಿರಿ',
        'ದೇವಸ್ಥಾನದೊಳಗೆ ಮೌನ ಮತ್ತು ಭಕ್ತಿಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ',
        'ದೇವಸ್ಥಾನದೊಳಗೆ ಚರ್ಮದ ವಸ್ತುಗಳನ್ನು (ಬೆಲ್ಟ್, ಬ್ಯಾಗ್) ತಪ್ಪಿಸಿ',
        'ಮೊಬೈಲ್ ಫೋನ್ಗಳನ್ನು ಸ್ವಿಚ್ ಆಫ್ ಮಾಡಿ ಅಥವಾ ಮೌನ ಮೋಡ್ನಲ್ಲಿ ಇರಿಸಿ',
        'ಎಲ್ಲಾ ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು ಯಡಿಯೂರು ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಲಭ್ಯ'
      ]
    }
  };

  const currentCarryItems = language === 'kn' ? whatToCarry.kn : whatToCarry.en;

  return (
    <div id="PlansToVisit" className="min-h-screen bg-[#fcf8f2]">
      {/* Tab Navigation */}
      <div className="shadow-md border-b border-[#f1c40f]/20 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 sm:gap-4 py-3 min-w-max">
            {[
              { id: 'overview', icon: 'fa-info-circle', label: language === 'kn' ? 'ಅವಲೋಕನ' : 'Overview' },
              { id: 'pooja', icon: 'fa-praying-hands', label: language === 'kn' ? 'ಪೂಜಾ ಸೇವೆಗಳು' : 'Pooja Services' },
              { id: 'attractions', icon: 'fa-map-marked-alt', label: language === 'kn' ? 'ಪ್ರವಾಸಿ ಸ್ಥಳಗಳು' : 'Attractions' },
              { id: 'travel', icon: 'fa-bus', label: language === 'kn' ? 'ಪ್ರಯಾಣ ಮಾಹಿತಿ' : 'Travel Info' },
              { id: 'plan', icon: 'fa-calendar-check', label: language === 'kn' ? 'ಪ್ರವಾಸ ಯೋಜನೆಗಳು' : 'Visit Plans' },
              { id: 'timings', icon: 'fa-clock', label: language === 'kn' ? 'ಸಮಯಗಳು' : 'Timings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1 sm:gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#d35400] text-white shadow-lg'
                    : 'text-[#4e342e] hover:bg-[#d35400]/10'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            {/* How to Reach */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#d35400] mb-4 flex items-center gap-2">
                <i className="fas fa-route"></i>
                {language === 'kn' ? 'ಹೇಗೆ ತಲುಪುವುದು' : 'How to Reach'}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-[#f1c40f]/20 hover:shadow-xl transition-shadow">
                  <i className="fas fa-bus text-3xl text-[#d35400] mb-3"></i>
                  <h3 className="font-bold text-lg mb-1">{language === 'kn' ? 'ಬಸ್ ಮೂಲಕ' : 'By Bus'}</h3>
                  <p className="text-gray-600 text-sm">{currentTravel.busFromBangalore}</p>
                  <div className="mt-2 text-xs text-[#d35400] font-medium">
                    <i className="fas fa-clock mr-1"></i>
                    {language === 'kn' ? 'ದಿನವಿಡೀ ಆಗಾಗ್ಗೆ ಸೇವೆ' : 'All day frequent service'}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-[#f1c40f]/20 hover:shadow-xl transition-shadow">
                  <i className="fas fa-motorcycle text-3xl text-[#d35400] mb-3"></i>
                  <h3 className="font-bold text-lg mb-1">{language === 'kn' ? 'ಆಟೋ ಮೂಲಕ' : 'By Auto'}</h3>
                  <p className="text-gray-600 text-sm">{currentTravel.autoFromYadiyur}</p>
                  <div className="mt-2 text-xs text-[#d35400] font-medium">
                    <i className="fas fa-rupee-sign mr-1"></i>
                    {currentTravel.autoCost}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-[#f1c40f]/20 hover:shadow-xl transition-shadow">
                  <i className="fas fa-car text-3xl text-[#d35400] mb-3"></i>
                  <h3 className="font-bold text-lg mb-1">{language === 'kn' ? 'ಕಾರು ಮೂಲಕ' : 'By Car'}</h3>
                  <p className="text-gray-600 text-sm">{currentTravel.nearbyCars}</p>
                  <div className="mt-2 text-xs text-[#d35400] font-medium">
                    <i className="fas fa-map-pin mr-1"></i>
                    {language === 'kn' ? 'ಸ್ಥಳೀಯ ಪ್ರವಾಸಕ್ಕೆ ಲಭ್ಯ' : 'Available for local sightseeing'}
                  </div>
                </div>
              </div>
            </div>

            {/* What to Carry */}
            <div>
              <h2 className="text-2xl font-bold text-[#d35400] mb-4 flex items-center gap-2">
                <i className="fas fa-suitcase"></i>
                {language === 'kn' ? 'ಏನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು' : 'What to Carry'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-[#f1c40f]/20">
                  <h3 className="font-bold text-lg mb-3 text-[#d35400]">
                    {language === 'kn' ? 'ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು' : 'Pooja Items'}
                  </h3>
                  <ul className="space-y-3">
                    {currentCarryItems.items.map((item: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 p-2 hover:bg-[#f1c40f]/5 rounded-lg transition-colors">
                        <i className={`fas ${item.icon} text-[#d35400] mt-1`}></i>
                        <div>
                          <p className="font-medium text-[#4e342e]">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#f1c40f]/10 p-6 rounded-xl border border-[#f1c40f]/30">
                  <h3 className="font-bold text-lg mb-3 text-[#d35400] flex items-center gap-2">
                    <i className="fas fa-lightbulb"></i>
                    {language === 'kn' ? 'ಪ್ರಮುಖ ಸಲಹೆಗಳು' : 'Important Tips'}
                  </h3>
                  <ul className="space-y-2">
                    {currentCarryItems.tips.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#4e342e]">
                        <span className="text-[#d35400]">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pooja Services Tab */}
        {activeTab === 'pooja' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-[#d35400] mb-4 flex items-center gap-2">
              <i className="fas fa-praying-hands"></i>
              {language === 'kn' ? 'ಪೂಜಾ ಸೇವೆಗಳು' : 'Pooja Services'}
            </h2>
            <div className="bg-[#f1c40f]/10 p-4 rounded-lg mb-6 border border-[#f1c40f]/30">
              <p className="text-sm text-[#4e342e]">
                <i className="fas fa-info-circle text-[#d35400] mr-2"></i>
                {language === 'kn' 
                  ? 'ಎಲ್ಲಾ ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು ಯಡಿಯೂರು ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಲಭ್ಯವಿದೆ. ದಯವಿಟ್ಟು ಪೂಜೆಗೆ ೧ ಗಂಟೆ ಮುಂಚಿತವಾಗಿ ಆಗಮಿಸಿ.' 
                  : 'All pooja items are available in Yadiyur market. Please arrive 1 hour before the pooja.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPoojas.map((pooja: any) => (
                <div
                  key={pooja.id}
                  onClick={() => setSelectedPooja(selectedPooja === pooja.id ? null : pooja.id)}
                  className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                    selectedPooja === pooja.id 
                      ? 'border-[#f1c40f] shadow-xl transform scale-102' 
                      : 'border-transparent hover:border-[#d35400]/30 hover:shadow-xl'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-[#4e342e]">{pooja.name}</h3>
                      <span className="text-[#d35400] font-bold text-sm bg-[#d35400]/10 px-2 py-1 rounded">
                        {pooja.cost}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{pooja.description}</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p><span className="font-medium">{language === 'kn' ? 'ಅವಧಿ:' : 'Duration:'}</span> {pooja.duration}</p>
                    </div>
                    {selectedPooja === pooja.id && (
                      <div className="mt-3 pt-3 border-t border-[#f1c40f]/30 animate-slide-down">
                        <p className="text-xs font-medium text-[#d35400] mb-1">
                          {language === 'kn' ? 'ಸಾಮಗ್ರಿಗಳು:' : 'Items:'}
                        </p>
                        <p className="text-xs text-gray-600 mb-2">{pooja.items}</p>
                        <p className="text-xs font-medium text-[#d35400] mb-1">
                          {language === 'kn' ? 'ಪ್ರಯೋಜನಗಳು:' : 'Benefits:'}
                        </p>
                        <p className="text-xs text-gray-600">{pooja.benefits}</p>
                        <button className="mt-3 w-full bg-[#d35400] text-white text-sm py-2 rounded-lg hover:bg-[#a04000] transition-colors">
                          {language === 'kn' ? 'ಪೂಜಾ ಬುಕ್ ಮಾಡಿ' : 'Book Pooja'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attractions Tab */}
        {activeTab === 'attractions' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-[#d35400] mb-4 flex items-center gap-2">
              <i className="fas fa-map-marked-alt"></i>
              {language === 'kn' ? 'ಹತ್ತಿರದ ಪ್ರವಾಸಿ ಸ್ಥಳಗಳು' : 'Nearby Attractions'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'kn' 
                ? 'ನಿಮ್ಮ ಭೇಟಿಯ ಸಮಯದಲ್ಲಿ ಅನ್ವೇಷಿಸಲು ಹತ್ತಿರದ ಸ್ಥಳಗಳು' 
                : 'Nearby places to explore during your visit'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {currentAttractions.map((attraction: any, idx: number) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-lg border border-[#f1c40f]/20 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <i className={`fas ${attraction.icon} text-[#d35400] text-xl`}></i>
                      <h3 className="font-bold text-[#4e342e]">{attraction.name}</h3>
                    </div>
                    <span className="text-xs bg-[#d35400]/10 text-[#d35400] px-2 py-1 rounded-full font-bold">
                      {attraction.distance}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{attraction.description}</p>
                  <span className="text-xs text-gray-400">
                    <i className="fas fa-tag mr-1"></i> {attraction.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Travel Info Tab - Updated with detailed hotels */}
        {activeTab === 'travel' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-[#d35400] mb-4 flex items-center gap-2">
              <i className="fas fa-bus"></i>
              {language === 'kn' ? 'ಪ್ರಯಾಣ ಮಾಹಿತಿ' : 'Travel Information'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bus Information */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-[#f1c40f]/20">
                <h3 className="font-bold text-lg mb-3 text-[#d35400] flex items-center gap-2">
                  <i className="fas fa-bus"></i>
                  {language === 'kn' ? 'ಬಸ್ ಮಾರ್ಗ ಮತ್ತು ಸಮಯ' : 'Bus Route & Timings'}
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-[#f1c40f]/5 rounded-lg">
                    <p className="text-sm font-medium text-[#4e342e]">📌 {currentTravel.busFromBangalore}</p>
                  </div>
                  <div className="p-3 bg-[#d35400]/5 rounded-lg border border-[#d35400]/20">
                    <p className="text-sm font-medium text-[#d35400]">
                      <i className="fas fa-clock mr-2"></i>
                      {language === 'kn' ? 'ಬೆಳಿಗ್ಗೆ: ೭, ೮:೩೦, ೧೦ | ಸಂಜೆ: ೩, ೪:೩೦, ೬' : 'Morning: 7, 8:30, 10 | Evening: 3, 4:30, 6'}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-[#4e342e]">
                      <i className="fas fa-check-circle text-green-600 mr-2"></i>
                      {currentTravel.autoFromYadiyur}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <i className="fas fa-rupee-sign mr-1"></i>
                      {currentTravel.autoCost}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-[#4e342e]">
                      <i className="fas fa-store text-blue-600 mr-2"></i>
                      {currentTravel.yadiyurFacilities}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hotels */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-[#f1c40f]/20">
                  <h3 className="font-bold text-lg mb-3 text-[#d35400] flex items-center gap-2">
                    <i className="fas fa-utensils"></i>
                    {language === 'kn' ? 'ಹತ್ತಿರದ ರೆಸ್ಟೋರೆಂಟ್ಗಳು' : 'Nearby Restaurants'}
                  </h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {currentTravel.hotels.map((hotel: any, idx: number) => (
                      <div key={idx} className="p-4 bg-[#f1c40f]/5 rounded-lg border border-[#f1c40f]/20 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-[#d35400]">🍽️ {hotel.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{hotel.rating}</p>
                          </div>
                          <span className="text-xs bg-[#d35400]/10 text-[#d35400] px-2 py-1 rounded-full">
                            {hotel.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{hotel.desc}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {hotel.features && hotel.features.map((feature: string, i: number) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-[#4e342e] mt-1">
                          <i className="fas fa-location-dot text-[#d35400] mr-1"></i>
                          {hotel.location}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          <i className="fas fa-utensil-spoon mr-1"></i>
                          {hotel.cuisine}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visit Plans Tab */}
        {activeTab === 'plan' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-[#d35400] mb-4 flex items-center gap-2">
              <i className="fas fa-calendar-check"></i>
              {language === 'kn' ? 'ಪ್ರವಾಸ ಯೋಜನೆಗಳು' : 'Suggested Visit Plans'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'kn' 
                ? 'ನಿಮ್ಮ ಸಮಯ ಮತ್ತು ಆಸಕ್ತಿಗೆ ಅನುಗುಣವಾಗಿ ಯೋಜನೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ' 
                : 'Choose a plan based on your time and interests'}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPlans.map((plan: any) => (
                <div key={plan.id} className="bg-white rounded-xl shadow-lg border border-[#f1c40f]/20 hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#d35400] mb-2">{plan.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-[#4e342e] uppercase mb-2 flex items-center gap-1">
                        <i className="fas fa-clock text-[#d35400]"></i>
                        {language === 'kn' ? 'ಸಮಯಾವಳಿ' : 'Schedule'}
                      </h4>
                      <ul className="space-y-1">
                        {plan.schedule.map((item: string, idx: number) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                            <span className="text-[#d35400]">▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-3 border-t border-[#f1c40f]/20">
                      <p className="text-xs text-[#d35400] font-medium">
                        <i className="fas fa-star mr-1"></i>
                        {language === 'kn' ? 'ಸೂಕ್ತ:' : 'Best For:'} {plan.bestFor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timings Tab */}
        {activeTab === 'timings' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-[#d35400] mb-4 flex items-center gap-2">
              <i className="fas fa-clock"></i>
              {language === 'kn' ? 'ದೇವಸ್ಥಾನದ ಸಮಯಗಳು' : 'Temple Timings'}
            </h2>
            
            <div className="bg-white rounded-xl shadow-lg border border-[#f1c40f]/20 overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-[#d35400] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      {language === 'kn' ? 'ದಿನ' : 'Day'}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      {language === 'kn' ? 'ಬೆಳಿಗ್ಗೆ' : 'Morning'}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      {language === 'kn' ? 'ಸಂಜೆ' : 'Evening'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1c40f]/20">
                  {currentTimings.days.map((time: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#f1c40f]/5 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-[#4e342e]">{time.day}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{time.morning}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{time.evening}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#f1c40f]/10 p-6 rounded-xl border border-[#f1c40f]/30">
              <h3 className="font-bold text-[#d35400] mb-2 flex items-center gap-2">
                <i className="fas fa-star"></i>
                {language === 'kn' ? 'ವಿಶೇಷ ದಿನಗಳು' : 'Special Days'}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {currentTimings.specialDays.map((day: string, idx: number) => (
                  <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-[#d35400] shadow-sm border border-[#f1c40f]/30">
                    {day}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <i className="fas fa-info-circle text-[#d35400] mr-1"></i>
                {currentTimings.note}
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default PlanYourVisit;