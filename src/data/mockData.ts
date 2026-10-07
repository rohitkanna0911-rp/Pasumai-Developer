import type {
  User, WeatherDay, SoilReading, CropPlot, CropStage,
  DiseaseAlert, MarketPrice, ServiceCategory, ServiceProvider,
  NotificationItem, CommunityPost, Expert, ReportItem, Booking,
} from '@/types';

export const mockUser: User = {
  id: 'u001',
  name: 'Karthik R',
  email: 'karthik.farmer@email.com',
  phone: '+91 98765 43210',
  village: 'Thiruvidaimarudur',
  district: 'Thanjavur',
  state: 'Tamil Nadu',
  farmSize: 3.5,
  experience: 12,
  avatar: 'KR',
  crops: ['Paddy', 'Groundnut', 'Black Gram'],
  soilType: 'Clay Loam',
  irrigationType: 'Drip Irrigation',
  joinedDate: '2024-06-15',
};

export const weatherData: WeatherDay[] = [
  { day: 'Today', date: 'Oct 7', tempHigh: 32, tempLow: 24, condition: 'Partly Cloudy', icon: 'cloud-sun', humidity: 68, windSpeed: 12, rainChance: 20 },
  { day: 'Tue', date: 'Oct 8', tempHigh: 34, tempLow: 25, condition: 'Sunny', icon: 'sun', humidity: 55, windSpeed: 8, rainChance: 5 },
  { day: 'Wed', date: 'Oct 9', tempHigh: 31, tempLow: 23, condition: 'Light Rain', icon: 'cloud-rain', humidity: 78, windSpeed: 15, rainChance: 65 },
  { day: 'Thu', date: 'Oct 10', tempHigh: 29, tempLow: 22, condition: 'Heavy Rain', icon: 'cloud-drizzle', humidity: 85, windSpeed: 22, rainChance: 85 },
  { day: 'Fri', date: 'Oct 11', tempHigh: 30, tempLow: 23, condition: 'Thunderstorm', icon: 'cloud-lightning', humidity: 82, windSpeed: 25, rainChance: 90 },
  { day: 'Sat', date: 'Oct 12', tempHigh: 33, tempLow: 24, condition: 'Partly Cloudy', icon: 'cloud-sun', humidity: 65, windSpeed: 10, rainChance: 30 },
  { day: 'Sun', date: 'Oct 13', tempHigh: 34, tempLow: 25, condition: 'Sunny', icon: 'sun', humidity: 52, windSpeed: 7, rainChance: 10 },
];

export const currentWeather = {
  temp: 31,
  feelsLike: 34,
  condition: 'Partly Cloudy',
  icon: 'cloud-sun',
  humidity: 68,
  windSpeed: 12,
  uvIndex: 7,
  visibility: 10,
  rainChance: 20,
  sunrise: '06:02',
  sunset: '17:58',
};

export const soilReadings: SoilReading[] = [
  { id: 's1', zone: 'Zone A – North Field', moisture: 42, ph: 6.8, nitrogen: 145, phosphorus: 38, potassium: 190, organicMatter: 1.8, temperature: 28, ec: 0.8, status: 'healthy' },
  { id: 's2', zone: 'Zone B – East Field', moisture: 28, ph: 5.5, nitrogen: 82, phosphorus: 22, potassium: 110, organicMatter: 1.2, temperature: 30, ec: 1.2, status: 'warning' },
  { id: 's3', zone: 'Zone C – South Field', moisture: 55, ph: 7.2, nitrogen: 160, phosphorus: 45, potassium: 210, organicMatter: 2.1, temperature: 27, ec: 0.6, status: 'healthy' },
  { id: 's4', zone: 'Zone D – West Field', moisture: 18, ph: 4.9, nitrogen: 60, phosphorus: 15, potassium: 85, organicMatter: 0.9, temperature: 32, ec: 1.8, status: 'critical' },
];

