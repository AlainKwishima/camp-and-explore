import { TourDetail } from "@/types/tour";

export const versaillesTourData: TourDetail = {
  id: "versailles-palace-tour",
  slug: "versailles-palace-tour",
  title: "From Paris: Versailles Palace Live Tour with Gardens Access",
  location: "Paris, France",
  rating: 4.4,
  reviewCount: 3421,
  duration: "4 to 9 hours",
  price: 108.50,
  originalPrice: 120.00,
  currency: "USD",
  featuredImage: "/images/tours/versailles-hero.jpg",
  images: [
    "/images/tours/versailles-hero.jpg",
    "/images/tours/versailles-mirrors.jpg",
    "/images/tours/versailles-gardens.jpg",
    "/images/tours/versailles-facade.jpg",
    "/images/tours/versailles-fountain.jpg",
    "/images/tours/versailles-bedroom.jpg",
  ],
  badges: ["Badge of Excellence", "Likely to Sell Out"],
  categories: ["Day Trips", "Historical Tours", "Cultural & Theme Tours", "Palaces & Castles"],
  freeCancellation: true,
  pickupAvailable: false,
  description:
    "Immerse yourself in royal French grandeur with a half- or full-day excursion from Paris to the UNESCO-listed Palace of Versailles. Travel in comfort aboard an air-conditioned coach and bypass the lengthy entrance lines with pre-reserved timed tickets. Follow a certified expert guide through the gilded State Apartments, the breathtaking Hall of Mirrors, and the King's Bedchamber. Afterward, take your time wandering through the world-famous French formal gardens, admiring fountain sculptures and manicured groves.",
  highlights: [
    "Skip the standard ticket queues with priority timed entry to Versailles Palace",
    "Marvel at the opulent 357-mirror gallery inside the iconic Hall of Mirrors",
    "Discover French royal intrigue and history with an engaging live professional guide",
    "Explore André Le Nôtre's majestic 2,000-acre formal gardens and fountain groves",
    "Convenient round-trip transportation from central Paris by air-conditioned executive coach",
    "Audio headsets provided so you never miss a word from your guide",
  ],
  overview:
    "Step into the extravagant world of Louis XIV, the Sun King, on this top-rated guided tour of the Palace and Estate of Versailles from Paris. Meeting near the Eiffel Tower, board a modern luxury coach for the direct 45-minute journey out to the royal estate. Upon arrival, your guide leads your group straight past the general public queues into the palace.\n\nInside, wander through the King and Queen's State Apartments, where lavish velvet tapestries, gold leaf trim, and ceiling frescoes capture the height of French classical architecture. Stand in awe beneath the crystal chandeliers of the Hall of Mirrors, where the historic Treaty of Versailles was signed in 1919.\n\nDepending on the option selected, enjoy free time to marvel at the sprawling gardens, fountain water spectacles, or extend your visit to the intimate Estate of Trianon and Marie Antoinette's idyllic Queen's Hamlet before boarding your return coach to central Paris.",
  whyChooseThis: [
    "Over 3,400 five-star verified traveler reviews praise our expert, bilingual guides",
    "Guaranteed timed entry avoids the multi-hour general admission queues",
    "Stress-free transport: skip confusing commuter RER trains with direct coach travel",
    "Includes garden admission ticket, valid for Musical Gardens and Fountain Shows",
  ],
  inclusions: [
    "Round-trip transportation from Paris by air-conditioned coach",
    "Timed-entry admission ticket to the Palace of Versailles",
    "Access to the State Apartments and Hall of Mirrors",
    "Professional English-speaking licensed guide (or multilingual options)",
    "Personal headset to hear the guide clearly throughout the tour",
    "Access to the Versailles Gardens (including Musical Gardens / Fountain Shows on operating days)",
    "Admission to the Estate of Trianon and Queen's Hamlet (Full-Day Option only)",
  ],
  exclusions: [
    "Hotel pickup and drop-off (departure from central meeting point)",
    "Food and beverages (cafes available inside the estate)",
    "Gratuities for the guide and driver (optional)",
    "Luggage storage or golf cart rentals in the gardens",
  ],
  departureDetails: {
    meetingPoint: "Central Paris Meeting Point (near Pullman Paris Tour Eiffel)",
    meetingAddress: "18 Avenue de Suffren, 75015 Paris, France (Metro: Bir-Hakeim / Champ de Mars)",
    pickupNotes:
      "Please arrive at the departure point 15 minutes prior to your tour departure time. Look for the tour coordinators holding signboards with the tour logo outside the main entrance.",
    returnDetails: "Returns to the original departure point in central Paris.",
  },
  itinerary: [
    {
      stopNumber: 1,
      title: "Departure from Central Paris",
      duration: "45 minutes",
      description:
        "Meet your friendly host and guide in the 15th arrondissement near the Eiffel Tower. Settle into comfortable seating aboard a climate-controlled executive motorcoach and enjoy scenic views as you leave the city and journey southwest into the Yvelines region.",
      admissionIncluded: true,
    },
    {
      stopNumber: 2,
      title: "Palace of Versailles: State Apartments & Hall of Mirrors",
      duration: "2 hours",
      description:
        "Bypass the main general admission queues with priority group access. Walk through the dazzling King's State Apartments, the Council Chamber, and the Queen's Bedchamber. Hear captivating stories of court intrigue, the French Revolution, and royal rituals. Conclude the interior visit gazing through the seventeen mirrored arches of the 73-meter-long Hall of Mirrors overlooking the Grand Canal.",
      admissionIncluded: true,
    },
    {
      stopNumber: 3,
      title: "The Gardens of Versailles & Fountain Groves",
      duration: "1.5 to 2 hours",
      description:
        "Head outdoors into the 800 hectares of manicured French royal parkland designed by André Le Nôtre. Stroll along the Grand Canal, through ornate marble statues, topiary hedges, and secluded bosquets. On select days, experience the famous Musical Gardens or Fountain Shows where classical Baroque music plays as water jets dance in unison.",
      admissionIncluded: true,
    },
    {
      stopNumber: 4,
      title: "Estate of Trianon & Queen's Hamlet (Full-Day Option)",
      duration: "2 hours",
      description:
        "For guests booked on the Full-Day package, continue across the royal estate to the Grand Trianon pink marble palace and the Petit Trianon. Discover Queen Marie Antoinette's picturesque rustic retreat, complete with thatched cottages, working farm mill, and serene lake.",
      admissionIncluded: true,
    },
    {
      stopNumber: 5,
      title: "Return Coach Journey to Paris",
      duration: "45 minutes",
      description:
        "Regroup at the designated coach bay outside the palace gates. Relax on the comfortable return drive back to the original meeting point near the Eiffel Tower.",
      admissionIncluded: true,
    },
  ],
  packageOptions: [
    {
      id: "half-day-morning",
      title: "Half-Day Morning Tour with Live Guide & Gardens",
      duration: "4.5 hours",
      startTime: "08:45 AM",
      price: 108.50,
      description: "Beat the afternoon crowds with early morning palace access, certified guide, coach transport, and garden entry.",
      features: [
        "Palace timed entry ticket",
        "Guided tour with live English guide",
        "Access to formal gardens",
        "Round-trip coach from Eiffel Tower",
      ],
    },
    {
      id: "half-day-afternoon",
      title: "Half-Day Afternoon Tour with Live Guide & Gardens",
      duration: "4.5 hours",
      startTime: "01:30 PM",
      price: 114.00,
      description: "Relaxed afternoon departure perfect for a leisurely morning in Paris before an enchanting royal visit.",
      features: [
        "Afternoon departure",
        "Palace timed entry ticket",
        "Live guided palace interior tour",
        "Gardens access with fountain displays",
        "Round-trip coach transport",
      ],
    },
    {
      id: "full-day-complete",
      title: "Full-Day Complete Royal Estate (Palace, Gardens, Trianon & Hamlet)",
      duration: "8.5 hours",
      startTime: "09:00 AM",
      price: 152.00,
      description: "The complete immersion: covers the main palace, extensive gardens, plus Marie Antoinette's Estate of Trianon & Hamlet.",
      features: [
        "Full estate passport ticket",
        "Extended guided tour & free time",
        "Palace of Versailles & Hall of Mirrors",
        "Grand & Petit Trianon admission",
        "Queen's Hamlet access",
        "Return coach transport",
      ],
    },
    {
      id: "private-small-group",
      title: "Small-Group VIP Experience (Max 8 Guests)",
      duration: "5 hours",
      startTime: "08:30 AM",
      price: 210.00,
      description: "Intimate small group experience in a luxury Mercedes minivan with tailored commentary from a master historian.",
      features: [
        "Strictly limited to 8 guests",
        "Luxury Mercedes minivan transport",
        "Hotel pickup within central Paris",
        "Dedicated master historian guide",
        "Skip-the-line VIP entry",
      ],
    },
  ],
  reviewsList: [
    {
      id: "rev-1",
      author: "Sarah M.",
      location: "United States",
      rating: 5,
      date: "October 2026",
      title: "Phenomenal guide made history come alive!",
      content:
        "Our guide, Julien, was absolute perfection! He shared so many fascinating insights and royal anecdotes that you simply wouldn't discover wandering alone. The coach was super clean and right on schedule. The Hall of Mirrors took our breath away. Strongly recommend this tour!",
      travelerType: "Couples",
      verified: true,
    },
    {
      id: "rev-2",
      author: "David K.",
      location: "United Kingdom",
      rating: 5,
      date: "September 2026",
      title: "Seamless and stress-free trip to Versailles",
      content:
        "Taking the train to Versailles can be confusing and crowded. This coach tour made everything effortless. We skipped the enormous line outside, had crystal clear audio headsets, and had ample free time to walk through the gardens and fountain show. Exceptional value.",
      travelerType: "Families",
      verified: true,
    },
    {
      id: "rev-3",
      author: "Elena R.",
      location: "Canada",
      rating: 4,
      date: "August 2026",
      title: "Incredible palace, very well organized",
      content:
        "Versailles was quite busy inside as expected during peak summer, but our guide kept our group close together and navigated the rooms with great finesse. The gardens were spectacular. Would definitely book with Viator again.",
      travelerType: "Friends",
      verified: true,
    },
    {
      id: "rev-4",
      author: "Marcus T.",
      location: "Australia",
      rating: 5,
      date: "July 2026",
      title: "Best tour of our 2-week European vacation",
      content:
        "Everything was top notch from the coach driver to our guide Sophie. She was funny, articulate, and knew answers to every question. Seeing the Sun King's bedchamber and the glittering chandeliers in person was unforgettable.",
      travelerType: "Couples",
      verified: true,
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "Are tickets to the Palace and Gardens included in the price?",
      answer:
        "Yes, all listed options include priority timed-entry admission tickets to the Palace of Versailles as well as access to the formal gardens (including Musical Gardens / Fountain Shows when scheduled).",
    },
    {
      id: "faq-2",
      question: "What is the cancellation and refund policy?",
      answer:
        "You may cancel up to 24 hours in advance of the tour start time for a full 100% refund. Cancellations made within 24 hours of departure are non-refundable.",
    },
    {
      id: "faq-3",
      question: "Where exactly does the tour meet in Paris?",
      answer:
        "The standard meeting point is located in central Paris near the Eiffel Tower, directly outside 18 Avenue de Suffren, 75015 Paris (close to Metro stations Bir-Hakeim on line 6 and Champ de Mars-Tour Eiffel on RER C). Full directions and coordinator contact details are included in your confirmation voucher.",
    },
    {
      id: "faq-4",
      question: "Is this tour wheelchair accessible?",
      answer:
        "The Palace of Versailles itself is wheelchair accessible via elevators; however, the standard coach does not have a wheelchair lift and the cobblestone courtyards can be challenging. Please contact customer service prior to booking so we can arrange dedicated accessible transport.",
    },
    {
      id: "faq-5",
      question: "Can I bring luggage or large backpacks?",
      answer:
        "Large luggage, strollers, and backpacks exceeding 55 x 35 x 20 cm are strictly prohibited inside the Palace by security regulations and cannot be stored on the coach. Please leave large bags at your hotel.",
    },
  ],
  additionalInfo: [
    "Confirmation will be received at time of booking",
    "Not recommended for travelers with severe walking disabilities without private arrangement",
    "Comfortable walking shoes are strongly recommended as there is extensive walking across marble floors and gravel garden paths",
    "Infants aged 0-3 travel free of charge but must sit on an adult's lap on the coach",
    "Security checks at palace gates are mandatory for all visitors; wait times at security may vary during peak hours",
  ],
  cancellationPolicy: "For a full refund, cancel at least 24 hours before the tour's start date.",
};
