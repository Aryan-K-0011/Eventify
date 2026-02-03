import { EventCategory, Testimonial, Vendor } from './types';

// Curated Unsplash Images for Ultra-Luxury Vibe - UNIQUE PER COLLECTION
const IMAGES = {
  // Collections (Completely Distinct)
  weddings: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTF6Eq8V4wRcELB9VaDSV4d8dGjiLNSsQKcA&s', // Elegant Table
  corporate: 'https://select.dev/cdn-cgi/imagedelivery/1zmOcgV1p520E4lLTrYjjg/public/blog-cards/summit2024Cover.png/width=3840,quality=75', // High-tech Summit Hall
  galas: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2000&auto=format&fit=crop', // Champagne Toast
  concerts: 'https://img.freepik.com/premium-photo/orchestra-is-performing-stage-front-audience-audience-is-sitting-rows-seats-is-facing-stage_14117-476670.jpg', // Symphony Hall
  birthdays: 'https://cdn.7eventzz.com/19/1742210959835.webp', // Gold Balloons/Party
  workshops: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2000&auto=format&fit=crop', // Art/Focus
  
  // Vendors (Distinct from Collections)
  venue: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop', // Grand Hall
  catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2000&auto=format&fit=crop', // Fine Dining Plating
  photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTkG7RR78pXKEDCGfi26kojASsIlcndZajpA&s', // Camera Lens
  entertainment: 'https://www.shutterstock.com/shutterstock/videos/3943273793/thumb/1.jpg?ip=x480', // DJ Deck
  floral: 'https://thumbs.dreamstime.com/b/wedding-decor-table-fancy-guest-set-event-sets-flowers-pastel-color-mockup-art-photo-beautiful-red-roses-decorated-272472206.jpg', // Floral Arrangement

  // Avatars
  avatar1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  avatar2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  avatar3: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
};

export const CATEGORIES: EventCategory[] = [
  {
    id: '1',
    title: 'Royal Weddings',
    description: 'Bespoke ceremonies crafted for eternity.',
    iconName: 'Heart',
    imageUrl: IMAGES.weddings,
    expectedBudget: '$500k+',
    features: ['Royal Protocol Team', 'Cathedral & Palace Access', 'Bespoke Couture Coordination']
  },
  {
    id: '2',
    title: 'Executive Summits',
    description: 'High-stakes environments for global leaders.',
    iconName: 'Briefcase',
    imageUrl: IMAGES.corporate,
    expectedBudget: '$150k+',
    features: ['Diplomatic Level Security', 'Private Jet Logistics', 'Encrypted Comms Infrastructure']
  },
  {
    id: '3',
    title: 'Private Galas',
    description: 'Exclusive soirées for the distinguished few.',
    iconName: 'Gift',
    imageUrl: IMAGES.galas,
    expectedBudget: '$300k+',
    features: ['Michelin Star Catering', 'A-List Talent Booking', 'Global Media Management']
  },
  {
    id: '4',
    title: 'Symphony & Stage',
    description: 'Acoustic perfection for world-class performances.',
    iconName: 'Music',
    imageUrl: IMAGES.concerts,
    expectedBudget: '$200k+',
    features: ['Acoustic Engineering', 'World-Class Scenography', 'Backstage VIP Hospitality']
  },
  {
    id: '5',
    title: 'Milestone Celebrations',
    description: 'Marking life\'s greatest moments with grandeur.',
    iconName: 'Cake',
    imageUrl: IMAGES.birthdays,
    expectedBudget: '$100k+',
    features: ['Immersive Storytelling', 'Rare Vintage Wines', 'Architectural Cake Design']
  },
  {
    id: '6',
    title: 'Masterclasses',
    description: 'Intimate educational experiences in luxury settings.',
    iconName: 'PenTool',
    imageUrl: IMAGES.workshops,
    expectedBudget: '$75k+',
    features: ['Celebrity Instructors', 'Luxury Material Kits', 'Intimate 1:1 Coaching']
  }
];

