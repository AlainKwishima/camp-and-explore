import { TourDetail } from "@/types/tour";

export const mountJaliTourData: TourDetail = {
  id: "tour-1",
  slug: "mount-jali-hiking",
  title: "Mount Jali Guided Hiking & Panoramic Kigali Viewpoints",
  location: "Mount Jali, Kigali, Rwanda",
  rating: 4.9,
  reviewCount: 184,
  duration: "1.5 to 5 hours",
  price: 25.00,
  originalPrice: 35.00,
  currency: "USD",
  featuredImage: "/images/tours/mount-jali-hiking.jpg",
  images: [
    "/images/tours/mount-jali-hiking.jpg",
    "/images/tours/mount-jali-summit.jpg",
    "/images/tours/mount-jali-forest.jpg",
    "/images/tours/mount-jali-camp.jpg",
    "/images/tours/picnic.jpg",
  ],
  badges: ["Badge of Excellence", "Top Rated", "Likely to Sell Out"],
  categories: ["Adventure & Outdoors", "Hiking & Trails"],
  freeCancellation: true,
  pickupAvailable: true,
  description:
    "Explore Mount Jali on a guided outdoor adventure featuring forest trails, fresh air, and scenic viewpoints overlooking Kigali. Reach the summit ridge for breathtaking 360-degree panoramas, followed by post-hike refreshments at Camp & Explorer.",
  highlights: [
    "Reach the top of Mount Jali for spectacular panoramic views of Kigali city",
    "Guided walking through pine and eucalyptus forest trails",
    "Choice of 1–2h nature walk, 3h scenic hike, or full adventure trek",
    "Post-hike relaxation at Camp & Explorer with complimentary snacks and soft drinks",
    "Friendly local guide providing insights into Kigali's landscapes and community",
  ],
  overview:
    "Mount Jali stands as one of the most prominent natural landmarks guarding the northern skyline of Kigali. This guided outdoor hike takes you away from urban streets and onto peaceful mountain trails lined with forest groves, village ridge paths, and breathtaking viewpoints. Depending on visibility and your chosen route, you will see sweeping vistas of Kigali city, Nyabugogo valley, and Rwanda's famous rolling green hills. Whether you prefer a gentle 1–2-hour nature walk or an invigorating 3-hour summit hike, our experienced local guides ensure a safe, memorable, and inspiring experience for all fitness levels.",
  whyChooseThis: [
    "Unmatched panoramic vistas across Kigali from one of its highest peaks",
    "Snacks and soft drinks included at Camp & Explorer after your hike",
    "Flexible departure times throughout morning and afternoon",
    "All safety gear, trekking poles, and trail briefings included",
    "Directly supports local trail maintenance and community guides in Jali sector",
  ],
  inclusions: [
    "Professional certified local mountain guide",
    "Trekking poles / walking sticks",
    "Bottled mineral water for the trail",
    "Post-hike snacks and chilled soft drinks or spiced African tea at Camp & Explorer",
    "All trail and environmental conservation access fees",
    "Free secure parking and luggage storage at Camp & Explorer base",
  ],
  exclusions: [
    "Hotel transportation outside Kigali city center (available upon advance request)",
    "Heavy hiking boots (standard athletic/walking trainers are sufficient)",
    "Gratuities for guides (optional)",
    "Personal travel or medical insurance",
  ],
  departureDetails: {
    meetingPoint: "Camp & Explorer Base Pavilion",
    meetingAddress: "Mount Jali Road, Jali Sector, Gasabo District, Kigali, Rwanda",
    pickupNotes:
      "Located just 15 minutes north of Nyabugogo / Kigali city center. Easy access by car, taxi, or moto. If you require private round-trip hotel pickup, please message us via WhatsApp (+250 788 621 474) after booking.",
    returnDetails: "Returns to the original departure point at Camp & Explorer Base.",
  },
  itinerary: [
    {
      stopNumber: 1,
      title: "Camp & Explorer Welcome & Trailhead Briefing",
      duration: "15 minutes",
      description:
        "Meet your lead guide at the Camp & Explorer welcome pavilion. Receive lightweight walking poles, trail maps, safety instructions, and a briefing on the day's route and terrain.",
      admissionIncluded: true,
    },
    {
      stopNumber: 2,
      title: "Forest Canopy & Indigenous Nature Trail",
      duration: "45 minutes",
      description:
        "Hike along shaded forest trails featuring eucalyptus groves and indigenous trees. Learn about native birds, butterflies, and the reforestation efforts on Mount Jali.",
      admissionIncluded: true,
    },
    {
      stopNumber: 3,
      title: "Mid-Mountain Viewpoint over Kigali & Nyabugogo Valley",
      duration: "30 minutes",
      description:
        "Pause at a scenic rest outcrop offering wide panoramic views over the city of Kigali, the bustling Nyabugogo valley below, and distant mountain ridges.",
      admissionIncluded: true,
    },
    {
      stopNumber: 4,
      title: "Mount Jali Summit Ridge & 360-Degree Lookout",
      duration: "45 minutes",
      description:
        "Climb the final ridgeline to the summit area. Enjoy refreshing mountain breezes and breathtaking 360-degree vistas across Gasabo district and the Rwandan thousand hills. Ample time for group and solo photographs.",
      admissionIncluded: true,
    },
    {
      stopNumber: 5,
      title: "Descent & Refreshment Lounge at Camp & Explorer",
      duration: "30 minutes",
      description:
        "Follow a gentle descent path through upper village farmsteads back to Camp & Explorer. Unwind in the shaded garden lounge with complimentary chilled soft drinks, fresh tropical fruits, and artisanal Rwandan snacks.",
      admissionIncluded: true,
    },
  ],
  packageOptions: [
    {
      id: "opt-1",
      title: "1–2 Hour Nature Walk (Relaxed Pace)",
      duration: "1.5 hours",
      startTime: "08:00 AM",
      price: 25.00,
      description:
        "A gentle and scenic exploration along lower and mid-mountain trails. Ideal for families with younger children, casual walkers, and anyone wanting fresh air without steep inclines.",
      features: [
        "Gentle, comfortable elevation gain",
        "Scenic midpoint viewpoint of Kigali",
        "Trekking poles & bottled water",
        "Post-walk refreshments at Camp & Explorer",
      ],
    },
    {
      id: "opt-2",
      title: "3-Hour Scenic Summit Hike (Most Popular)",
      duration: "3 hours",
      startTime: "09:00 AM",
      price: 38.00,
      description:
        "Our signature mountain experience. Climb through shaded forest paths to the summit ridge for breathtaking panoramic views of Kigali city, followed by full refreshments at the base.",
      features: [
        "Summit ridge panoramic viewpoints",
        "Moderate exercise with regular scenic breathers",
        "Snacks and soft drinks included",
        "Guided commentary on Kigali history and geography",
      ],
    },
    {
      id: "opt-3",
      title: "Full Adventure Trek (4–5 Hours Endurance)",
      duration: "4.5 hours",
      startTime: "08:00 AM",
      price: 55.00,
      description:
        "An exhilarating wilderness route traversing Mount Jali's ridgeline and hidden valley hamlets. Designed for active adventure seekers and fitness enthusiasts.",
      features: [
        "Full mountain ridge traverse",
        "Challenging terrain and steep summit climbs",
        "Energy trail pack and hydration support",
        "Full post-hike meal tasting platter at Camp & Explorer",
      ],
    },
  ],
  reviewsList: [
    {
      id: "rev-1",
      author: "David M.",
      location: "London, UK",
      rating: 5,
      date: "November 2026",
      title: "The best view of Kigali you will ever find!",
      content:
        "Hiking Mount Jali with Camp & Explorer was easily the highlight of my trip to Rwanda! The guide Jean-Luc was incredibly knowledgeable and paced the walk perfectly. The views from the summit ridge looking over Kigali and the endless green hills are unforgettable. The cold drinks and passion fruit at the end hit the spot!",
      travelerType: "Solo",
      verified: true,
    },
    {
      id: "rev-2",
      author: "Claire & Thomas",
      location: "Brussels, Belgium",
      rating: 5,
      date: "October 2026",
      title: "Wonderful nature escape just minutes from downtown",
      content:
        "We did the 3-hour morning hike and it was brilliant. Fresh air, eucalyptus scent, very peaceful trails, and safe for everyone. The staff at Camp & Explorer made us feel so welcome. We also loved seeing the traditional craft setup and will definitely return for the camping experience!",
      travelerType: "Couples",
      verified: true,
    },
    {
      id: "rev-3",
      author: "Sarah K.",
      location: "Nairobi, Kenya",
      rating: 5,
      date: "October 2026",
      title: "Great family outing and fantastic guides",
      content:
        "We took our two teenage boys for the Saturday morning hike. They loved using the walking sticks and taking photos at the summit. The guide answered all our questions about Rwandan culture and nature. Very well organized and friendly.",
      travelerType: "Families",
      verified: true,
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "What fitness level is required for the Mount Jali hike?",
      answer:
        "We offer routes for every fitness level! The 1–2-hour nature walk is gentle and suitable for beginners, seniors, and children. The 3-hour summit hike requires moderate fitness with comfortable breaks along the way. The 4–5-hour adventure trek is geared toward active hikers.",
    },
    {
      id: "faq-2",
      question: "What should I wear and bring on the hike?",
      answer:
        "Wear comfortable athletic shoes or running trainers with good traction (specialist heavy hiking boots are not strictly necessary). Bring a government-issued photo ID, a sun hat, sunglasses, and a lightweight rain jacket in case of mountain mist. We provide trekking poles, bottled water, and trail snacks.",
    },
    {
      id: "faq-3",
      question: "How do I get to Camp & Explorer at Mount Jali from central Kigali?",
      answer:
        "Camp & Explorer is located in Jali Sector, Gasabo District, approximately 15 minutes north of Nyabugogo / Kigali city center. The access road is accessible by private car, ride-hailing services, or taxi. If you prefer round-trip hotel transfer, you can request it through our booking form or WhatsApp (+250 788 621 474).",
    },
    {
      id: "faq-4",
      question: "Can dietary restrictions or allergies be accommodated for the refreshments?",
      answer:
        "Yes, absolutely! All post-hike refreshments include fresh local fruits, bottled beverages, and herbal infusions that are naturally vegetarian, vegan, and gluten-free. If you have specific nut allergies or requests, you can indicate them in our Special Requirements booking form.",
    },
  ],
  additionalInfo: [
    "Confirmation is provisionally held immediately upon booking; no payment is charged today.",
    "Children aged 4 to 17 enjoy a 25% discount and must be accompanied by an adult.",
    "Restrooms, secure bag storage, and shaded rest lounges are available at the Camp & Explorer base.",
    "Tours operate rain or shine; lightweight poncho/rain jackets are provided in case of sudden showers.",
  ],
  cancellationPolicy:
    "Free cancellation up to 24 hours before the scheduled tour departure time for a full 100% refund.",
};
