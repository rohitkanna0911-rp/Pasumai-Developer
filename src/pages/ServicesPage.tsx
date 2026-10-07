import { useState } from 'react';
import {
  Users, Tractor, Plane, FlaskConical, Droplets, Truck,
  Warehouse, Sprout, Search, Star, MapPin, Clock, ArrowRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Badge, SectionHeader, Button } from '@/components/ui';
import { serviceCategories, serviceProviders } from '@/data/mockData';
import type { ServiceCategory, ServiceProvider } from '@/types';

const iconMap: Record<string, typeof Users> = {
  Users, Tractor, Plane, FlaskConical, Droplets, Truck, Warehouse, Sprout,
};

export function ServicesPage() {
  const { navigate, setSelectedServiceId } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = serviceProviders.filter(p => {
    const matchesCategory = !selectedCategory || p.categoryId === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.provider.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBook = (provider: ServiceProvider) => {
    setSelectedServiceId(provider.id);
    navigate('service-detail');
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search for services, equipment, providers..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Categories */}
      <div>
        <SectionHeader title="Service Categories" tamil="சேவை வகைகள்" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {serviceCategories.map((cat: ServiceCategory) => {
            const Icon = iconMap[cat.icon] || Users;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isActive ? null : cat.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  isActive ? 'border-primary-300 bg-primary-50' : 'border-gray-100 bg-white hover:border-primary-200 hover:shadow-sm'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                  isActive ? 'bg-primary-600' : 'bg-primary-50'
                }`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-primary-600'}`} />
                </div>
                <p className="font-semibold text-sm text-gray-900">{cat.name}</p>
                <p className="text-xs text-primary-600 mt-0.5">{cat.tamilName}</p>
                <p className="text-xs text-gray-400 mt-1.5">{cat.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services List */}
      <div>
        <SectionHeader
          title={selectedCategory ? `${serviceCategories.find(c => c.id === selectedCategory)?.name} Services` : 'All Services'}
          tamil="அனைத்து சேவைகளும்"
          subtitle={`${filtered.length} services available`}
          action={selectedCategory && <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>Clear filter</Button>}
        />
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((provider: ServiceProvider) => (
            <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{provider.name}</p>
                    <p className="text-sm text-gray-500">{provider.provider}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-accent-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
                    <span className="text-sm font-bold text-gray-900">{provider.rating}</span>
                    <span className="text-xs text-gray-400">({provider.reviews})</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{provider.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {provider.features.slice(0, 3).map(f => (
                    <span key={f} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{f}</span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {provider.distance} km</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {provider.availability}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div>
                    <p className="text-lg font-bold text-gray-900">₹{provider.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{provider.priceUnit}</p>
                  </div>
                  <Button size="sm" onClick={() => handleBook(provider)}>
                    Book Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {filtered.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-400">No services found. Try a different search.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
