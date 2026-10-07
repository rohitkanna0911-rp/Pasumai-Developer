import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Search, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Card, Badge, SectionHeader, Button } from '@/components/ui';
import { marketPrices } from '@/data/mockData';
import type { MarketPrice } from '@/types';

const trendConfig = {
  up: { icon: TrendingUp, color: 'text-success-600', bg: 'bg-success-50', label: 'Increased' },
  down: { icon: TrendingDown, color: 'text-error-500', bg: 'bg-error-50', label: 'Decreased' },
  stable: { icon: Minus, color: 'text-gray-400', bg: 'bg-gray-50', label: 'Stable' },
};

export function MarketPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'up' | 'down' | 'stable'>('all');

  const filtered = marketPrices.filter(m => {
    const matchesSearch = m.crop.toLowerCase().includes(search.toLowerCase()) || m.tamilName.includes(search);
    const matchesFilter = filter === 'all' || m.trend === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Market Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-primary-600 to-primary-700 text-white border-0">
          <p className="text-primary-200 text-sm">Total Crops Tracked</p>
          <p className="text-3xl font-bold mt-1">{marketPrices.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-gray-400 text-sm">Prices Up</p>
          <p className="text-3xl font-bold text-success-600 mt-1">{marketPrices.filter(m => m.trend === 'up').length}</p>
          <TrendingUp className="w-5 h-5 text-success-600 mt-2" />
        </Card>
        <Card className="p-5">
          <p className="text-gray-400 text-sm">Prices Down</p>
          <p className="text-3xl font-bold text-error-500 mt-1">{marketPrices.filter(m => m.trend === 'down').length}</p>
          <TrendingDown className="w-5 h-5 text-error-500 mt-2" />
        </Card>
        <Card className="p-5">
          <p className="text-gray-400 text-sm">Stable</p>
          <p className="text-3xl font-bold text-gray-500 mt-1">{marketPrices.filter(m => m.trend === 'stable').length}</p>
          <Minus className="w-5 h-5 text-gray-400 mt-2" />
        </Card>
      </div>

      {/* Search & Filter */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search crops..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'up', 'down', 'stable'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${
                  filter === f ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {f === 'all' ? 'All' : f === 'up' ? 'Rising' : f === 'down' ? 'Falling' : 'Stable'}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Price Cards */}
      <div>
        <SectionHeader title="Today's Market Prices" tamil="இன்றைய சந்தை விலை" subtitle="Updated regularly from local markets" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item: MarketPrice) => {
            const trend = trendConfig[item.trend];
            const TrendIcon = trend.icon;
            const change = item.price - item.previousPrice;
            return (
              <Card key={item.id} className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{item.crop}</p>
                    <p className="text-sm text-primary-600">{item.tamilName}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${trend.bg}`}>
                    <TrendIcon className={`w-5 h-5 ${trend.color}`} />
                  </div>
                </div>

                <div className="flex items-end justify-between mb-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">per {item.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${trend.color}`}>
                      {item.trend === 'up' ? '+' : item.trend === 'down' ? '-' : ''}₹{Math.abs(change)}
                    </p>
                    <p className="text-xs text-gray-400">Prev: ₹{item.previousPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-1 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5" /> {item.market}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" /> {item.lastUpdated}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-400">No crops found matching your search.</p>
          </Card>
        )}
      </div>

      {/* Market Insights */}
      <Card className="p-5 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100">
        <SectionHeader title="AI Market Insights" tamil="சந்தை பகுப்பாய்வு" />
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-success-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Sell Paddy Now</p>
              <p className="text-xs text-gray-600 mt-0.5">Paddy prices are up Rs. 150/quintal. Market trend suggests prices may stabilize in 2 weeks. Good time to sell surplus.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-4 h-4 text-warning-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Hold Groundnut</p>
              <p className="text-xs text-gray-600 mt-0.5">Groundnut prices dipped Rs. 200. Expected to recover in 2 weeks. Store if possible and sell later for better returns.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Black Gram above MSP</p>
              <p className="text-xs text-gray-600 mt-0.5">Market price Rs. 8,800 vs MSP Rs. 8,400. Sell at market for Rs. 400/quintal extra profit.</p>
            </div>
          </div>
        </div>
        <Button variant="primary" size="sm" className="mt-4">
          Book Transport to Market
        </Button>
      </Card>
    </div>
  );
}
