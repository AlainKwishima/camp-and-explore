export interface Tour {
  id: string;
  slug: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  originalPrice?: number;
  currency: string;
  featuredImage: string;
  images: string[];
  badges: string[]; // e.g. "Likely to Sell Out", "Badge of Excellence"
  categories: string[];
  freeCancellation: boolean;
  pickupAvailable: boolean;
  description: string;
  highlights: string[];
}

export interface PackageOption {
  id: string;
  title: string;
  duration: string;
  startTime: string;
  price: number;
  description: string;
  features: string[];
}

export interface ItineraryStop {
  stopNumber: number;
  title: string;
  duration: string;
  description: string;
  admissionIncluded: boolean;
}

export interface Review {
  id: string;
  author: string;
  location?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  travelerType: string; // e.g. "Couples", "Families", "Friends", "Solo"
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TourDetail extends Tour {
  overview: string;
  whyChooseThis: string[];
  inclusions: string[];
  exclusions: string[];
  departureDetails: {
    meetingPoint: string;
    meetingAddress: string;
    pickupNotes: string;
    returnDetails: string;
  };
  itinerary: ItineraryStop[];
  packageOptions: PackageOption[];
  reviewsList: Review[];
  faqs: FaqItem[];
  additionalInfo: string[];
  cancellationPolicy: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  duration: string[];
  minRating: number;
  freeCancellationOnly: boolean;
  likelyToSellOutOnly: boolean;
  sortBy: "featured" | "price-asc" | "price-desc" | "rating" | "duration";
}

export interface SpecialRequirements {
  // Food allergies & dietary restrictions
  dietaryRestrictions: string[];
  otherDietaryOrAllergies?: string;

  // Special needs & accessibility
  accessibilityNeeds: string[];
  otherSpecialNeeds?: string;

  // Items to bring & preparations
  itemsToBringOrPrepare: string[];
  equipmentOrLuggageNotes?: string;

  // Other relevant information or requests
  otherRequests?: string;
}

export interface CustomerBooking {
  id: string; // e.g. "CE-2026-8492"
  tourTitle: string;
  packageId: string;
  packageTitle: string;
  departureDate: string;
  departureTime: string;
  adults: number;
  children: number;
  totalTravelers: number;
  totalPrice: number;
  currency: string;

  // Lead customer contact
  leadTraveler: {
    fullName: string;
    email: string;
    phone: string;
  };

  // Special requirements captured for team review
  specialRequirements: SpecialRequirements;

  status: "confirmed" | "provisionally_held";
  createdAt: string;
}

