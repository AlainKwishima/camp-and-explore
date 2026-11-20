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