export const cropPlots: CropPlot[] = [
  { id: 'c1', name: 'Paddy', tamilName: 'நெல்', area: 2.0, stage: 'Tillering', stageNumber: 3, plantedDate: '2024-09-10', expectedHarvest: '2025-01-15', healthScore: 88, image: 'paddy', variety: 'CR 1009 Sub-1', daysInStage: 12, stageDuration: 35 },
  { id: 'c2', name: 'Groundnut', tamilName: 'கடலை', area: 1.0, stage: 'Flowering', stageNumber: 4, plantedDate: '2024-08-20', expectedHarvest: '2024-12-10', healthScore: 76, image: 'groundnut', variety: 'TMV 7', daysInStage: 8, stageDuration: 30 },
  { id: 'c3', name: 'Black Gram', tamilName: 'உழுந்து', area: 0.5, stage: 'Pod Filling', stageNumber: 5, plantedDate: '2024-09-01', expectedHarvest: '2024-11-28', healthScore: 91, image: 'blackgram', variety: 'ADT 3', daysInStage: 5, stageDuration: 25 },
];

export const cropStages: Record<string, CropStage[]> = {
  Paddy: [
    { name: 'Germination', tamilName: 'ுளைத்தல்', days: 'Day 1–7', description: 'Seeds sprout and first leaves emerge.', tips: ['Maintain water level at 2cm', 'Ensure proper drainage at night'] },
    { name: 'Seedling', tamilName: 'நாற்று', days: 'Day 8–25', description: 'Seedlings develop roots and tillers begin.', tips: ['Apply basal fertilizer', 'Keep nursery moist'] },
    { name: 'Tillering', tamilName: 'பத்து விடுதல்', days: 'Day 26–60', description: 'Multiple shoots develop from the base.', tips: ['Maintain 3-5cm water', 'Apply nitrogen in split doses', 'Monitor for stem borer'] },
    { name: 'Panicle Initiation', tamilName: 'கதிர் உருவாக்கம்', days: 'Day 61–80', description: 'Flower clusters begin forming.', tips: ['Apply potash fertilizer', 'Maintain steady water level'] },
    { name: 'Flowering', tamilName: 'பூக்கும்', days: 'Day 81–95', description: 'Florets open and pollination occurs.', tips: ['Avoid pesticide spray', 'Maintain 5cm water'] },
    { name: 'Grain Filling', tamilName: 'தானிய நிரப்புதல்', days: 'Day 96–115', description: 'Grains fill and ripen.', tips: ['Monitor for blast disease', 'Maintain water until grains mature'] },
    { name: 'Harvest', tamilName: 'அறுவடை', days: 'Day 116–130', description: 'Grains mature to golden yellow.', tips: ['Drain field 10 days before harvest', 'Harvest at 20-22% moisture'] },
  ],
  Groundnut: [
    { name: 'Germination', tamilName: 'முளைத்தல்', days: 'Day 1–10', description: 'Seeds sprout and cotyledons emerge.', tips: ['Sow at 5cm depth', 'Maintain soil moisture'] },
    { name: 'Vegetative', tamilName: 'இலை வளர்ச்சி', days: 'Day 11–30', description: 'Leaves and branches develop.', tips: ['Apply gypsum', 'Weed control is critical'] },
    { name: 'Flowering', tamilName: 'பூக்கும்', days: 'Day 31–50', description: 'Flowers appear and pegs begin forming.', tips: ['Irrigate at flowering', 'Apply boron for pod set'] },
    { name: 'Pegging', tamilName: 'ஆணி இறக்கம்', days: 'Day 51–70', description: 'Pegs penetrate soil and pods develop.', tips: ['Keep soil loose', 'Hill up around plants'] },
    { name: 'Pod Development', tamilName: 'காய் வளர்ச்சி', days: 'Day 71–95', description: 'Pods fill and mature underground.', tips: ['Maintain adequate moisture', 'Watch for aflatoxin risk'] },
    { name: 'Harvest', tamilName: 'அறுவடை', days: 'Day 96–110', description: 'Pods mature and leaves yellow.', tips: ['Harvest at right moisture', 'Dry pods properly'] },
  ],
  'Black Gram': [
    { name: 'Germination', tamilName: 'முளைத்தல்', days: 'Day 1–7', description: 'Seeds germinate and emerge.', tips: ['Treat seeds with Rhizobium', 'Maintain moisture'] },
    { name: 'Vegetative', tamilName: 'இலை வளர்ச்சி', days: 'Day 8–25', description: 'Plant grows and branches.', tips: ['Apply basal fertilizer', 'Weed at 20 days'] },
    { name: 'Flowering', tamilName: 'பூக்கும்', days: 'Day 26–40', description: 'Flowers appear.', tips: ['Irrigate if dry', 'Monitor for sucking pests'] },
    { name: 'Pod Filling', tamilName: 'காய் நிரப்புதல்', days: 'Day 41–60', description: 'Pods develop and fill.', tips: ['Spray 2% DAP if needed', 'Protect from pod borer'] },
    { name: 'Harvest', tamilName: 'அறுவடை', days: 'Day 61–75', description: 'Pods mature and turn black.', tips: ['Harvest when 80% pods are black', 'Thresh after drying'] },
  ],
};

