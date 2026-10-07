import { useState } from 'react';
import {
  HeartPulse, Camera, AlertTriangle, CheckCircle, Clock,
  Bug, Leaf, Shield, ChevronRight, Upload, Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Button, Badge, SectionHeader, Alert } from '@/components/ui';
import { diseaseAlerts, cropPlots } from '@/data/mockData';

const severityConfig = {
  low: { color: 'success' as const, label: 'Low', border: 'border-success-200', bg: 'bg-success-50' },
  medium: { color: 'warning' as const, label: 'Medium', border: 'border-warning-200', bg: 'bg-warning-50' },
  high: { color: 'error' as const, label: 'High', border: 'border-error-200', bg: 'bg-error-50' },
};

const statusConfig = {
  pending: { label: 'Action Needed', variant: 'warning' as const },
  treating: { label: 'Under Treatment', variant: 'info' as const },
  resolved: { label: 'Resolved', variant: 'success' as const },
};

export function CropHealthPage() {
  const { navigate } = useApp();
  const [selectedAlert, setSelectedAlert] = useState(diseaseAlerts[0]);
  const [scanResult, setScanResult] = useState<'idle' | 'scanning' | 'done'>('idle');

  const handleScan = () => {
    setScanResult('scanning');
    setTimeout(() => setScanResult('done'), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid lg:grid-cols-3 gap-4">
        {cropPlots.map(crop => (
          <Card key={crop.id} className="p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-bold text-gray-900">{crop.name}</p>
                <p className="text-xs text-primary-600">{crop.tamilName}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                crop.healthScore >= 85 ? 'bg-success-50' : 'bg-warning-50'
              }`}>
                <HeartPulse className={`w-6 h-6 ${crop.healthScore >= 85 ? 'text-success-600' : 'text-warning-500'}`} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">{crop.healthScore}<span className="text-lg text-gray-400">%</span></p>
                <p className="text-xs text-gray-500">Health Score</p>
              </div>
              <Badge variant={crop.healthScore >= 85 ? 'success' : 'warning'}>
                {crop.healthScore >= 85 ? 'Good' : 'Fair'}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Disease Detection */}
      <Card className="overflow-hidden">
        <div className="p-5">
          <SectionHeader title="AI Disease & Pest Detection" tamil="செயற்பியின் நோய் கண்டறிதல்" />
          <div className="grid md:grid-cols-2 gap-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary-300 transition-colors">
              {scanResult === 'idle' && (
                <>
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary-600" />
                  </div>
                  <p className="font-semibold text-gray-900">Upload a crop photo</p>
                  <p className="text-sm text-gray-500 mt-1">AI will detect diseases and pests</p>
                  <Button className="mt-4" onClick={handleScan}>
                    <Camera className="w-4 h-4" /> Scan Crop Photo
                  </Button>
                </>
              )}
              {scanResult === 'scanning' && (
                <div className="py-8">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute inset-0 border-4 border-primary-200 rounded-full" />
                    <div className="absolute inset-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="font-semibold text-gray-900">Analyzing image...</p>
                  <p className="text-sm text-gray-500 mt-1">Detecting diseases and pests</p>
                </div>
              )}
              {scanResult === 'done' && (
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-error-50 rounded-xl flex items-center justify-center">
                      <Bug className="w-5 h-5 text-error-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Stem Borer Detected</p>
                      <p className="text-xs text-error-500">High severity — 78% confidence</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600"><strong>Affected area:</strong> Zone A, Paddy field</p>
                    <p className="text-gray-600"><strong>Symptoms:</strong> Dead hearts, white ears</p>
                    <p className="text-gray-600"><strong>Recommendation:</strong> Apply Cartap hydrochloride 4G @ 20kg/ha. Install pheromone traps @ 8/acre.</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => setScanResult('idle')}>
                    Scan Another Photo
                  </Button>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary-600" />
                <p className="font-semibold text-primary-700">How AI Detection Works</p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Camera, title: 'Capture', desc: 'Take a clear photo of affected leaves or stems' },
                  { icon: Sparkles, title: 'AI Analysis', desc: 'Our model identifies 50+ diseases and pests in seconds' },
                  { icon: Shield, title: 'Get Treatment', desc: 'Receive specific treatment recommendations and dosage' },
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                        <p className="text-xs text-gray-500">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Disease Alerts */}
      <div>
        <SectionHeader title="Active Disease & Pest Alerts" tamil="நோய் & பூச்சி அறிவிப்புகள்" />
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Alert List */}
          <div className="lg:col-span-1 space-y-3">
            {diseaseAlerts.map(alert => {
              const sev = severityConfig[alert.severity];
              const isActive = selectedAlert.id === alert.id;
              return (
                <Card
                  key={alert.id}
                  className={`p-4 border-2 ${isActive ? 'border-primary-300' : 'border-transparent'} ${sev.bg}`}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        alert.severity === 'high' ? 'bg-error-100' : alert.severity === 'medium' ? 'bg-warning-100' : 'bg-success-100'
                      }`}>
                        {alert.status === 'resolved' ? <CheckCircle className="w-5 h-5 text-success-600" /> : <AlertTriangle className={`w-5 h-5 ${
                          alert.severity === 'high' ? 'text-error-500' : alert.severity === 'medium' ? 'text-warning-500' : 'text-success-600'
                        }`} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{alert.disease}</p>
                        <p className="text-xs text-gray-500">{alert.crop}</p>
                      </div>
                    </div>
                    <Badge variant={sev.color}>{sev.label}</Badge>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Alert Detail */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-gray-900">{selectedAlert.disease}</h3>
                  <span className="text-sm text-primary-600">{selectedAlert.tamilName}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{selectedAlert.crop} · Detected {selectedAlert.detectedDate}</p>
              </div>
              <Badge variant={statusConfig[selectedAlert.status].variant}>
                {statusConfig[selectedAlert.status].label}
              </Badge>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Severity</p>
                <p className={`font-bold ${selectedAlert.severity === 'high' ? 'text-error-500' : selectedAlert.severity === 'medium' ? 'text-warning-500' : 'text-success-600'}`}>
                  {severityConfig[selectedAlert.severity].label}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Crop</p>
                <p className="font-bold text-gray-900">{selectedAlert.crop}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Detected</p>
                <p className="font-bold text-gray-900">{selectedAlert.detectedDate}</p>
              </div>
            </div>

            {/* Mock image area */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-48 flex items-center justify-center mb-4">
              <div className="text-center">
                <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Affected leaf image</p>
              </div>
            </div>

            <div className="bg-primary-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-primary-700 mb-2">AI Recommendation</p>
              <p className="text-sm text-primary-700 leading-relaxed">{selectedAlert.recommendation}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <Button size="sm" onClick={() => navigate('assistant')}>
                Ask AI for More Details <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('services')}>
                Find Treatment Supplier
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
