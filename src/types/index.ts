export type PageId =
  | 'home'
  | 'login'
  | 'dashboard'
  | 'assistant'
  | 'farm'
  | 'crop-health'
  | 'weather'
  | 'soil-health'
  | 'market'
  | 'services'
  | 'service-detail'
  | 'community'
  | 'profile';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  farmSize: number;
  experience: number;
  avatar: string;
  crops: string[];
  soilType: string;
  irrigationType: string;
  joinedDate: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface WeatherDay {
  day: string;
  date: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  rainChance: number;
}

export interface SoilReading {
  id: string;
  zone: string;
  moisture: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  temperature: number;
  ec: number;
  status: 'healthy' | 'warning' | 'critical';
}

export interface CropPlot {
  id: string;
  name: string;
  tamilName: string;
  area: number;
  stage: string;
  stageNumber: number;
  plantedDate: string;
  expectedHarvest: string;
  healthScore: number;
  image: string;
  variety: string;
  daysInStage: number;
  stageDuration: number;
}

export interface CropStage {
  name: string;
  tamilName: string;
  days: string;
  description: string;
  tips: string[];
}

export interface DiseaseAlert {
  id: string;
  crop: string;
  disease: string;
  tamilName: string;
  severity: 'low' | 'medium' | 'high';
  detectedDate: string;
  status: 'pending' | 'treating' | 'resolved';
  recommendation: string;
  image: string;
}

export interface MarketPrice {
  id: string;
  crop: string;
  tamilName: string;
  unit: string;
  price: number;
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  market: string;
  lastUpdated: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  tamilName: string;
  icon: string;
  description: string;
  color: string;
}

export interface ServiceProvider {
  id: string;
  categoryId: string;
  name: string;
  provider: string;
  rating: number;
  reviews: number;
  price: number;
  priceUnit: string;
  availability: string;
  distance: number;
  image: string;
  description: string;
  features: string[];
  experience: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  notes: string;
}

export interface NotificationItem {
  id: string;
  type: 'weather' | 'pest' | 'market' | 'booking' | 'tip' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  role: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  time: string;
  tags: string[];
  liked: boolean;
}

export interface Expert {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  consultations: number;
  avatar: string;
  available: boolean;
}

export interface ReportItem {
  id: string;
  title: string;
  type: string;
  date: string;
  summary: string;
  metrics: { label: string; value: string }[];
}
