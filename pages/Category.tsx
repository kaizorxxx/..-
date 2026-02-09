
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../services/api';
import { Movie } from '../types';
import { MovieCard } from '../components/MovieCard';
import { GridSkeleton } from '../components/Skeleton';
import { Plus } from 'lucide-react';

export const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadInitial = async () => {
      if (!id) return;
      setLoading(true);
      setPage(1);
      const data = await fetchMovies(id, 1);
      setItems(data.items);
      setHasMore(data.hasMore);
      setLoading(false);
    };
    loadInitial();
  }, [id]);

  const handleLoadMore = async () => {
    if (!id || loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const data = await fetchMovies(id, nextPage);
    setItems(prev => [...prev, ...data.items]);
    setPage(nextPage);
    setHasMore(data.hasMore);
    setLoadingMore(false);
  };

  const getTitle = (cid: string) => {
    const map: { [key: string]: string } = {
      'trending': 'Trending Now',
      'indonesian-movies': 'Indonesian Movies',
      'indonesian-drama': 'Indonesian Drama',
      'kdrama': 'Korean Drama',
      'short-tv': 'Short TV Clips',
      'anime': 'Anime Collection'
    };
    return map[cid] || cid.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-12 min-h-screen">
      <div className="max-w-[1920px] mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            {getTitle(id || '')}
          </h1>
          <div className="h-1 w-24 bg-red-600 mt-2" />
        </header>

        {loading ? (
          <GridSkeleton count={15} />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {items.map((movie, idx) => (
                <MovieCard key={`${movie.id}-${idx}`} movie={movie} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-16 flex justify-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-white px-10 py-3 rounded-full font-bold hover:bg-neutral-800 transition-all disabled:opacity-50"
                >
                  {loadingMore ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  Load More Content
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
