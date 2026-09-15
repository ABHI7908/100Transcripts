import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colors = {
    blue: 'border-blue-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    slate: 'border-slate-400 border-t-transparent',
  };

  return (
    <div
      className={`${sizes[size]} ${colors[color]} rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default LoadingSpinner;
