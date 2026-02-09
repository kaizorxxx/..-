
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, PlayCircle } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link 
      to={`/detail/${encodeURIComponent(movie.detailPath)}`}
      className="group relative flex flex-col space-y-2 transition-all duration-300 hover:scale-105"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircle className="text-white w-12 h-12" />
        </div>
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-yellow-500 flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-500" />
          {movie.rating}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/40 to-transparent">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
            {movie.type === 'movie' ? 'Movie' : 'Series'} • {movie.year}
          </span>
        </div>
      </div>
      <h3 className="text-sm font-semibold text-neutral-100 line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">
        {movie.title}
      </h3>
    </Link>
  );
};