export const diseaseAlerts: DiseaseAlert[] = [
  { id: 'd1', crop: 'Paddy', disease: 'Brown Spot', tamilName: 'பழுப்புப் புள்ளி', severity: 'medium', detectedDate: '2024-10-05', status: 'treating', recommendation: 'Apply Mancozeb @ 2.5g/L at 10-day intervals. Improve nitrogen management and ensure proper drainage.', image: 'brown-spot' },
  { id: 'd2', crop: 'Groundnut', disease: 'Leaf Rust', tamilName: 'இலை துரு', severity: 'low', detectedDate: '2024-10-03', status: 'pending', recommendation: 'Apply Chlorothalonil @ 1g/L as preventive spray. Monitor closely during humid weather.', image: 'leaf-rust' },
  { id: 'd3', crop: 'Paddy', disease: 'Stem Borer', tamilName: 'தண்டு துளையன்', severity: 'high', detectedDate: '2024-10-06', status: 'pending', recommendation: 'Install pheromone traps @ 8/acre. Apply Cartap hydrochloride @ 20kg/ha if infestation exceeds ETL.', image: 'stem-borer' },
];

export const marketPrices: MarketPrice[] = [
  { id: 'm1', crop: 'Paddy (Grade A)', tamilName: 'நெல்', unit: 'quintal', price: 2850, previousPrice: 2700, trend: 'up', market: 'Thanjavur Uzhavar Sandhai', lastUpdated: '2 hours ago' },
  { id: 'm2', crop: 'Groundnut', tamilName: 'கடலை', unit: 'quintal', price: 6200, previousPrice: 6400, trend: 'down', market: 'Kumbakonam Market', lastUpdated: '3 hours ago' },
  { id: 'm3', crop: 'Black Gram', tamilName: 'உழுந்து', unit: 'quintal', price: 8800, previousPrice: 8800, trend: 'stable', market: 'Thanjavur Uzhavar Sandhai', lastUpdated: '1 hour ago' },
  { id: 'm4', crop: 'Green Gram', tamilName: 'பச்சைப் பயறு', unit: 'quintal', price: 7500, previousPrice: 7200, trend: 'up', market: 'Chennai Market', lastUpdated: '4 hours ago' },
  { id: 'm5', crop: 'Sugarcane', tamilName: 'கரும்பு', unit: 'tonne', price: 3400, previousPrice: 3300, trend: 'up', market: 'Kumbakonam Market', lastUpdated: '5 hours ago' },
  { id: 'm6', crop: 'Cotton', tamilName: 'பருத்தி', unit: 'quintal', price: 7800, previousPrice: 8100, trend: 'down', market: 'Madurai Market', lastUpdated: '6 hours ago' },
  { id: 'm7', crop: 'Turmeric', tamilName: 'மஞ்சள்', unit: 'quintal', price: 12500, previousPrice: 12200, trend: 'up', market: 'Erode Market', lastUpdated: '2 hours ago' },
  { id: 'm8', crop: 'Coconut', tamilName: 'தேங்காய்', unit: '100 nuts', price: 3200, previousPrice: 3100, trend: 'up', market: 'Pollachi Market', lastUpdated: '3 hours ago' },
];

export const serviceCategories: ServiceCategory[] = [
  { id: 'labour', name: 'Labour', tamilName: 'வேலையாட்கள்', icon: 'Users', description: 'Hire skilled and unskilled farm labour', color: 'primary' },
  { id: 'machinery', name: 'Machinery', tamilName: 'இயந்திரங்கள்', icon: 'Tractor', description: 'Rent tractors and farm equipment', color: 'secondary' },
  { id: 'drone', name: 'Drone Services', tamilName: 'ட்ரோன் சேவை', icon: 'Plane', description: 'Drone spraying and aerial monitoring', color: 'accent' },
  { id: 'soil-testing', name: 'Soil Testing', tamilName: 'மண் பரிசோதனை', icon: 'FlaskConical', description: 'Professional soil analysis', color: 'soil' },
  { id: 'irrigation', name: 'Irrigation Equipment', tamilName: 'நீர்ப்பாசன உபகரணங்கள்', icon: 'Droplets', description: 'Drip and sprinkler systems', color: 'secondary' },
  { id: 'transport', name: 'Transport', tamilName: 'போக்குவரத்து', icon: 'Truck', description: 'Move produce and inputs', color: 'primary' },
  { id: 'storage', name: 'Storage', tamilName: 'சேமிப்பு', icon: 'Warehouse', description: 'Warehouses and cold storage', color: 'accent' },
  { id: 'seeds', name: 'Seeds & Fertilizers', tamilName: 'விதை & உரம்', icon: 'Sprout', description: 'Quality inputs and supplies', color: 'primary' },
];

