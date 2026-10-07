import { AppProvider, useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AssistantPage } from '@/pages/AssistantPage';
import { FarmPage } from '@/pages/FarmPage';
import { CropHealthPage } from '@/pages/CropHealthPage';
import { WeatherPage } from '@/pages/WeatherPage';
import { SoilHealthPage } from '@/pages/SoilHealthPage';
import { MarketPage } from '@/pages/MarketPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ServiceDetailPage } from '@/pages/ServiceDetailPage';
import { CommunityPage } from '@/pages/CommunityPage';
import { ProfilePage } from '@/pages/ProfilePage';
import type { PageId } from '@/types';

function PageRouter() {
  const { currentPage, isLoggedIn } = useApp();

  const authPages: PageId[] = ['home', 'login'];
  if (!isLoggedIn && !authPages.includes(currentPage)) {
    return <HomePage />;
  }

  switch (currentPage) {
    case 'home': return <HomePage />;
    case 'login': return <LoginPage />;
    case 'dashboard': return <DashboardPage />;
    case 'assistant': return <AssistantPage />;
    case 'farm': return <FarmPage />;
    case 'crop-health': return <CropHealthPage />;
    case 'weather': return <WeatherPage />;
    case 'soil-health': return <SoilHealthPage />;
    case 'market': return <MarketPage />;
    case 'services': return <ServicesPage />;
    case 'service-detail': return <ServiceDetailPage />;
    case 'community': return <CommunityPage />;
    case 'profile': return <ProfilePage />;
    default: return <HomePage />;
  }
}

function AppContent() {
  const { isLoggedIn } = useApp();
  return (
    <Layout>
      <PageRouter />
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
