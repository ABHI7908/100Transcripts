import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    warning: <AlertTriangle className="text-amber-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };

  const colors = {
    success: 'border-green-500 bg-green-50',
    error: 'border-red-500 bg-red-50',
    warning: 'border-amber-500 bg-amber-50',
    info: 'border-blue-500 bg-blue-50',
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 shadow-lg ${colors[type]} animate-in slide-in-from-right duration-300`}>
      {icons[type]}
      <span className="text-sm font-medium text-slate-700">{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-black/10 rounded transition">
        <X size={16} className="text-slate-500" />
      </button>
    </div>
  );
};

export default Toast;
