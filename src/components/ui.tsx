import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info, type LucideIcon } from 'lucide-react';

type Variant = 'success' | 'warning' | 'error' | 'info';

const variantConfig: Record<Variant, { icon: LucideIcon; bg: string; border: string; text: string; iconColor: string }> = {
  success: { icon: CheckCircle, bg: 'bg-success-50', border: 'border-success-100', text: 'text-success-700', iconColor: 'text-success-600' },
  warning: { icon: AlertTriangle, bg: 'bg-warning-50', border: 'border-warning-100', text: 'text-warning-600', iconColor: 'text-warning-500' },
  error: { icon: XCircle, bg: 'bg-error-50', border: 'border-error-100', text: 'text-error-700', iconColor: 'text-error-500' },
  info: { icon: Info, bg: 'bg-primary-50', border: 'border-primary-100', text: 'text-primary-700', iconColor: 'text-primary-600' },
};

export function Alert({ variant = 'info', title, children, className = '' }: { variant?: Variant; title?: string; children?: ReactNode; className?: string }) {
  const config = variantConfig[variant];
  const Icon = config.icon;
  return (
    <div className={`flex items-start gap-3 rounded-2xl border ${config.bg} ${config.border} p-4 ${className}`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1">
        {title && <p className={`font-semibold text-sm ${config.text}`}>{title}</p>}
        {children && <div className={`text-sm ${config.text} ${title ? 'mt-1' : ''}`}>{children}</div>}
      </div>
    </div>
  );
}

export function Card({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({
  children, onClick, variant = 'primary', size = 'md', className = '', type = 'button', disabled = false, fullWidth = false,
}: {
  children: ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'white';
  size?: 'sm' | 'md' | 'lg'; className?: string; type?: 'button' | 'submit'; disabled?: boolean; fullWidth?: boolean;
}) {
  const variants: Record<string, string> = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm shadow-primary-600/20',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 shadow-sm shadow-secondary-600/20',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 shadow-sm shadow-accent-500/20',
    outline: 'border-2 border-primary-600 text-primary-700 hover:bg-primary-50',
    ghost: 'text-primary-700 hover:bg-primary-50',
    white: 'bg-white text-primary-700 hover:bg-gray-50 shadow-sm border border-gray-200',
  };
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3.5 text-base rounded-xl gap-2.5',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export function Badge({ children, variant = 'default', className = '' }: { children: ReactNode; variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'; className?: string }) {
  const variants: Record<string, string> = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-600',
    error: 'bg-error-100 text-error-700',
    info: 'bg-primary-100 text-primary-700',
    accent: 'bg-accent-100 text-accent-700',
  };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>{children}</span>;
}

export function ProgressBar({ value, max = 100, color = 'primary', className = '' }: { value: number; max?: number; color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'error'; className?: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  const colors: Record<string, string> = {
    primary: 'bg-primary-500', secondary: 'bg-secondary-500', accent: 'bg-accent-500', warning: 'bg-warning-500', error: 'bg-error-500',
  };
  return (
    <div className={`w-full bg-gray-100 rounded-full h-2 overflow-hidden ${className}`}>
      <div className={`h-full ${colors[color]} rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, sublabel, color = 'primary', trend }: { icon: LucideIcon; label: string; value: string | number; sublabel?: string; color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'error' | 'soil'; trend?: 'up' | 'down' | 'stable' }) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary-50 text-primary-600', secondary: 'bg-secondary-50 text-secondary-600',
    accent: 'bg-accent-50 text-accent-600', warning: 'bg-warning-50 text-warning-500',
    error: 'bg-error-50 text-error-500', soil: 'bg-soil-50 text-soil-600',
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold ${trend === 'up' ? 'text-success-600' : trend === 'down' ? 'text-error-500' : 'text-gray-400'}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mt-3">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sublabel && <p className="text-xs text-gray-400 mt-1">{sublabel}</p>}
    </Card>
  );
}

export function SectionHeader({ title, subtitle, tamil, action }: { title: string; subtitle?: string; tamil?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {tamil && <p className="text-sm text-primary-600 mt-0.5">{tamil}</p>}
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Avatar({ initials, size = 'md', color = 'primary' }: { initials: string; size?: 'sm' | 'md' | 'lg'; color?: 'primary' | 'secondary' | 'accent' }) {
  const sizes: Record<string, string> = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };
  const colors: Record<string, string> = { primary: 'bg-primary-600', secondary: 'bg-secondary-600', accent: 'bg-accent-500' };
  return (
    <div className={`${sizes[size]} ${colors[color]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}
