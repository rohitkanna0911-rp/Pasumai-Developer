import {
  CloudSun, Sun, CloudRain, CloudDrizzle, CloudLightning, Droplets,
  Wind, Eye, Sunrise, Sunset, AlertTriangle, Calendar,
} from 'lucide-react';
import { Card, SectionHeader, Alert, Badge } from '@/components/ui';
import { weatherData, currentWeather } from '@/data/mockData';

const iconMap: Record<string, typeof Sun> = {
  sun: Sun, 'cloud-sun': CloudSun, 'cloud-rain': CloudRain,
  'cloud-drizzle': CloudDrizzle, 'cloud-lightning': CloudLightning,
};

export function WeatherPage() {
  const CurrentIcon = iconMap[currentWeather.icon] || Sun;

  return (
    <div className="space-y-6">
      {/* Current Weather Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-accent-400 via-accent-500 to-accent-600 rounded-2xl p-6 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4" />
            <p className="text-accent-100 text-sm">Today, October 7, 2024</p>
          </div>
          <p className="text-accent-50 text-sm">Thiruvidaimarudur, Thanjavur</p>

          <div className="flex items-center gap-6 mt-6">
            <CurrentIcon className="w-20 h-20" />
            <div>
              <p className="text-6xl font-bold">{currentWeather.temp}°</p>
              <p className="text-lg text-accent-50">{currentWeather.condition}</p>
              <p className="text-sm text-accent-100">Feels like {currentWeather.feelsLike}°C</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[
              { icon: Droplets, label: 'Humidity', value: `${currentWeather.humidity}%` },
              { icon: Wind, label: 'Wind', value: `${currentWeather.windSpeed} km/h` },
              { icon: Sun, label: 'UV Index', value: currentWeather.uvIndex.toString() },
              { icon: Eye, label: 'Visibility', value: `${currentWeather.visibility} km` },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white/15 backdrop-blur rounded-xl p-3">
                  <Icon className="w-5 h-5 text-accent-50 mb-1.5" />
                  <p className="text-xs text-accent-100">{item.label}</p>
                  <p className="text-lg font-bold">{item.value}</p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <Sunrise className="w-4 h-4 text-accent-50" />
              <span>Sunrise {currentWeather.sunrise}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="w-4 h-4 text-accent-50" />
              <span>Sunset {currentWeather.sunset}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Alert */}
      <Alert variant="warning" title="Heavy Rain & Thunderstorm Alert — Oct 10-11">
        Thunderstorm with 85-90% rain probability expected. Secure harvested produce, clear drainage channels, and postpone pesticide/fertilizer application until after Oct 11.
      </Alert>

      {/* 7-Day Forecast */}
      <Card className="p-5">
        <SectionHeader title="7-Day Forecast" tamil="7 நாள் வானிலை" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weatherData.map((day, i) => {
            const Icon = iconMap[day.icon] || Sun;
            const isToday = i === 0;
            return (
              <div key={i} className={`rounded-2xl p-4 text-center transition-all ${
                isToday ? 'bg-primary-50 border-2 border-primary-200' : 'bg-gray-50 hover:bg-gray-100'
              }`}>
                <p className={`text-sm font-bold ${isToday ? 'text-primary-700' : 'text-gray-900'}`}>{day.day}</p>
                <p className="text-xs text-gray-400 mb-2">{day.date}</p>
                <Icon className={`w-8 h-8 mx-auto mb-2 ${isToday ? 'text-primary-600' : 'text-gray-500'}`} />
                <p className="text-xs text-gray-500 mb-1">{day.condition}</p>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-sm font-bold text-gray-900">{day.tempHigh}°</span>
                  <span className="text-xs text-gray-400">{day.tempLow}°</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-secondary-500">
                  <CloudRain className="w-3 h-3" /> {day.rainChance}%
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Farming Advisory */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <SectionHeader title="Irrigation Advisory" tamil="நீர்ப்பாசன ஆலோசனை" />
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-secondary-50 rounded-xl">
              <Droplets className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Reduce irrigation from Oct 9</p>
                <p className="text-xs text-gray-500 mt-0.5">Heavy rain expected Oct 10-11. Avoid waterlogging in paddy fields.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-primary-50 rounded-xl">
              <Droplets className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Irrigate Zone B today</p>
                <p className="text-xs text-gray-500 mt-0.5">Groundnut field moisture at 28%. Needs 15mm irrigation before rain arrives.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-success-50 rounded-xl">
              <Droplets className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Zone C — No action needed</p>
                <p className="text-xs text-gray-500 mt-0.5">Black gram moisture at 55%. Optimal levels maintained.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeader title="Farming Actions" tamil="விவசாய நடவடிக்கைகள்" />
          <div className="space-y-3">
            {[
              { icon: AlertTriangle, title: 'Complete spray by Oct 8', desc: 'Finish pesticide/foliar spray before rain starts', color: 'accent' },
              { icon: CloudRain, title: 'Check drainage channels', desc: 'Clear any blockages in paddy field drains before Oct 10', color: 'secondary' },
              { icon: Wind, title: 'Stake tall crops', desc: 'Wind speeds up to 25 km/h expected. Support tall plants to prevent lodging.', color: 'primary' },
              { icon: Sun, title: 'Good drying window Oct 12-13', desc: 'Sunny weather returns — ideal for drying harvested produce', color: 'accent' },
            ].map((action, i) => {
              const Icon = action.icon;
              const colorMap: Record<string, string> = {
                accent: 'bg-accent-50 text-accent-600',
                secondary: 'bg-secondary-50 text-secondary-600',
                primary: 'bg-primary-50 text-primary-600',
              };
              return (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[action.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{action.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{action.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
