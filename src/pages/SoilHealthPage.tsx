import {
  FlaskConical, Droplets, Thermometer, Zap, Beaker, Leaf,
  AlertTriangle, CheckCircle, XCircle, TrendingUp, Plus,
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar, SectionHeader, Alert } from '@/components/ui';
import { soilReadings } from '@/data/mockData';

const statusConfig = {
  healthy: { icon: CheckCircle, color: 'text-success-600', bg: 'bg-success-50', border: 'border-success-200', label: 'Healthy', variant: 'success' as const },
  warning: { icon: AlertTriangle, color: 'text-warning-500', bg: 'bg-warning-50', border: 'border-warning-200', label: 'Warning', variant: 'warning' as const },
  critical: { icon: XCircle, color: 'text-error-500', bg: 'bg-error-50', border: 'border-error-200', label: 'Critical', variant: 'error' as const },
};

const nutrientRanges = [
  { name: 'Nitrogen (N)', min: 120, max: 200, unit: 'kg/ha', icon: Leaf },
  { name: 'Phosphorus (P)', min: 30, max: 50, unit: 'kg/ha', icon: FlaskConical },
  { name: 'Potassium (K)', min: 150, max: 250, unit: 'kg/ha', icon: Zap },
  { name: 'Organic Matter', min: 1.5, max: 3.0, unit: '%', icon: Beaker },
];

