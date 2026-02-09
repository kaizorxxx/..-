
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Trophy } from 'lucide-react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
}

export const Hero: React.FC<HeroProps> = ({ movie }) => {
  return (
    <div className="relative w-full h-[80vh] md:h-[95vh] overflow-hidden">
      {/* Background Poster */}
      <img 
        src={movie.poster} 
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 blur-[1px] md:blur-0"
      />
      
      {/* Multilayered Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
      <div className="absolute inset-0 netflix-gradient" />

      {/* Content */}
      <div className="absolute bottom-24 md:bottom-48 left-4 md:left-12 max-w-3xl space-y-4 md:space-y-6 z-10">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <div className="flex items-center gap-1.5 bg-red-600 text-[10px] md:text-xs font-black px-2 py-1 rounded shadow-lg uppercase tracking-wider">
            <Trophy className="w-3 h-3" />
            Top Trending
          </div>
          <span className="text-white text-xs md:text-sm font-bold bg-white/10 backdrop-blur-md px-2 py-1 rounded border border-white/10">
            {movie.year}
          </span>
          <span className="text-neutral-300 text-xs md:text-sm font-semibold uppercase tracking-widest">
            {movie.type === 'movie' ? 'Feature Film' : 'Original Series'}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-[0.9]">
          {movie.title}
        </h1>
        
        <p className="text-base md:text-xl text-neutral-200 line-clamp-3 font-medium drop-shadow-md max-w-xl leading-relaxed">
          Now streaming exclusively on ZelStream. Join millions of fans worldwide and dive into this award-winning {movie.type}. {movie.genre ? `Exploring themes of ${movie.genre}.` : ''}
        </p>

        <div className="flex items-center gap-4 pt-2">
          <Link 
            to={`/detail/${encodeURIComponent(movie.detailPath)}`}
            className="flex items-center gap-3 bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-md font-black hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
          >
            <Play className="w-6 h-6 fill-black" />
            Watch Now
          </Link>
          <Link 
            to={`/detail/${encodeURIComponent(movie.detailPath)}`}
            className="flex items-center gap-3 bg-neutral-500/30 backdrop-blur-xl text-white px-8 py-3 md:px-10 md:py-4 rounded-md font-bold hover:bg-neutral-500/50 transition-all border border-white/20 hover:scale-105 active:scale-95"
          >
            <Info className="w-6 h-6" />
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
