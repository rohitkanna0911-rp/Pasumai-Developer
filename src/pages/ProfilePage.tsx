import {
  User as UserIcon, MapPin, Phone, Mail, Tractor, Sprout, Calendar,
  Award, Settings, LogOut, FileText, ChevronRight, TrendingUp,
  Droplets, FlaskConical, CheckCircle, Clock, XCircle, Bell,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Button, Badge, SectionHeader, Avatar, ProgressBar } from '@/components/ui';
import { reports, cropPlots, soilReadings } from '@/data/mockData';
import type { Booking } from '@/types';

const bookingStatusConfig = {
  pending: { label: 'Pending', variant: 'warning' as const, icon: Clock },
  confirmed: { label: 'Confirmed', variant: 'info' as const, icon: CheckCircle },
  completed: { label: 'Completed', variant: 'success' as const, icon: CheckCircle },
  cancelled: { label: 'Cancelled', variant: 'error' as const, icon: XCircle },
};

export function ProfilePage() {
  const { user, bookings, cancelBooking, navigate, logout, notifications, markAllNotificationsRead } = useApp();

  const activeBookings = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-primary-600 to-secondary-700 p-6 text-white relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0">
              {user.avatar}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold">{user.name}</h2>
              <p className="text-primary-100 text-sm mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {user.village}, {user.district}, {user.state}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs bg-white/15 backdrop-blur px-3 py-1 rounded-full">{user.experience} years experience</span>
                <span className="text-xs bg-white/15 backdrop-blur px-3 py-1 rounded-full">Member since {user.joinedDate}</span>
              </div>
            </div>
            <Button variant="white" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-50">
          {[
            { label: 'Farm Size', value: `${user.farmSize} ac` },
            { label: 'Active Crops', value: user.crops.length },
            { label: 'Bookings', value: bookings.length },
            { label: 'Reports', value: reports.length },
          ].map((stat, i) => (
            <div key={i} className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-5">
        <SectionHeader title="Personal Information" tamil="தனிப்பட்ட தகவல்" />
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: UserIcon, label: 'Full Name', value: user.name },
            { icon: Mail, label: 'Email', value: user.email },
            { icon: Phone, label: 'Phone', value: user.phone },
            { icon: MapPin, label: 'Location', value: `${user.village}, ${user.district}` },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Farm Details */}
      <Card className="p-5">
        <SectionHeader title="Farm Details" tamil="பண்ணை விவரம்" />
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 bg-primary-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Tractor className="w-5 h-5 text-primary-600" />
              <p className="text-sm font-semibold text-gray-700">Soil Type</p>
            </div>
            <p className="text-lg font-bold text-gray-900">{user.soilType}</p>
          </div>
          <div className="p-4 bg-secondary-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-secondary-600" />
              <p className="text-sm font-semibold text-gray-700">Irrigation</p>
            </div>
            <p className="text-lg font-bold text-gray-900">{user.irrigationType}</p>
          </div>
          <div className="p-4 bg-accent-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sprout className="w-5 h-5 text-accent-600" />
              <p className="text-sm font-semibold text-gray-700">Crops</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {user.crops.map(c => <Badge key={c} variant="info">{c}</Badge>)}
            </div>
          </div>
        </div>
      </Card>

      {/* Active Bookings */}
      <div>
        <SectionHeader
          title="My Bookings"
          tamil="என் பதிவுகள்"
          action={<Button variant="ghost" size="sm" onClick={() => navigate('services')}>Book Service <ChevronRight className="w-4 h-4" /></Button>}
        />
        <div className="space-y-3">
          {bookings.map((booking: Booking) => {
            const config = bookingStatusConfig[booking.status];
            const StatusIcon = config.icon;
            return (
              <Card key={booking.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{booking.serviceName}</p>
                    <p className="text-xs text-gray-500">{booking.providerName}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {booking.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {booking.time}</span>
                    </div>
                    {booking.notes && <p className="text-xs text-gray-400 mt-1.5">"{booking.notes}"</p>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900">₹{booking.price.toLocaleString()}</p>
                    <Badge variant={config.variant} className="mt-1">
                      <StatusIcon className="w-3 h-3" /> {config.label}
                    </Badge>
                  </div>
                </div>
                {(booking.status === 'pending' || booking.status === 'confirmed') && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                    <Button variant="outline" size="sm" fullWidth>Reschedule</Button>
                    <Button variant="ghost" size="sm" onClick={() => cancelBooking(booking.id)} className="text-error-500 hover:bg-error-50">
                      Cancel
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
          {bookings.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-gray-400">No bookings yet.</p>
              <Button className="mt-3" onClick={() => navigate('services')}>Browse Services</Button>
            </Card>
          )}
        </div>
      </div>

      {/* Reports & Analytics */}
      <div>
        <SectionHeader title="Reports & Analytics" tamil="அறிக்கைகள் & பகுப்பாய்வு" />
        <div className="grid md:grid-cols-2 gap-4">
          {reports.map(report => (
            <Card key={report.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{report.title}</p>
                    <p className="text-xs text-gray-400">{report.type} · {report.date}</p>
                  </div>
                </div>
                <Badge variant="info">{report.type}</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-3">{report.summary}</p>
              <div className="grid grid-cols-2 gap-2">
                {report.metrics.map((m, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-400">{m.label}</p>
                    <p className="text-sm font-bold text-gray-900">{m.value}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-3">View Full Report <ChevronRight className="w-4 h-4" /></Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <Card className="p-5">
        <SectionHeader
          title="Notifications"
          tamil="அறிவிப்புகள்"
          action={unreadCount > 0 && <Button variant="ghost" size="sm" onClick={markAllNotificationsRead}>Mark all read</Button>}
        />
        <div className="space-y-2">
          {notifications.map(n => (
            <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl ${!n.read ? 'bg-primary-50/50' : 'bg-gray-50'}`}>
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
              </div>
              {!n.read && <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />}
            </div>
          ))}
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-5">
        <SectionHeader title="Settings" tamil="அமைப்புகள்" />
        <div className="space-y-2">
          {['Edit Profile', 'Notification Preferences', 'Language: English / தமிழ்', 'Privacy & Security', 'Help & Support'].map(item => (
            <button key={item} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-400" /> {item}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