export function SoilHealthPage() {
  const avgMoisture = Math.round(soilReadings.reduce((a, s) => a + s.moisture, 0) / soilReadings.length);
  const avgPH = (soilReadings.reduce((a, s) => a + s.ph, 0) / soilReadings.length).toFixed(1);
  const healthyZones = soilReadings.filter(s => s.status === 'healthy').length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 bg-secondary-50 rounded-xl flex items-center justify-center">
              <Droplets className="w-5 h-5 text-secondary-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{avgMoisture}%</p>
          <p className="text-xs text-gray-500">Avg Moisture</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{avgPH}</p>
          <p className="text-xs text-gray-500">Avg pH Level</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 bg-accent-50 rounded-xl flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-accent-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{Math.round(soilReadings.reduce((a, s) => a + s.temperature, 0) / soilReadings.length)}°C</p>
          <p className="text-xs text-gray-500">Avg Soil Temp</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 bg-success-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{healthyZones}/{soilReadings.length}</p>
          <p className="text-xs text-gray-500">Healthy Zones</p>
        </Card>
      </div>

      {/* Critical Alert */}
      {soilReadings.some(s => s.status === 'critical') && (
        <Alert variant="error" title="Zone D — Critical Soil Condition">
          pH is 4.9 (too acidic) and moisture at 18%. Apply agricultural lime @ 1 ton/acre and irrigate before next planting cycle.
        </Alert>
      )}

      {/* Zone Cards */}
      <div>
        <SectionHeader
          title="Soil Zones"
          tamil="மண் மண்டலங்கள்"
          action={<Button variant="outline" size="sm"><Plus className="w-4 h-4" /> Add Zone</Button>}
        />
        <div className="grid md:grid-cols-2 gap-4">
          {soilReadings.map(zone => {
            const status = statusConfig[zone.status];
            const StatusIcon = status.icon;
            return (
              <Card key={zone.id} className={`p-5 border-2 ${status.border}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.bg}`}>
                      <StatusIcon className={`w-5 h-5 ${status.color}`} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{zone.zone}</p>
                      <Badge variant={status.variant} className="mt-1">{status.label}</Badge>
                    </div>
                  </div>
                </div>

                {/* Moisture */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Droplets className="w-4 h-4 text-secondary-500" /> Moisture
                    </span>
                    <span className="font-bold text-gray-900">{zone.moisture}%</span>
                  </div>
                  <ProgressBar value={zone.moisture} color={zone.status === 'healthy' ? 'primary' : zone.status === 'warning' ? 'warning' : 'error'} />
                </div>

                {/* pH */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <FlaskConical className="w-4 h-4 text-primary-500" /> pH Level
                    </span>
                    <span className={`font-bold ${zone.ph < 5.5 || zone.ph > 7.5 ? 'text-error-500' : 'text-success-600'}`}>
                      {zone.ph}
                    </span>
                  </div>
                  <div className="relative h-2 bg-gradient-to-r from-error-400 via-success-400 to-error-400 rounded-full">
                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-gray-700 rounded-full" style={{ left: `${(zone.ph / 14) * 100}%`, transform: 'translate(-50%, -50%)' }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Acidic</span><span>Neutral</span><span>Alkaline</span>
                  </div>
                </div>

                {/* NPK + Others */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'N', value: zone.nitrogen, unit: 'kg/ha' },
                    { label: 'P', value: zone.phosphorus, unit: 'kg/ha' },
                    { label: 'K', value: zone.potassium, unit: 'kg/ha' },
                  ].map(n => (
                    <div key={n.label} className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-400 font-medium">{n.label}</p>
                      <p className="text-sm font-bold text-gray-900">{n.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-400">Organic</p>
                    <p className="text-sm font-bold text-gray-900">{zone.organicMatter}%</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-400">Temp</p>
                    <p className="text-sm font-bold text-gray-900">{zone.temperature}°C</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-400">EC</p>
                    <p className="text-sm font-bold text-gray-900">{zone.ec}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Nutrient Analysis */}
      <Card className="p-5">
        <SectionHeader title="Nutrient Analysis" tamil="ஊட்டச்சத்து பகுப்பாய்வு" subtitle="Average across all zones" />
        <div className="space-y-4">
          {nutrientRanges.map(nutrient => {
            const avg = soilReadings.reduce((a, s) => {
              if (nutrient.name.includes('Nitrogen')) return a + s.nitrogen;
              if (nutrient.name.includes('Phosphorus')) return a + s.phosphorus;
              if (nutrient.name.includes('Potassium')) return a + s.potassium;
              return a + s.organicMatter;
            }, 0) / soilReadings.length;
            const Icon = nutrient.icon;
            const isLow = avg < nutrient.min;
            const isHigh = avg > nutrient.max;
            const status = isLow ? 'low' : isHigh ? 'high' : 'optimal';

            return (
              <div key={nutrient.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{nutrient.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{avg.toFixed(1)} {nutrient.unit}</span>
                    <Badge variant={status === 'optimal' ? 'success' : 'warning'}>
                      {status === 'optimal' ? 'Optimal' : status === 'low' ? 'Low' : 'High'}
                    </Badge>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full">
                  <div className="absolute h-full bg-success-400 rounded-full" style={{ left: `${(nutrient.min / (nutrient.max * 1.5)) * 100}%`, width: `${((nutrient.max - nutrient.min) / (nutrient.max * 1.5)) * 100}%` }} />
                  <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 ${status === 'optimal' ? 'bg-success-600' : 'bg-warning-500'} rounded-full border-2 border-white shadow`} style={{ left: `${(avg / (nutrient.max * 1.5)) * 100}%`, transform: 'translate(-50%, -50%)' }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Irrigation & Fertilizer Recommendations */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <SectionHeader title="Irrigation Recommendations" tamil="நீர்ப்பாசன பரிந்தோதனை" />
          <div className="space-y-3">
            {soilReadings.map(zone => (
              <div key={zone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Droplets className={`w-4 h-4 ${zone.moisture < 30 ? 'text-error-500' : zone.moisture < 45 ? 'text-warning-500' : 'text-secondary-500'}`} />
                  <span className="text-sm text-gray-700">{zone.zone}</span>
                </div>
                <span className={`text-sm font-semibold ${zone.moisture < 30 ? 'text-error-500' : zone.moisture < 45 ? 'text-warning-600' : 'text-success-600'}`}>
                  {zone.moisture < 30 ? 'Irrigate now' : zone.moisture < 45 ? 'Irrigate soon' : 'No action'}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeader title="Fertilizer Recommendations" tamil="உர பரிந்தோதனை" />
          <div className="space-y-3">
            <div className="p-3 bg-primary-50 rounded-xl">
              <p className="text-sm font-semibold text-primary-700">Zone D — Lime Application</p>
              <p className="text-xs text-primary-600 mt-1">Apply agricultural lime @ 1 ton/acre to correct pH (4.9 → 6.5). Do it 2 weeks before next planting.</p>
            </div>
            <div className="p-3 bg-secondary-50 rounded-xl">
              <p className="text-sm font-semibold text-secondary-700">Zone B — NPK Boost</p>
              <p className="text-xs text-secondary-600 mt-1">Nitrogen at 82 kg/ha (low). Apply 25 kg urea/acre. Phosphorus also low — add 15 kg SSP/acre.</p>
            </div>
            <div className="p-3 bg-success-50 rounded-xl">
              <p className="text-sm font-semibold text-success-700">Zone C — Maintain</p>
              <p className="text-xs text-success-600 mt-1">All nutrients in optimal range. Continue current fertilizer schedule.</p>
            </div>
            <div className="p-3 bg-accent-50 rounded-xl">
              <p className="text-sm font-semibold text-accent-700">All Zones — Organic Matter</p>
              <p className="text-xs text-accent-600 mt-1">Apply 2 tons vermicompost/acre to improve organic matter across all zones.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
