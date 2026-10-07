# Pasumai AI – Uzhavan

**AI-Powered Smart Farming Platform for Small-Scale Farmers**

Pasumai AI – Uzhavan (பசுமை AI – உழவன்) is an AI-powered smart farming platform designed to help small-scale farmers make better decisions and easily access agricultural services. Built as a functional hackathon prototype with realistic sample data — no backend required.

---

## Features

### Core Capabilities (21 features)

1. **Farmer Dashboard** — Overview of crop health, soil moisture, weather, alerts, and quick actions
2. **Farmer Profile & Farm Details** — Personal info, farm size, soil type, irrigation, and crop history
3. **Crop Selection & Crop-Stage Information** — Detailed growth stages with Tamil names and care tips for each stage
4. **AI Farming Assistant** — Chat interface with contextual responses about pests, irrigation, fertilizer, weather, and market prices
5. **Weather Information** — Current conditions and 7-day forecast with farming advisories
6. **Soil Moisture & Soil Health Dashboard** — Multi-zone monitoring of moisture, pH, NPK, organic matter, and EC
7. **Crop Health Monitoring** — Per-crop health scores with stage tracking
8. **AI Disease & Pest Detection** — Upload-and-scan interface with AI-powered disease identification and treatment recommendations
9. **Irrigation Recommendations** — Zone-specific watering advice based on moisture levels and weather forecast
10. **Fertilizer & Crop-Care Recommendations** — Nutrient analysis with dosage and timing guidance
11. **Current Market Prices** — Live-style mandi prices with trend indicators and AI selling advice
12. **Labour Service Booking** — Hire skilled and unskilled farm workers
13. **Farm Machinery Rental** — Tractors, harvesters, power tillers
14. **Drone Spraying & Crop Monitoring** — Precision aerial spraying and NDVI crop health mapping
15. **Soil Testing Services** — Comprehensive and quick NPK soil analysis
16. **Transport Services** — Trucks and trailers for produce transport
17. **Storage/Warehouse Services** — Cold storage and dry grain warehouses
18. **Agricultural Input Suppliers** — Certified seeds, organic fertilizers, and crop protection kits
19. **Agriculture Expert/Community Support** — Discussion forum with verified experts and peer farmers
20. **Notifications & Alerts** — Weather warnings, pest alerts, market updates, and booking confirmations
21. **Reports & Farm Analytics** — Weekly summaries, soil health reports, input cost analysis, and yield forecasts

### Pages

| Page | Description |
|------|-------------|
| Home | Landing page with features showcase, services preview, and how-it-works |
| Login/Register | Split-screen auth with demo credentials pre-filled |
| Farmer Dashboard | Stats, weather, AI insight, crop overview, soil moisture, quick actions, alerts, market snapshot |
| AI Farming Assistant | Full chat interface with quick prompts and contextual AI responses |
| My Farm | Farm overview, soil/irrigation details, crop plots with growth stage progress and care tips |
| Crop Health | Health scores, AI disease detection scanner, active disease/pest alerts with recommendations |
| Weather | Current conditions hero, 7-day forecast, irrigation advisory, farming actions |
| Soil Health | Zone cards with moisture/pH/NPK, nutrient analysis, irrigation & fertilizer recommendations |
| Market Prices | Searchable/filterable price cards with trend indicators and AI market insights |
| Farm Services | Category browsing + service provider cards with ratings, pricing, and booking |
| Service Details/Booking | Full service info, date/time picker, notes, price summary, and booking confirmation |
| Community | Expert directory, post creation, category-filtered discussion feed with likes |
| Profile | Personal info, farm details, bookings management, reports, notifications, settings |

---

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling with custom agricultural color palette
- **Lucide React** — Icons
- **Vite** — Build tooling

---

## Design

- **Green/nature-inspired visual style** — Custom color system with primary (green), secondary (teal), accent (amber), and soil (brown) ramps
- **Mobile-first responsive design** — Desktop sidebar, mobile bottom navigation with AI assistant center button
- **Tamil-friendly labels** — Bilingual headings throughout (English + தமிழ்)
- **Clean cards and icons** — Consistent card-based layout with Lucide icons
- **Micro-interactions** — Hover states, transitions, animations, typing indicators

---

## Setup Instructions

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run typecheck

# Lint
npm run lint
```

### Demo Login

The login page comes pre-filled with demo credentials:
- **Email:** `karthik.farmer@email.com`
- **Password:** `farmer123`

Simply click "Sign In" to enter the app.

---

## Architecture

```
src/
├── App.tsx                  # Main app with routing logic
├── main.tsx                 # React entry point
├── index.css                # Global styles + Tailwind
├── types/
│   └── index.ts             # All TypeScript interfaces
├── data/
│   └── mockData.ts          # All sample data (user, crops, weather, soil, services, etc.)
├── context/
│   └── AppContext.tsx       # Global state: navigation, auth, bookings, chat, notifications
├── components/
│   ├── Layout.tsx           # Sidebar + topbar + mobile bottom nav
│   └── ui.tsx               # Reusable UI components (Card, Button, Badge, etc.)
└── pages/
    ├── HomePage.tsx
    ├── LoginPage.tsx
    ├── DashboardPage.tsx
    ├── AssistantPage.tsx
    ├── FarmPage.tsx
    ├── CropHealthPage.tsx
    ├── WeatherPage.tsx
    ├── SoilHealthPage.tsx
    ├── MarketPage.tsx
    ├── ServicesPage.tsx
    ├── ServiceDetailPage.tsx
    ├── CommunityPage.tsx
    └── ProfilePage.tsx
```

### State Management

Global state is managed via React Context (`AppContext`), handling:
- Page navigation (custom router based on `PageId`)
- Authentication (login/logout)
- Service bookings (add/cancel)
- AI chat messages and typing state
- Notifications (read/unread)

### Mock Data

All data is defined in `src/data/mockData.ts` — no API calls, no backend, no API keys required. The AI assistant uses keyword matching to return contextually relevant farming advice.

---

## Future Scope

- **Real backend integration** — Supabase/PostgreSQL for user data, bookings, and persistent chat history
- **Actual AI/ML disease detection** — TensorFlow.js or cloud API for real image-based crop disease classification
- **IoT sensor integration** — Real-time soil moisture, pH, and temperature sensors via MQTT/WebSocket
- **Live weather API** — Integration with IMD or OpenWeatherMap for real-time forecasts
- **Live market prices** — Government mandi price API integration
- **Payment gateway** — Razorpay/Stripe for booking payments
- **Multi-language support** — Full Tamil localization with i18n
- **Push notifications** — PWA push for weather and pest alerts
- **Offline mode** — Service worker for offline-first experience in low-connectivity rural areas
- **Voice interface** — Voice input/output for the AI assistant (critical for low-literacy users)
- **Satellite imagery** — NDVI from satellite data for large-scale crop monitoring
- **Government scheme integration** — Information about subsidies, MSP, and welfare schemes

---

## License

Built for social impact hackathon — 2024.
