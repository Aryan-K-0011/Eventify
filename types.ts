export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  priceRange: '$$' | '$$$' | '$$$$';
  location: string;
  imageUrl: string;
  description: string;
  services: string[];
}

export interface EventCategory {
  id: string;
  title: string;
  description: string;
  iconName: string; // Mapping to Lucide icons
  imageUrl: string;
  expectedBudget: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatarUrl: string;
}

export interface Inquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  type: string;
  budget?: string;
  message: string;
  status: 'New' | 'Reviewing' | 'Approved' | 'Rejected';
  timestamp: string;
}

export enum LoadState {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}