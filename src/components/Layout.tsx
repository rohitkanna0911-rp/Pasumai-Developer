import { useState, type ReactNode } from 'react';
import {
  Home, LayoutDashboard, Bot, Tractor, HeartPulse, CloudSun,
  FlaskConical, TrendingUp, Wrench, MessageCircle, User as UserIcon,
  Bell, Menu, X, LogOut, Sprout, Settings,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { PageId } from '@/types';

interface NavItem {
  id: PageId;
  label: string;
  icon: typeof Home;
}

const mainNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'assistant', label: 'AI Assistant', icon: Bot },
  { id: 'farm', label: 'My Farm', icon: Tractor },
  { id: 'crop-health', label: 'Crop Health', icon: HeartPulse },
  { id: 'weather', label: 'Weather', icon: CloudSun },
  { id: 'soil-health', label: 'Soil Health', icon: FlaskConical },
  { id: 'market', label: 'Market Prices', icon: TrendingUp },
  { id: 'services', label: 'Farm Services', icon: Wrench },
  { id: 'community', label: 'Community', icon: MessageCircle },
  { id: 'profile', label: 'Profile', icon: UserIcon },
];

export function Layout({ children }: { children: ReactNode }) {
  const { currentPage, navigate, isLoggedIn, logout, user, notifications, markAllNotificationsRead } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  if (!isLoggedIn) {
    return <div className="min-h-screen">{children}</div>;
  }

  const unreadCount = notifications.filter(n => !n.read).length;
  const currentNavItem = mainNav.find(n => n.id === currentPage);

  const handleNav = (page: PageId) => {
    navigate(page);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 bg-white border-r border-gray-100 flex-col fixed h-screen z-30">
        <div className="p-5 border-b border-gray-50">
          <button onClick={() => handleNav('dashboard')} className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-display font-bold text-gray-900 text-sm leading-tight">Pasumai AI</p>
              <p className="text-xs text-primary-600 font-medium">Uzhavan</p>
            </div>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
          {mainNav.map(item => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${
                  active ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-primary-600' : 'text-gray-400'}`} />
                {item.label}
                {active && <div className="ml-auto w-1.5 h-1.5 bg-primary-500 rounded-full" />}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-50">
          <button
            onClick={() => handleNav('profile')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user.avatar}
            </div>
            <div className="text-left flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.village}</p>
            </div>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors mt-1"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 lg:hidden flex flex-col animate-slide-down">
            <div className="p-5 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-display font-bold text-gray-900 text-sm">Pasumai AI</p>
                  <p className="text-xs text-primary-600 font-medium">Uzhavan</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-50">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
              {mainNav.map(item => {
                const Icon = item.icon;
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium mb-1 transition-all ${
                      active ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-primary-600' : 'text-gray-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="p-3 border-t border-gray-50">
              <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-50">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-base font-bold text-gray-900">{currentNavItem?.label || 'Dashboard'}</h1>
                <p className="text-xs text-gray-400 hidden sm:block">{user.village}, {user.district}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('assistant')}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-50 text-primary-700 text-sm font-medium hover:bg-primary-100 transition-colors"
              >
                <Bot className="w-4 h-4" /> Ask AI
              </button>

              <div className="relative">
                <button
                  onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) markAllNotificationsRead(); }}
                  className="relative p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-40 animate-slide-down overflow-hidden">
                      <div className="p-4 border-b border-gray-50">
                        <p className="font-semibold text-gray-900">Notifications</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto scrollbar-hide">
                        {notifications.map(n => (
                          <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-primary-50/40' : ''}`}>
                            <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                            <p className="text-xs text-gray-400 mt-1.5">{n.time}</p>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => { setNotifOpen(false); handleNav('dashboard'); }} className="w-full p-3 text-sm font-medium text-primary-600 hover:bg-primary-50">
                        View All
                      </button>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => handleNav('profile')}
                className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              >
                {user.avatar}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 pb-20 lg:pb-6">
          <div className="max-w-6xl mx-auto p-4 lg:p-6 animate-fade-in">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30">
          <div className="flex items-center justify-around px-1 py-1.5">
            {[
              { id: 'dashboard' as PageId, label: 'Home', icon: Home },
              { id: 'farm' as PageId, label: 'Farm', icon: Tractor },
              { id: 'assistant' as PageId, label: 'AI', icon: Bot },
              { id: 'services' as PageId, label: 'Services', icon: Wrench },
              { id: 'profile' as PageId, label: 'Profile', icon: UserIcon },
            ].map(item => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              const isAICenter = item.id === 'assistant';
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[55px]"
                >
                  {isAICenter ? (
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center -mt-5 shadow-lg transition-all ${
                      active ? 'bg-gradient-to-br from-primary-500 to-secondary-600 scale-105' : 'bg-gradient-to-br from-primary-500 to-secondary-600'
                    }`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <Icon className={`w-5 h-5 ${active ? 'text-primary-600' : 'text-gray-400'}`} />
                  )}
                  <span className={`text-[10px] font-medium ${active ? 'text-primary-600' : 'text-gray-400'}`}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
