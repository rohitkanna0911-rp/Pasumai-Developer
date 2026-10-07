import {
  Sprout, Bot, CloudSun, FlaskConical, TrendingUp, Wrench, HeartPulse,
  Droplets, Plane, Users, Tractor, Warehouse, Truck, Shield,
  ArrowRight, CheckCircle, Leaf, Smartphone, Zap, MessageCircle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui';

export function HomePage() {
  const { navigate, login } = useApp();

  const features = [
    { icon: Bot, title: 'AI Farming Assistant', tamil: 'செயற்பியின் விவசாயி', desc: 'Get instant answers about crops, pests, and farming practices in your language.' },
    { icon: CloudSun, title: 'Weather Forecast', tamil: 'வானிலை முன்னறிவிப்பு', desc: '7-day local weather forecast with farming advisories for every condition.' },
    { icon: FlaskConical, title: 'Soil Health Monitoring', tamil: 'மண் ஆரோக்கியம்', desc: 'Track moisture, pH, and nutrients across your field zones in real-time.' },
    { icon: HeartPulse, title: 'Crop Disease Detection', tamil: 'பயிர் நோய் கண்டறிதல்', desc: 'AI-powered disease and pest detection with treatment recommendations.' },
    { icon: TrendingUp, title: 'Live Market Prices', tamil: 'சந்தை விலை', desc: 'Check daily mandi prices and get selling recommendations.' },
    { icon: Wrench, title: 'Farm Services Booking', tamil: 'விவசாய சேவைகள்', desc: 'Book labour, machinery, drones, and more with a few taps.' },
  ];

  const services = [
    { icon: Users, label: 'Labour' }, { icon: Tractor, label: 'Machinery' },
    { icon: Plane, label: 'Drone Spraying' }, { icon: FlaskConical, label: 'Soil Testing' },
    { icon: Droplets, label: 'Irrigation' }, { icon: Truck, label: 'Transport' },
    { icon: Warehouse, label: 'Storage' }, { icon: Sprout, label: 'Seeds & Fertilizers' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-10 right-10 w-72 h-72 bg-secondary-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 lg:px-6 py-12 lg:py-20">
          <nav className="flex items-center justify-between mb-12 lg:mb-20">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-lg leading-tight">Pasumai AI</p>
                <p className="text-xs text-primary-200">Uzhavan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('login')} className="text-sm font-medium text-white/90 hover:text-white">
                Login
              </button>
              <Button variant="white" size="sm" onClick={() => navigate('login')}>
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-full text-xs font-medium mb-6 animate-fade-in">
              <Leaf className="w-3.5 h-3.5" />
              AI-Powered Smart Farming for Tamil Nadu
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-extrabold leading-tight animate-slide-up">
              Cultivate smarter.<br />
              <span className="text-accent-300">Harvest better.</span>
            </h1>
            <p className="text-lg text-primary-100 mt-6 leading-relaxed animate-slide-up">
              Pasumai AI – Uzhavan is your AI farming companion. Monitor crops, detect diseases, check market prices, book farm services — all from your phone.
            </p>
            <p className="text-base text-primary-200 mt-2 font-medium">
              பசுமை AI – உழவன்: உங்கள் விவசாயத்திற்கான செயற்பியின் துணை
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 animate-slide-up">
              <Button variant="white" size="lg" onClick={() => navigate('login')}>
                Start Free <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('login')} className="text-white hover:bg-white/10 border border-white/20">
                <Smartphone className="w-5 h-5" /> See Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {[
              { value: '10,000+', label: 'Farmers' },
              { value: '21', label: 'AI Features' },
              { value: '8', label: 'Service Types' },
              { value: '12', label: 'Districts' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
                <p className="text-2xl lg:text-3xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-primary-200 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-full text-xs font-semibold text-primary-700 mb-4">
            <Zap className="w-3.5 h-3.5" /> Features
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">Everything your farm needs, in one app</h2>
          <p className="text-gray-500 mt-4 text-lg">From AI crop diagnosis to booking a tractor — we've built 21 features that small-scale farmers actually use.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{f.title}</h3>
                <p className="text-sm text-primary-600 font-medium mt-0.5">{f.tamil}</p>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">Book any farm service</h2>
            <p className="text-gray-500 mt-3 text-lg">விவசாய சேவைகள் — On-demand, verified, nearby.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 text-center">{s.label}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Button variant="primary" size="lg" onClick={() => navigate('login')}>
              Explore Services <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">How it works</h2>
            <p className="text-gray-500 mt-3 text-lg">Three simple steps to transform your farming.</p>
            <div className="space-y-6 mt-8">
              {[
                { title: 'Create your farm profile', desc: 'Add your crops, land size, and soil details. Takes less than 2 minutes.' },
                { title: 'Get AI-powered insights', desc: 'Receive daily recommendations on irrigation, fertilizer, and pest control.' },
                { title: 'Act and track results', desc: 'Book services, monitor crop health, and watch your yields improve.' },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl rotate-3" />
            <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Pasumai AI Assistant</p>
                  <p className="text-xs text-success-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Online</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-primary-50 rounded-2xl p-3 text-sm text-gray-700 max-w-[85%]">
                  What fertilizer should I apply to my tillering paddy?
                </div>
                <div className="bg-primary-600 text-white rounded-2xl p-3 text-sm max-w-[90%] ml-auto">
                  Apply 30 kg urea/acre (second split). Your soil N is 145 kg/ha — adequate but paddy needs a boost during tillering. Also add 10 kg MOP if potash is low.
                </div>
                <div className="flex gap-2">
                  {['💧 Irrigation', '🌱 Crop Care', '🐛 Pest Alert'].map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 pb-16 lg:pb-24">
        <div className="relative bg-gradient-to-br from-primary-700 to-secondary-700 rounded-3xl p-8 lg:p-14 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-400/10 rounded-full blur-3xl" />
          <div className="relative">
            <Shield className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Ready to transform your farm?</h2>
            <p className="text-primary-100 mt-4 text-lg max-w-xl mx-auto">Join thousands of farmers using Pasumai AI to grow more, save more, and farm smarter.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button variant="white" size="lg" onClick={() => navigate('login')}>
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('login')} className="text-white hover:bg-white/10 border border-white/20">
                <MessageCircle className="w-5 h-5" /> Talk to AI
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm">Pasumai AI – Uzhavan</p>
                <p className="text-xs text-gray-500">AI-Powered Smart Farming Platform</p>
              </div>
            </div>
            <p className="text-xs">Built for social impact. Hackathon prototype — 2024.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