export const serviceProviders: ServiceProvider[] = [
  { id: 'sp1', categoryId: 'labour', name: 'Farm Labour Group', provider: 'Murugan & Team', rating: 4.7, reviews: 89, price: 500, priceUnit: 'per day / person', availability: 'Available Tomorrow', distance: 3.5, image: 'labour', description: 'Experienced farm labour team for planting, weeding, and harvesting. 10 workers available.', features: ['10 workers', 'Planting & harvesting', 'Weeding', 'Own tools'], experience: 8 },
  { id: 'sp2', categoryId: 'labour', name: 'Women Labour Collective', provider: 'Sathyavani Group', rating: 4.9, reviews: 112, price: 450, priceUnit: 'per day / person', availability: 'Available Today', distance: 2.1, image: 'labour2', description: 'Women-led collective specializing in transplanting and post-harvest work.', features: ['15 workers', 'Transplanting specialists', 'Post-harvest', 'Group booking'], experience: 12 },
  { id: 'sp3', categoryId: 'machinery', name: 'Tractor with Plough', provider: 'Selva Tractors', rating: 4.6, reviews: 67, price: 1200, priceUnit: 'per hour', availability: 'Available Oct 9', distance: 5.0, image: 'tractor', description: '45 HP tractor with mouldboard plough. Operator included.', features: ['45 HP tractor', 'Operator included', 'Plough attachment', 'Diesel extra'], experience: 10 },
  { id: 'sp4', categoryId: 'machinery', name: 'Combined Harvester', provider: 'Murari Agri Tech', rating: 4.8, reviews: 45, price: 3500, priceUnit: 'per acre', availability: 'Available Oct 12', distance: 12.0, image: 'harvester', description: 'Modern combine harvester for paddy. Efficient threshing and cleaning.', features: ['Paddy & wheat', 'High efficiency', 'Operator + fuel', 'Booking advance 25%'], experience: 15 },
  { id: 'sp5', categoryId: 'machinery', name: 'Power Tiller', provider: 'Ravi Farm Equip', rating: 4.4, reviews: 33, price: 600, priceUnit: 'per hour', availability: 'Available Today', distance: 4.2, image: 'tiller', description: '7 HP power tiller for small plots. Ideal for inter-cultivation.', features: ['7 HP', 'Light weight', 'Multiple attachments', 'Self-operable'], experience: 6 },
  { id: 'sp6', categoryId: 'drone', name: 'Drone Spraying Service', provider: 'AeroAgri Solutions', rating: 4.9, reviews: 54, price: 400, priceUnit: 'per acre', availability: 'Available Oct 10', distance: 18.0, image: 'drone', description: 'Precision drone spraying for pesticides and foliar nutrients. Covers 5 acres/hour.', features: ['Precision spraying', '5 acres/hour', 'Licensed pilot', 'GPS mapped'], experience: 4 },
  { id: 'sp7', categoryId: 'drone', name: 'Aerial Crop Monitoring', provider: 'SkyFarm Tech', rating: 4.7, reviews: 28, price: 600, priceUnit: 'per acre', availability: 'Available Oct 11', distance: 22.0, image: 'drone2', description: 'NDVI crop health mapping with thermal imaging. Detect stress before visible symptoms.', features: ['NDVI mapping', 'Thermal imaging', 'Health report', '3D field map'], experience: 3 },
  { id: 'sp8', categoryId: 'soil-testing', name: 'Comprehensive Soil Test', provider: 'TNAU Soil Lab', rating: 4.8, reviews: 76, price: 250, priceUnit: 'per sample', availability: 'Results in 3 days', distance: 15.0, image: 'soil-test', description: 'Complete soil analysis: pH, NPK, micronutrients, organic matter, and EC. Includes recommendations.', features: ['12 parameters', 'Expert recommendations', '3-day turnaround', 'Home sample collection'], experience: 20 },
  { id: 'sp9', categoryId: 'soil-testing', name: 'Quick NPK Test', provider: 'AgriTest Labs', rating: 4.5, reviews: 41, price: 150, priceUnit: 'per sample', availability: 'Results in 24 hrs', distance: 8.0, image: 'soil-test2', description: 'Fast nitrogen, phosphorus, and potassium testing with same-area comparison.', features: ['NPK analysis', '24-hour results', 'Drop-off sample', 'SMS report'], experience: 7 },
  { id: 'sp10', categoryId: 'irrigation', name: 'Drip Irrigation Kit', provider: 'GreenFlow Systems', rating: 4.7, reviews: 63, price: 18000, priceUnit: 'per acre setup', availability: 'Install in 5 days', distance: 30.0, image: 'drip', description: 'Complete drip irrigation system with filters, venturi, and pressure gauge. Includes installation.', features: ['Complete setup', 'Installation included', '5-year warranty', 'Water-saving 40%'], experience: 11 },
  { id: 'sp11', categoryId: 'irrigation', name: 'Sprinkler System', provider: 'RainTech Agri', rating: 4.6, reviews: 38, price: 12000, priceUnit: 'per acre setup', availability: 'Install in 7 days', distance: 25.0, image: 'sprinkler', description: 'Rotary sprinkler system ideal for groundnut and pulses. Uniform coverage.', features: ['Uniform coverage', 'Easy to move', '3-year warranty', 'Low pressure operation'], experience: 9 },
  { id: 'sp12', categoryId: 'transport', name: 'Truck – 3 Ton', provider: 'Velu Transport', rating: 4.5, reviews: 52, price: 1500, priceUnit: 'per trip (50km)', availability: 'Available Today', distance: 6.0, image: 'truck', description: '3-ton truck for produce transport. Suitable for paddy and general cargo.', features: ['3 ton capacity', '50km radius', 'Driver included', 'Loading assistance'], experience: 14 },
  { id: 'sp13', categoryId: 'transport', name: 'Mini Tractor Trailer', provider: 'Selva Tractors', rating: 4.3, reviews: 29, price: 800, priceUnit: 'per trip (20km)', availability: 'Available Tomorrow', distance: 5.0, image: 'trailer', description: 'Small trailer for short-distance transport within village and nearby markets.', features: ['1.5 ton capacity', '20km radius', 'Flexible timing', 'Good for villages'], experience: 10 },
  { id: 'sp14', categoryId: 'storage', name: 'Cold Storage Unit', provider: 'FreshKeep Storage', rating: 4.8, reviews: 47, price: 8, priceUnit: 'per bag / day', availability: 'Space Available', distance: 10.0, image: 'cold-storage', description: 'Temperature-controlled cold storage for perishables. 0-5°C maintained.', features: ['0-5°C maintained', '24/7 monitoring', 'Insurance included', 'Up to 500 bags'], experience: 8 },
  { id: 'sp15', categoryId: 'storage', name: 'Grain Warehouse', provider: 'AgriStore Warehouse', rating: 4.6, reviews: 34, price: 5, priceUnit: 'per bag / month', availability: 'Space Available', distance: 14.0, image: 'warehouse', description: 'Dry warehouse with pest control for grain storage. Fumigation included.', features: ['Pest controlled', 'Fumigation included', 'Secure access', '1000 bag capacity'], experience: 12 },
  { id: 'sp16', categoryId: 'seeds', name: 'Certified Seeds Supplier', provider: 'Pasumai Seeds', rating: 4.7, reviews: 88, price: 450, priceUnit: 'per 5kg bag', availability: 'In Stock', distance: 7.0, image: 'seeds', description: 'Government-certified seeds for paddy, pulses, and oilseeds. Variety packs available.', features: ['Certified seeds', 'Multiple varieties', 'High germination', 'Bulk discount'], experience: 18 },
  { id: 'sp17', categoryId: 'seeds', name: 'Organic Fertilizers', provider: 'Bhoomi Organics', rating: 4.8, reviews: 56, price: 350, priceUnit: 'per 50kg bag', availability: 'In Stock', distance: 9.0, image: 'fertilizer', description: 'Vermicompost, neem cake, and bio-fertilizers. Improve soil health naturally.', features: ['100% organic', 'Soil-friendly', 'Multiple products', 'Free delivery >10 bags'], experience: 10 },
  { id: 'sp18', categoryId: 'seeds', name: 'Crop Protection Kit', provider: 'AgriGuard', rating: 4.5, reviews: 42, price: 1200, priceUnit: 'per kit', availability: 'In Stock', distance: 11.0, image: 'pesticide', description: 'Complete pest and disease management kit with bio-pesticides and traps.', features: ['Bio-pesticides', 'Pheromone traps', 'Crop-specific', 'Safe for pollinators'], experience: 7 },
];

