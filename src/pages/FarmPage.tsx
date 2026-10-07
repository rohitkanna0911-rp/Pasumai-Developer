import {
  Tractor, MapPin, Sprout, Calendar, Ruler, Droplets, FlaskConical,
  TrendingUp, Plus, ChevronRight, Sun, Sprout as Seedling,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Button, Badge, ProgressBar, SectionHeader } from '@/components/ui';
import { cropPlots, cropStages } from '@/data/mockData';

export function FarmPage() {
  const { user, navigate } = useApp();
  const totalArea = cropPlots.reduce((a, c) => a + c.area, 0);

  return (
    <div className="space-y-6">
      {/* Farm Overview */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-primary-600 to-secondary-700 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Tractor className="w-5 h-5" />
              <p className="text-primary-200 text-sm">My Farm</p>
            </div>
            <h2 className="font-display text-2xl font-bold">{user.name}'s Farm</h2>
            <p className="text-primary-100 text-sm mt-1 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {user.village}, {user.district}, {user.state}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div>
                <p className="text-2xl font-bold">{totalArea}</p>
                <p className="text-xs text-primary-200">Acres</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{cropPlots.length}</p>
                <p className="text-xs text-primary-200">Crops</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{user.experience}</p>
                <p className="text-xs text-primary-200">Years Exp.</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{user.soilType.split(' ')[0]}</p>
                <p className="text-xs text-primary-200">Soil Type</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Farm Details */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-primary-600" />
            </div>
            <p className="font-semibold text-gray-900">Soil Type</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{user.soilType}</p>
          <p className="text-sm text-gray-500 mt-1">Clay-rich, good water retention</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-secondary-50 rounded-xl flex items-center justify-center">
              <Droplets className="w-5 h-5 text-secondary-600" />
            </div>
            <p className="font-semibold text-gray-900">Irrigation</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{user.irrigationType}</p>
          <p className="text-sm text-gray-500 mt-1">Water-efficient system</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-accent-600" />
            </div>
            <p className="font-semibold text-gray-900">Active Crops</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.crops.map(c => <Badge key={c} variant="info">{c}</Badge>)}
          </div>
        </Card>
      </div>

      {/* Crop Plots with Stage Details */}
      <div>
        <SectionHeader
          title="Crop Plots"
          tamil="பயிர் வயல்கள்"
          action={<Button variant="outline" size="sm"><Plus className="w-4 h-4" /> Add Plot</Button>}
        />
        <div className="space-y-5">
          {cropPlots.map(crop => {
            const stages = cropStages[crop.name] || [];
            const currentStageIndex = stages.findIndex(s => s.name === crop.stage);
            return (
              <Card key={crop.id} className="overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-gray-900">{crop.name}</h3>
                        <span className="text-sm text-primary-600">{crop.tamilName}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">Variety: {crop.variety}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={crop.healthScore >= 85 ? 'success' : 'warning'}>{crop.healthScore}% healthy</Badge>
                      <p className="text-xs text-gray-400 mt-1">{crop.area} acres</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Planted</p>
                        <p className="font-medium text-gray-700">{crop.plantedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Harvest</p>
                        <p className="font-medium text-gray-700">{crop.expectedHarvest}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Seedling className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Stage</p>
                        <p className="font-medium text-gray-700">{crop.stage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Sun className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Days in stage</p>
                        <p className="font-medium text-gray-700">{crop.daysInStage}/{crop.stageDuration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stage Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-gray-500">Growth Stages</p>
                      <p className="text-xs text-gray-400">{currentStageIndex + 1} of {stages.length}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {stages.map((stage, i) => (
                        <div key={i} className="flex-1">
                          <div className={`h-2 rounded-full transition-all ${
                            i < currentStageIndex ? 'bg-success-500' :
                            i === currentStageIndex ? 'bg-primary-500' : 'bg-gray-100'
                          }`} />
                          <p className={`text-[10px] mt-1 truncate ${i === currentStageIndex ? 'font-bold text-primary-700' : 'text-gray-400'}`}>
                            {stage.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Stage Tips */}
                  {stages[currentStageIndex] && (
                    <div className="bg-primary-50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-primary-700 mb-1">
                        {stages[currentStageIndex].name} ({stages[currentStageIndex].tamilName}) — {stages[currentStageIndex].days}
                      </p>
                      <p className="text-xs text-primary-600 mb-2">{stages[currentStageIndex].description}</p>
                      <div className="space-y-1">
                        {stages[currentStageIndex].tips.map((tip, i) => (
                          <p key={i} className="text-xs text-primary-700 flex items-start gap-1.5">
                            <span className="text-primary-400 mt-0.5">•</span> {tip}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => navigate('crop-health')}>
                      View Health <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate('assistant')}>
                      Ask AI about {crop.name}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
