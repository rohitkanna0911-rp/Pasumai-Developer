import { useState } from 'react';
import { Sprout, Mail, Lock, User as UserIcon, Phone, MapPin, ArrowRight, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui';

export function LoginPage() {
  const { navigate, login } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: 'karthik.farmer@email.com', password: 'farmer123',
    phone: '', village: '', district: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-800 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-secondary-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative flex flex-col justify-between p-12 text-white w-full">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-xl">Pasumai AI</p>
                <p className="text-sm text-primary-200">Uzhavan</p>
              </div>
            </div>
          </div>

          <div>
            <h1 className="font-display text-4xl font-extrabold leading-tight">
              Welcome back to<br />your smart farm
            </h1>
            <p className="text-primary-100 text-lg mt-4 max-w-md">
              Monitor your crops, get AI recommendations, and book farm services — all in one place.
            </p>
            <p className="text-primary-200 mt-2">உங்கள் விவசாய துணையை அணுகவும்</p>

            <div className="space-y-3 mt-10">
              {[
                'AI crop disease detection with treatment plans',
                'Real-time soil moisture and nutrient tracking',
                'Book labour, drones, and machinery instantly',
                'Live market prices with selling recommendations',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-300 flex-shrink-0" />
                  <p className="text-primary-100">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-primary-300 text-sm">Trusted by 10,000+ farmers across Tamil Nadu</p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="flex items-center justify-between p-4 lg:hidden">
          <button onClick={() => navigate('home')} className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <button onClick={() => navigate('home')} className="hidden lg:flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </button>

            <h2 className="font-display text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {mode === 'login' ? 'Welcome back, Uzhavan!' : 'Join thousands of smart farmers today.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative mt-1.5">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text" required value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Karthik R"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email" required value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="farmer@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'} required value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-11 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <div className="relative mt-1.5">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-11 pr-3 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="+91" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Village</label>
                      <div className="relative mt-1.5">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" required value={formData.village} onChange={e => setFormData({ ...formData, village: e.target.value })}
                          className="w-full pl-11 pr-3 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Village" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    Remember me
                  </label>
                  <button type="button" className="text-primary-600 font-medium hover:underline">Forgot password?</button>
                </div>
              )}

              <Button type="submit" fullWidth size="lg" className="mt-2">
                {mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-primary-600 font-semibold hover:underline">
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {mode === 'login' && (
              <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
                <p className="text-xs text-primary-700 font-medium mb-1">Demo Account (pre-filled):</p>
                <p className="text-xs text-primary-600">Email: karthik.farmer@email.com</p>
                <p className="text-xs text-primary-600">Password: farmer123</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