export const notifications: NotificationItem[] = [
  { id: 'n1', type: 'weather', title: 'Heavy Rain Alert', message: 'Thunderstorm expected on Oct 11. Secure your harvested produce and check drainage.', time: '1 hour ago', read: false },
  { id: 'n2', type: 'pest', title: 'Stem Borer Detected', message: 'High severity stem borer infestation detected in Zone A paddy field. Action needed.', time: '3 hours ago', read: false },
  { id: 'n3', type: 'market', title: 'Paddy Price Up', message: 'Paddy (Grade A) price increased by Rs. 150/quintal at Thanjavur market.', time: '5 hours ago', read: false },
  { id: 'n4', type: 'booking', title: 'Booking Confirmed', message: 'Your drone spraying service booking for Oct 10 has been confirmed.', time: '1 day ago', read: true },
  { id: 'n5', type: 'tip', title: 'Fertilizer Tip', message: 'Apply second dose of nitrogen to your tillering paddy. Recommended: 30 kg urea/acre.', time: '1 day ago', read: true },
  { id: 'n6', type: 'system', title: 'Weekly Report Ready', message: 'Your farm analytics report for Sep 30 – Oct 6 is now available.', time: '2 days ago', read: true },
];

export const communityPosts: CommunityPost[] = [
  { id: 'p1', author: 'Ramesh K', avatar: 'RK', role: 'Farmer · 15 yrs', title: 'Best time to apply nitrogen for tillering paddy?', content: 'My paddy is in the tillering stage (day 12). Should I split the nitrogen dose or apply it all at once? What worked best for you all?', category: 'Crop Management', likes: 24, comments: 8, time: '2 hours ago', tags: ['paddy', 'fertilizer', 'tillering'], liked: false },
  { id: 'p2', author: 'Dr. Lakshmi S', avatar: 'LS', role: 'Agricultural Scientist', title: 'Managing brown spot in paddy – Complete Guide', content: 'Brown spot (Cochliobolus miyabeanus) is common in nutrient-deficient soils. Key steps: 1) Apply balanced NPK 2) Use Mancozeb @ 2.5g/L 3) Improve drainage 4) Use resistant varieties like CR 1009.', category: 'Expert Advice', likes: 67, comments: 15, time: '5 hours ago', tags: ['paddy', 'disease', 'brown-spot'], liked: true },
  { id: 'p3', author: 'Suresh M', avatar: 'SM', role: 'Farmer · 8 yrs', title: 'Drone spraying vs manual – my experience', content: 'Tried drone spraying for the first time last week on 3 acres. Saved 60% time and 30% pesticide. Cost was Rs. 400/acre but worth it. Highly recommend for larger farms.', category: 'Technology', likes: 45, comments: 12, time: '8 hours ago', tags: ['drone', 'spraying', 'technology'], liked: false },
  { id: 'p4', author: 'Priya V', avatar: 'PV', role: 'Organic Farmer', title: 'Vermicompost results – soil improved dramatically', content: 'After 6 months of vermicompost application, my soil organic matter went from 1.1% to 1.9%. Water retention improved significantly. Sharing my setup if anyone is interested.', category: 'Soil Health', likes: 38, comments: 9, time: '1 day ago', tags: ['organic', 'soil', 'vermicompost'], liked: false },
  { id: 'p5', author: 'Arumugam T', avatar: 'AT', role: 'Farmer · 20 yrs', title: 'Groundnut leaf rust – need advice', content: 'Seeing yellow-orange pustules on my groundnut leaves. Is this rust? What fungicide works best? The crop is in flowering stage.', category: 'Pest & Disease', likes: 18, comments: 6, time: '1 day ago', tags: ['groundnut', 'rust', 'disease'], liked: false },
];

