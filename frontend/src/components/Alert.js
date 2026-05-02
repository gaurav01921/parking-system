import React, { useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const Alert = ({ type, message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const styles = {
    success: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      icon: CheckCircle2,
      glow: 'shadow-emerald-500/20'
    },
    error: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      text: 'text-rose-400',
      icon: AlertCircle,
      glow: 'shadow-rose-500/20'
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-400',
      icon: Info,
      glow: 'shadow-blue-500/20'
    }
  };

  const style = styles[type] || styles.info;
  const Icon = style.icon;

  return (
    <div className={`glass rounded-2xl border ${style.border} p-4 flex items-center gap-4 min-w-[320px] shadow-2xl ${style.glow}`}>
      <div className={`p-2 rounded-xl ${style.bg}`}>
        <Icon className={`w-5 h-5 ${style.text}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-white/90 leading-tight">{type === 'success' ? 'Success' : 'Attention'}</p>
        <p className="text-xs font-medium text-white/50 leading-tight mt-1">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-white/5 rounded-lg transition-colors text-white/20 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Alert;