export const VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Château de Lumière',
    category: 'Venue',
    rating: 5.0,
    reviews: 124,
    priceRange: '$$$$',
    location: 'Parisian Quarter',
    imageUrl: IMAGES.venue,
    description: 'A historic estate featuring crystal chandeliers, gold-leaf ceilings, and manicured gardens.',
    services: ['White Glove Service', 'Valet', 'Private Security'],
    capacity: 450,
    established: 1789,
    amenities: ['Helipad', 'Private Suites', 'Historical Archives', 'Wine Cellar'],
    contactEmail: 'inquiries@chateaulumiere.fr'
  },
  {
    id: 'v2',
    name: 'Maison Culinaire',
    category: 'Catering',
    rating: 4.9,
    reviews: 89,
    priceRange: '$$$$',
    location: 'Metropolitan',
    imageUrl: IMAGES.catering,
    description: 'Michelin-star inspired menus tailored to the most refined palates.',
    services: ['Omakase', 'French Service', 'Sommelier'],
    capacity: 1000,
    established: 1995,
    amenities: ['Custom Menu Design', 'Mobile Kitchens', 'Mixology Bar', 'Sustainable Sourcing'],
    contactEmail: 'taste@maisonculinaire.com'
  },
  {
    id: 'v3',
    name: 'Vogue Lens',
    category: 'Photography',
    rating: 4.8,
    reviews: 56,
    priceRange: '$$$',
    location: 'International',
    imageUrl: IMAGES.photo,
    description: 'Editorial style photography that belongs in a fashion magazine.',
    services: ['Drone', 'Film Photography', 'Same-Day Edit'],
    capacity: 1,
    established: 2012,
    amenities: ['Fine Art Prints', 'Private Gallery', 'Multi-day Coverage', 'Styling Assistant'],
    contactEmail: 'bookings@voguelens.com'
  },
  {
    id: 'v4',
    name: 'Velvet Sound',
    category: 'Entertainment',
    rating: 4.9,
    reviews: 210,
    priceRange: '$$$',
    location: 'City Center',
    imageUrl: IMAGES.entertainment,
    description: 'Curated auditory experiences from live orchestras to celebrity DJs.',
    services: ['Acoustic', 'Full Band', 'Sound Engineering'],
    capacity: 5000,
    established: 2008,
    amenities: ['Custom Playlists', 'Stage Lighting', 'Silent Disco', 'Vinyl Sets'],
    contactEmail: 'listen@velvetsound.com'
  },
  {
    id: 'v5',
    name: 'Botanic Artistry',
    category: 'Decor',
    rating: 5.0,
    reviews: 45,
    priceRange: '$$$$',
    location: 'Design District',
    imageUrl: IMAGES.floral,
    description: 'Sculptural floral installations that defy gravity and imagination.',
    services: ['Installations', 'Centerpieces', 'Set Design'],
    capacity: 200,
    established: 2018,
    amenities: ['Rare Bloom Sourcing', 'Structural Engineering', 'Preservation Service', 'Fragrance Design'],
    contactEmail: 'design@botanicartistry.com'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Victoria St. James',
    role: 'Philanthropist',
    comment: 'Eventify understands that luxury is not just about cost, but about flawless execution. My gala was impeccable.',
    avatarUrl: IMAGES.avatar1
  },
  {
    id: 't2',
    name: 'Alexander Sterling',
    role: 'CEO, Sterling Corp',
    comment: 'We secured a venue that wasn’t even listed publicly. The level of access this platform provides is unmatched.',
    avatarUrl: IMAGES.avatar2
  },
  {
    id: 't3',
    name: 'Isabella Rossellini',
    role: 'Fashion Editor',
    comment: 'Visually stunning and incredibly intuitive. The AI concierge feels like speaking to a seasoned planner.',
    avatarUrl: IMAGES.avatar3
  }
];