export const experts: Expert[] = [
  { id: 'e1', name: 'Dr. Lakshmi Subramanian', specialization: 'Plant Pathologist', experience: 18, rating: 4.9, consultations: 340, avatar: 'LS', available: true },
  { id: 'e2', name: 'Dr. Murugan Andavar', specialization: 'Soil Scientist', experience: 22, rating: 4.8, consultations: 410, avatar: 'MA', available: true },
  { id: 'e3', name: 'Prof. Senthil Kumar', specialization: 'Agronomy & Crop Planning', experience: 15, rating: 4.7, consultations: 280, avatar: 'SK', available: false },
  { id: 'e4', name: 'Dr. Kavitha Rajan', specialization: 'Entomology & Pest Management', experience: 12, rating: 4.9, consultations: 195, avatar: 'KR', available: true },
];

export const reports: ReportItem[] = [
  { id: 'r1', title: 'Weekly Farm Summary', type: 'Weekly Report', date: 'Oct 1–7, 2024', summary: 'Overall farm health is good. 1 disease alert requires attention. Soil moisture is adequate in 3 of 4 zones.', metrics: [{ label: 'Avg Crop Health', value: '85%' }, { label: 'Water Used', value: '12,400 L' }, { label: 'Alerts', value: '3' }, { label: 'Tasks Done', value: '8/10' }] },
  { id: 'r2', title: 'Soil Health Report', type: 'Soil Analysis', date: 'Oct 5, 2024', summary: 'Zone D requires immediate attention — low pH and moisture. Zone C is in excellent condition.', metrics: [{ label: 'Zones Healthy', value: '2/4' }, { label: 'Avg pH', value: '6.1' }, { label: 'Avg Moisture', value: '36%' }, { label: 'Action Needed', value: 'Zone D' }] },
  { id: 'r3', title: 'Input Cost Analysis', type: 'Financial', date: 'Sep 2024', summary: 'Total input cost this month: Rs. 14,500. Fertilizer was 48% of expenses. Slight increase from last month.', metrics: [{ label: 'Total Cost', value: 'Rs. 14,500' }, { label: 'Fertilizer', value: 'Rs. 6,960' }, { label: 'Labour', value: 'Rs. 4,500' }, { label: 'Pesticides', value: 'Rs. 3,040' }] },
  { id: 'r4', title: 'Yield Forecast', type: 'Prediction', date: 'Oct 6, 2024', summary: 'Based on current crop health and soil conditions, estimated paddy yield is 4.2 tonnes/acre (+8% vs last season).', metrics: [{ label: 'Est. Paddy Yield', value: '4.2 t/acre' }, { label: 'Est. Groundnut', value: '1.8 t/acre' }, { label: 'Est. Revenue', value: 'Rs. 3.1L' }, { label: 'Confidence', value: '82%' }] },
];

