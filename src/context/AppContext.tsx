import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { PageId, User, Booking, NotificationItem, ChatMessage } from '@/types';
import { mockUser, initialBookings, notifications as initialNotifications, defaultAIResponse, aiResponses } from '@/data/mockData';

interface AppContextValue {
  currentPage: PageId;
  navigate: (page: PageId) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: User;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (content: string) => void;
  isAssistantTyping: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

let chatIdCounter = 0;

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [notificationList, setNotificationList] = useState<NotificationItem[]>(initialNotifications);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'msg-init', role: 'assistant', content: defaultAIResponse, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  const navigate = useCallback((page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  }, []);

  const addBooking = useCallback((booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotificationList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const sendChatMessage = useCallback((content: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${chatIdCounter++}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages(prev => [...prev, userMsg]);
    setIsAssistantTyping(true);

    setTimeout(() => {
      const lowerContent = content.toLowerCase();
      const match = aiResponses.find(r => r.keywords.some(k => lowerContent.includes(k)));
      const responseText = match?.response ?? defaultAIResponse;
      const aiMsg: ChatMessage = {
        id: `msg-${chatIdCounter++}`,
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, aiMsg]);
      setIsAssistantTyping(false);
    }, 1200);
  }, []);

  return (
    <AppContext.Provider value={{
      currentPage, navigate, isLoggedIn, login, logout, user: mockUser,
      bookings, addBooking, cancelBooking, selectedServiceId, setSelectedServiceId,
      notifications: notificationList, markNotificationRead, markAllNotificationsRead,
      chatMessages, sendChatMessage, isAssistantTyping,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
