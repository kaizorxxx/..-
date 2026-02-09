
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/api';
import { Movie } from '../types';
import { MovieCard } from '../components/MovieCard';
import { GridSkeleton } from '../components/Skeleton';
import { Search as SearchIcon } from 'lucide-react';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query) return;
      setLoading(true);
      const data = await searchMovies(query);
      setResults(data.items);
      setLoading(false);
    };

    const debounceTimer = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="pt-24 pb-20 px-4 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex items-center gap-4">
          <SearchIcon className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            Results for: <span className="text-red-500">"{query}"</span>
          </h1>
        </header>

        {loading ? (
          <GridSkeleton count={10} />
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="h-[50vh] flex flex-col items-center justify-center text-neutral-500 space-y-4">
            <SearchIcon className="w-16 h-16 opacity-10" />
            <p className="text-xl">No movies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
