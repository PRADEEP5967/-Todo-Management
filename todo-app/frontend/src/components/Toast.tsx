import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const showToast = ({ message, type, duration = 4000 }: ToastProps) => {
  const options = {
    duration,
    style: {
      borderRadius: '12px',
      background: '#333',
      color: '#fff',
      padding: '16px',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    iconTheme: {
      primary: type === 'success' ? '#10B981' : 
              type === 'error' ? '#EF4444' : 
              type === 'warning' ? '#F59E0B' : '#6366F1',
      secondary: '#fff',
    },
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'warning':
      toast(message, { ...options, iconTheme: { primary: '#F59E0B', secondary: '#fff' } });
      break;
    case 'info':
    default:
      toast(message, options);
  }
};

const Toast: React.FC = () => {
  return (
    <Toaster 
      position="top-right" 
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    />
  );
};

export default Toast;