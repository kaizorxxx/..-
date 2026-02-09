
import React from 'react';

export const CardSkeleton = () => (
  <div className="flex flex-col space-y-3 animate-pulse">
    <div className="bg-neutral-800 rounded-lg aspect-[2/3] w-full" />
    <div className="h-4 bg-neutral-800 rounded w-3/4" />
    <div className="h-3 bg-neutral-800 rounded w-1/2" />
  </div>
);

export const GridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 md:px-12 py-8">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const HeroSkeleton = () => (
  <div className="w-full h-[60vh] md:h-[85vh] bg-neutral-900 animate-pulse" />
);
