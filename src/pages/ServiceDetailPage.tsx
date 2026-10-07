import { useState } from 'react';
import {
  Star, MapPin, Clock, CheckCircle, Calendar, Phone, ArrowLeft,
  Shield, Award, ArrowRight, User as UserIcon, FileText,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Button, Badge, SectionHeader, Alert } from '@/components/ui';
import { serviceProviders } from '@/data/mockData';
import type { Booking } from '@/types';

export function ServiceDetailPage() {
  const { selectedServiceId, navigate, addBooking, user } = useApp();
  const [date, setDate] = useState('2024-10-12');
  const [time, setTime] = useState('08:00');
  const [notes, setNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const provider = serviceProviders.find(p => p.id === selectedServiceId);

  if (!provider) {
    return (
      <Card className="p-12 text-center">
        <p className="text-gray-400">No service selected.</p>
        <Button className="mt-4" onClick={() => navigate('services')}>Browse Services</Button>
      </Card>
    );
  }

  const timeSlots = ['06:00', '07:00', '08:00', '09:00', '10:00', '14:00', '15:00', '16:00'];

  const handleConfirmBooking = () => {
    const booking: Booking = {
      id: `b${Date.now()}`,
      serviceId: provider.id,
      serviceName: provider.name,
      providerName: provider.provider,
      date,
      time: `${time} ${parseInt(time) < 12 ? 'AM' : 'PM'}`,
      status: 'confirmed',
      price: provider.price,
      notes,
    };
    addBooking(booking);
    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-success-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
          <p className="text-gray-500 mt-2">Your service has been booked successfully.</p>

          <div className="mt-6 text-left bg-gray-50 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between"><span className="text-gray-500 text-sm">Service</span><span className="font-semibold text-sm">{provider.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 text-sm">Provider</span><span className="font-semibold text-sm">{provider.provider}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 text-sm">Date</span><span className="font-semibold text-sm">{date}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 text-sm">Time</span><span className="font-semibold text-sm">{time} {parseInt(time) < 12 ? 'AM' : 'PM'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 text-sm">Price</span><span className="font-semibold text-sm">₹{provider.price.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 text-sm">Status</span><Badge variant="success">Confirmed</Badge></div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" fullWidth onClick={() => navigate('services')}>Book Another</Button>
            <Button fullWidth onClick={() => navigate('dashboard')}>Go to Dashboard</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('services')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" /> Back to Services
      </button>

      {/* Service Header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-primary-600 to-secondary-700 p-6 text-white relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="relative">
            <Badge variant="accent" className="mb-3">{provider.availability}</Badge>
            <h1 className="font-display text-2xl font-bold">{provider.name}</h1>
            <p className="text-primary-100 mt-1">{provider.provider}</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent-300 fill-accent-300" />
                <span className="font-bold">{provider.rating}</span>
                <span className="text-primary-200 text-sm">({provider.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-primary-100 text-sm">
                <MapPin className="w-4 h-4" /> {provider.distance} km away
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600">{provider.description}</p>

          {/* Features */}
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">What's included</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {provider.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-success-600 flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award className="w-4 h-4 text-primary-500" /> {provider.experience} years experience
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-secondary-500" /> Verified Provider
            </div>
          </div>
        </div>
      </Card>

      {/* Booking Form */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-6">
          <SectionHeader title="Book This Service" tamil="சேவை பதிவு" />

          <div className="space-y-4">
            {/* Date Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Select Date
              </label>
              <input
                type="date" value={date} onChange={e => setDate(e.target.value)}
                min="2024-10-07"
                className="w-full mt-1.5 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Select Time
              </label>
              <div className="grid grid-cols-4 gap-2 mt-1.5">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                      time === slot ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {slot}
                    <span className="text-xs ml-1">{parseInt(slot) < 12 ? 'AM' : 'PM'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Special Instructions (optional)
              </label>
              <textarea
                value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                placeholder="e.g., Need 5 workers for weeding in Zone A. Please bring own tools."
                className="w-full mt-1.5 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Booking Contact</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Price Summary */}
        <div className="space-y-4">
          <Card className="p-5 sticky top-20">
            <p className="font-semibold text-gray-900 mb-4">Price Summary</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Service charge</span>
                <span className="font-medium text-gray-900">₹{provider.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Platform fee</span>
                <span className="font-medium text-success-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Booking advance</span>
                <span className="font-medium text-gray-900">Pay on service</span>
              </div>
              <div className="pt-3 border-t border-gray-100 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-primary-600 text-lg">₹{provider.price.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400">Pay directly to provider after service</p>
            </div>

            <Button fullWidth size="lg" className="mt-5" onClick={handleConfirmBooking}>
              Confirm Booking <ArrowRight className="w-5 h-5" />
            </Button>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle className="w-4 h-4 text-success-600" /> Free cancellation up to 24 hrs
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4 text-secondary-500" /> Verified & insured providers
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Alert variant="info">
        <p>This is a prototype demo — no real payment or booking is processed. The booking will appear in your dashboard and profile.</p>
      </Alert>
    </div>
  );
}