export const initialBookings: Booking[] = [
  { id: 'b1', serviceId: 'sp6', serviceName: 'Drone Spraying Service', providerName: 'AeroAgri Solutions', date: '2024-10-10', time: '08:00 AM', status: 'confirmed', price: 1600, notes: 'Spray for 4 acres in Zone A and B' },
  { id: 'b2', serviceId: 'sp8', serviceName: 'Comprehensive Soil Test', providerName: 'TNAU Soil Lab', date: '2024-09-28', time: '10:30 AM', status: 'completed', price: 250, notes: 'Zone D sample' },
  { id: 'b3', serviceId: 'sp1', serviceName: 'Farm Labour Group', providerName: 'Murugan & Team', date: '2024-10-12', time: '07:00 AM', status: 'pending', price: 2500, notes: '5 workers for 1 day – weeding' },
];

export const aiResponses: { keywords: string[]; response: string }[] = [
  {
    keywords: ['pest', 'disease', 'insect', 'bug', 'worm'],
    response: "Based on your farm data, I've detected a **Stem Borer** infestation in your paddy field (Zone A). Here's my recommendation:\n\n1. **Immediate Action:** Install pheromone traps @ 8 traps/acre to monitor adult moths.\n2. **Chemical Control:** Apply Cartap hydrochloride 4G @ 20 kg/ha if dead hearts exceed 5% ETL.\n3. **Cultural Practice:** Clip leaf tips before transplanting to remove egg masses.\n4. **Biological:** Use Trichogramma cards @ 5/acre as a bio-control method.\n\nWould you like me to find a nearby supplier for pheromone traps or schedule a drone spraying service?",
  },
  {
    keywords: ['water', 'irrigation', 'moisture', 'dry', 'wet'],
    response: "Here's the current irrigation status of your farm:\n\n• **Zone A (Paddy):** 42% moisture — Adequate. Maintain 3-5cm water level.\n• **Zone B (Groundnut):** 28% moisture — Below optimal. Irrigate today.\n• **Zone C (Black Gram):** 55% moisture — Optimal. No action needed.\n• **Zone D (Fallow):** 18% moisture — Critical. Irrigation recommended before next planting.\n\n**Rain forecast:** Heavy rain expected Oct 10-11. Reduce irrigation from Oct 9 onwards.\n\n**Recommendation:** Switch to alternate wetting and drying (AWD) for paddy to save 30% water.",
  },
  {
    keywords: ['fertilizer', 'npk', 'urea', 'nutrient', 'nitrogen'],
    response: "Based on your soil test results and current crop stage (Paddy – Tillering, Day 12), here's the fertilizer plan:\n\n**This Week:**\n• Apply 30 kg urea/acre (second split of nitrogen)\n• Apply 10 kg MOP/acre if potash is low\n\n**Avoid:**\n• Do not apply basal dose again — it was applied at transplanting\n\n**Zone D Alert:** pH is 4.9 (too acidic). Apply agricultural lime @ 1 ton/acre before next crop.\n\n**Organic Alternative:** Neem-coated urea reduces nitrogen loss by 20%. Would you like organic fertilizer supplier contacts?",
  },
  {
    keywords: ['weather', 'rain', 'temperature', 'climate', 'storm'],
    response: "Weather forecast for Thiruvidaimarudur, Thanjavur:\n\n**Today (Oct 7):** 32°C / 24°C — Partly Cloudy, 20% rain chance\n**Key Alert:** Thunderstorm expected **Oct 10-11** with 85-90% rain probability.\n\n**Advisory:**\n1. Complete any pending pesticide spray by Oct 8 (before rain)\n2. Secure harvested produce in covered storage\n3. Check drainage channels in paddy fields — clear any blockages\n4. Postpone fertilizer application until after Oct 11\n5. Stake tall crops to prevent lodging from strong winds (25 km/h expected)\n\nWould you like me to book a storage unit for your produce?",
  },
  {
    keywords: ['price', 'market', 'sell', 'mandi', 'rate'],
    response: "Current market prices for your crops:\n\n• **Paddy (Grade A):** Rs. 2,850/quintal ↑ (+Rs. 150)\n• **Groundnut:** Rs. 6,200/quintal ↓ (-Rs. 200)\n• **Black Gram:** Rs. 8,800/quintal → (stable)\n\n**Market Insight:**\n• Paddy prices are trending up — good time to sell if you have surplus.\n• Groundnut prices have dipped slightly. Consider holding for 2 weeks if storage is available.\n• Black Gram demand is steady. Government MSP is Rs. 8,400 — market price is above MSP.\n\n**Recommendation:** Sell paddy now, hold groundnut. Would you like transport booking to Thanjavur Uzhavar Sandhai?",
  },
  {
    keywords: ['crop', 'stage', 'growth', 'health', 'plant'],
    response: "Here's your crop health summary:\n\n**🌾 Paddy (2.0 acres) — Health: 88%**\n• Stage: Tillering (Day 12/35)\n• Status: Good growth, slight brown spot risk\n• Next milestone: Panicle initiation in ~23 days\n\n**🥜 Groundnut (1.0 acre) — Health: 76%**\n• Stage: Flowering (Day 8/30)\n• Status: Moderate — leaf rust detected (low severity)\n• Next milestone: Pegging in ~22 days\n\n**🫘 Black Gram (0.5 acres) — Health: 91%**\n• Stage: Pod Filling (Day 5/25)\n• Status: Excellent — on track for harvest in ~20 days\n• Next milestone: Harvest ready by late November\n\nWould you like detailed care instructions for any specific crop?",
  },
];

export const defaultAIResponse = "I'm your Pasumai AI farming assistant. I can help you with:\n\n• **Crop management** — growth stages, care tips, disease detection\n• **Soil health** — moisture, pH, nutrient recommendations\n• **Weather advisories** — forecasts and farming actions\n• **Irrigation planning** — water scheduling and optimization\n• **Fertilizer guidance** — dosage, timing, and alternatives\n• **Market prices** — current rates and selling advice\n• **Pest control** — identification and treatment plans\n\nAsk me anything about your farm! For example: \"What fertilizer should I apply to my paddy?\" or \"How's my soil health?\"";
