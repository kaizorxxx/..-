
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play } from 'lucide-react';
import { fetchMovies } from '../services/api';
import { Movie, Category } from '../types';
import { Hero } from '../components/Hero';
import { MovieCard } from '../components/MovieCard';
import { GridSkeleton, HeroSkeleton } from '../components/Skeleton';

const MovieRow: React.FC<{ title: string; category: string; items: Movie[] }> = ({ title, category, items }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <section className="py-6 px-4 md:px-12 group/row">
      <div className="flex items-end justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover/row:text-red-500 transition-colors">
            {title}
          </h2>
          <span className="h-1 w-8 bg-red-600 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity" />
        </div>
        <Link to={`/category/${category}`} className="text-neutral-400 text-xs md:text-sm font-bold flex items-center hover:text-white transition-colors uppercase tracking-widest">
          Browse All <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {items.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export const Home: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: Movie[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [trending, idMovies, idDrama, kdrama, shortTv, anime] = await Promise.all([
          fetchMovies(Category.TRENDING),
          fetchMovies(Category.INDONESIAN_MOVIES),
          fetchMovies(Category.INDONESIAN_DRAMA),
          fetchMovies(Category.KDRAMA),
          fetchMovies(Category.SHORT_TV),
          fetchMovies(Category.ANIME)
        ]);

        setData({
          [Category.TRENDING]: trending.items,
          [Category.INDONESIAN_MOVIES]: idMovies.items,
          [Category.INDONESIAN_DRAMA]: idDrama.items,
          [Category.KDRAMA]: kdrama.items,
          [Category.SHORT_TV]: shortTv.items,
          [Category.ANIME]: anime.items
        });
      } catch (error) {
        console.error("Error loading home content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  // Pick a random trending movie for the hero
  const heroMovie = useMemo(() => {
    const trending = data[Category.TRENDING];
    if (!trending || trending.length === 0) return null;
    return trending[Math.floor(Math.random() * Math.min(trending.length, 5))];
  }, [data]);

  if (loading) {
    return (
      <div className="space-y-8 pb-12">
        <HeroSkeleton />
        <div className="px-4 md:px-12 space-y-12">
           <GridSkeleton count={6} />
           <GridSkeleton count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12 animate-in fade-in duration-1000">
      {heroMovie && <Hero movie={heroMovie} />}
      
      <div className="relative z-10 -mt-12 md:-mt-24 space-y-8 md:space-y-12 bg-gradient-to-t from-[#141414] via-[#141414]/95 to-transparent pt-12">
        <MovieRow 
          title="Top Trending" 
          category={Category.TRENDING} 
          items={data[Category.TRENDING]} 
        />
        
        <MovieRow 
          title="Most Popular K-Dramas" 
          category={Category.KDRAMA} 
          items={data[Category.KDRAMA]} 
        />

        <div className="bg-neutral-900/30 py-4">
          <MovieRow 
            title="Indonesian Cinema" 
            category={Category.INDONESIAN_MOVIES} 
            items={data[Category.INDONESIAN_MOVIES]} 
          />
        </div>

        <MovieRow 
          title="New Drama Indonesia" 
          category={Category.INDONESIAN_DRAMA} 
          items={data[Category.INDONESIAN_DRAMA]} 
        />

        <MovieRow 
          title="Viral Short TV" 
          category={Category.SHORT_TV} 
          items={data[Category.SHORT_TV]} 
        />

        <div className="bg-gradient-to-b from-transparent to-black/40">
          <MovieRow 
            title="Top Rated Anime" 
            category={Category.ANIME} 
            items={data[Category.ANIME]} 
          />
        </div>
      </div>
    </div>
  );
};
