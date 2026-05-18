import React from 'react';
import { Loader2 } from 'lucide-react';

export const Skeleton = ({ width = 'w-full', height = 'h-4', className = '' }) => (
  <div className={`${width} ${height} bg-gray-200 rounded animate-pulse ${className}`} />
);

export const SkeletonCard = () => (
  <div className="bg-white rounded-lg p-4 shadow-md">
    <Skeleton height="h-48" className="mb-4" />
    <Skeleton className="mb-2" />
    <Skeleton width="w-2/3" className="mb-4" />
    <Skeleton width="w-1/2" height="h-3" />
  </div>
);

export const SkeletonList = ({ count = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} height="h-12" />
    ))}
  </div>
);

export const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-2" />
    <p className="text-gray-600">{message}</p>
  </div>
);
