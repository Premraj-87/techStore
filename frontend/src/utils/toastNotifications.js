import toast from 'react-hot-toast';

export const showSuccessToast = (message) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#10b981',
      color: '#fff',
      fontSize: '14px',
      borderRadius: '8px',
      padding: '12px 16px',
    },
    icon: '✅',
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#ef4444',
      color: '#fff',
      fontSize: '14px',
      borderRadius: '8px',
      padding: '12px 16px',
    },
    icon: '❌',
  });
};

export const showWarningToast = (message) => {
  toast(`⚠️ ${message}`, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#eab308',
      color: '#000',
      borderRadius: '8px',
      padding: '12px 16px',
    },
  });
};

export const showInfoToast = (message) => {
  toast(`ℹ️ ${message}`, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#3b82f6',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
    },
  });
};