import {
  CloudSun, Droplets, FlaskConical, TrendingUp, Bot, Tractor,
  AlertTriangle, Sprout, Calendar, ArrowRight, Activity, Wrench,
  MapPin, Thermometer, Wind, Bell,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Button, Badge, ProgressBar, StatCard, SectionHeader, Alert } from '@/components/ui';
import { cropPlots, weatherData, currentWeather, soilReadings, diseaseAlerts, marketPrices, notifications } from '@/data/mockData';

export function DashboardPage() {
  const { navigate, user } = useApp();
  const todayWeather = weatherData[0];
  const unreadNotifs = notifications.filter(n => !n.read).slice(0, 3);
  const activeAlerts = diseaseAlerts.filter(d => d.status !== 'resolved');
  const avgHealth = Math.round(cropPlots.reduce((a, c) => a + c.healthScore, 0) / cropPlots.length);
  const avgMoisture = Math.round(soilReadings.reduce((a, s) => a + s.moisture, 0) / soilReadings.length);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-secondary-700 rounded-2xl p-6 text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-primary-200 text-sm">காலை வணக்கம், Good morning</p>
            <h2 className="font-display text-2xl font-bold mt-1">{user.name}</h2>
            <p className="text-primary-100 text-sm mt-1 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {user.village}, {user.district}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="white" size="sm" onClick={() => navigate('assistant')}>
              <Bot className="w-4 h-4" /> Ask AI
            </Button>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {activeAlerts.length > 0 && (
        <Alert variant="warning" title={`${activeAlerts.length} pest/disease alert${activeAlerts.length > 1 ? 's' : ''} need attention`}>
          <button onClick={() => navigate('crop-health')} className="font-semibold underline">
            View crop health details →
          </button>
        </Alert>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Activity} label="Avg Crop Health" value={`${avgHealth}%`} color="primary" trend="up" />
        <StatCard icon={Droplets} label="Soil Moisture" value={`${avgMoisture}%`} sublabel="4 zones" color="secondary" />
        <StatCard icon={CloudSun} label="Today's Temp" value={`${currentWeather.temp}°C`} sublabel={currentWeather.condition} color="accent" />
        <StatCard icon={TrendingUp} label="Active Crops" value={cropPlots.length} sublabel="3.5 acres total" color="primary" />
      </div>

      {/* Weather + AI Insight */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <SectionHeader
            title="Weather Today"
            tamil="இன்றைய வானிலை"
            action={<Button variant="ghost" size="sm" onClick={() => navigate('weather')}>Details <ArrowRight className="w-4 h-4" /></Button>}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-accent-50 rounded-2xl flex items-center justify-center">
                <CloudSun className="w-8 h-8 text-accent-500" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{currentWeather.temp}°C</p>
                <p className="text-sm text-gray-500">{currentWeather.condition}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 flex-1">
              <div>
                <Droplets className="w-4 h-4 text-secondary-500 mb-1" />
                <p className="text-xs text-gray-400">Humidity</p>
                <p className="text-sm font-bold text-gray-900">{currentWeather.humidity}%</p>
              </div>
              <div>
                <Wind className="w-4 h-4 text-gray-400 mb-1" />
                <p className="text-xs text-gray-400">Wind</p>
                <p className="text-sm font-bold text-gray-900">{currentWeather.windSpeed} km/h</p>
              </div>
              <div>
                <CloudSun className="w-4 h-4 text-accent-500 mb-1" />
                <p className="text-xs text-gray-400">Rain</p>
                <p className="text-sm font-bold text-gray-900">{currentWeather.rainChance}%</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-accent-50 rounded-xl flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-accent-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-accent-700">Heavy rain expected Oct 10-11. Complete pesticide spray by Oct 8 and check drainage.</p>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-primary-600 to-secondary-600 text-white border-0">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-5 h-5" />
            <p className="font-semibold">AI Insight</p>
          </div>
          <p className="text-sm text-primary-50 leading-relaxed">
            Your paddy is in tillering stage. Apply second nitrogen dose this week. Brown spot risk detected — preventive fungicide recommended.
          </p>
          <Button variant="white" size="sm" className="mt-4" onClick={() => navigate('assistant')}>
            Chat with AI <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      </div>

      {/* Crop Plots Overview */}
      <div>
        <SectionHeader
          title="My Crops"
          tamil="என் பயிர்கள்"
          action={<Button variant="ghost" size="sm" onClick={() => navigate('farm')}>View farm <ArrowRight className="w-4 h-4" /></Button>}
        />
        <div className="grid md:grid-cols-3 gap-4">
          {cropPlots.map(crop => (
            <Card key={crop.id} className="overflow-hidden" onClick={() => navigate('farm')}>
              <div className={`h-2 ${crop.healthScore >= 85 ? 'bg-success-500' : crop.healthScore >= 70 ? 'bg-warning-500' : 'bg-error-500'}`} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{crop.name}</p>
                    <p className="text-xs text-primary-600">{crop.tamilName}</p>
                  </div>
                  <Badge variant={crop.healthScore >= 85 ? 'success' : 'warning'}>{crop.healthScore}%</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Stage</span>
                    <span className="font-medium text-gray-700">{crop.stage}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Area</span>
                    <span className="font-medium text-gray-700">{crop.area} acres</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Harvest</span>
                    <span className="font-medium text-gray-700">{crop.expectedHarvest}</span>
                  </div>
                </div>
                <ProgressBar value={crop.healthScore} color={crop.healthScore >= 85 ? 'primary' : 'warning'} className="mt-3" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Soil Zones + Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <SectionHeader
            title="Soil Moisture"
            tamil="மண் ஈரப்பதம்"
            action={<Button variant="ghost" size="sm" onClick={() => navigate('soil-health')}>Details <ArrowRight className="w-4 h-4" /></Button>}
          />
          <div className="space-y-3">
            {soilReadings.map(zone => (
              <div key={zone.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700">{zone.zone}</span>
                  <span className={`font-semibold ${zone.status === 'healthy' ? 'text-success-600' : zone.status === 'warning' ? 'text-warning-600' : 'text-error-500'}`}>
                    {zone.moisture}%
                  </span>
                </div>
                <ProgressBar value={zone.moisture} color={zone.status === 'healthy' ? 'primary' : zone.status === 'warning' ? 'warning' : 'error'} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeader title="Quick Actions" tamil="சீரிய செயல்கள்" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Bot, label: 'Ask AI', page: 'assistant' as const, color: 'bg-primary-50 text-primary-600' },
              { icon: Wrench, label: 'Book Service', page: 'services' as const, color: 'bg-accent-50 text-accent-600' },
              { icon: TrendingUp, label: 'Market Prices', page: 'market' as const, color: 'bg-secondary-50 text-secondary-600' },
              { icon: FlaskConical, label: 'Soil Health', page: 'soil-health' as const, color: 'bg-soil-50 text-soil-600' },
              { icon: CloudSun, label: 'Weather', page: 'weather' as const, color: 'bg-accent-50 text-accent-600' },
              { icon: Tractor, label: 'My Farm', page: 'farm' as const, color: 'bg-primary-50 text-primary-600' },
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <button
                  key={i}
                  onClick={() => navigate(action.page)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{action.label}</span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Notifications + Market Snapshot */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <SectionHeader title="Recent Alerts" tamil="அறிவிப்புகள்" />
          <div className="space-y-3">
            {unreadNotifs.map(n => (
              <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeader
            title="Market Snapshot"
            tamil="சந்தை விலை"
            action={<Button variant="ghost" size="sm" onClick={() => navigate('market')}>All prices <ArrowRight className="w-4 h-4" /></Button>}
          />
          <div className="space-y-3">
            {marketPrices.slice(0, 3).map(m => (
              <div key={m.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{m.crop}</p>
                  <p className="text-xs text-gray-400">{m.tamilName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">₹{m.price.toLocaleString()}</p>
                  <p className={`text-xs font-semibold ${m.trend === 'up' ? 'text-success-600' : m.trend === 'down' ? 'text-error-500' : 'text-gray-400'}`}>
                    {m.trend === 'up' ? '↑' : m.trend === 'down' ? '↓' : '→'} ₹{Math.abs(m.price - m.previousPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
