
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Calendar, Clock, Film, List, Play, Volume2 } from 'lucide-react';
import { fetchMovieDetail } from '../services/api';
import { MovieDetail, Season, Episode } from '../types';
import { HeroSkeleton } from '../components/Skeleton';

export const Detail: React.FC = () => {
  const { path } = useParams<{ path: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePlayerUrl, setActivePlayerUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'episodes'>('info');

  useEffect(() => {
    const loadDetail = async () => {
      if (!path) return;
      setLoading(true);
      const data = await fetchMovieDetail(path);
      if (data) {
        setMovie(data);
        setActivePlayerUrl(data.playerUrl);
      }
      setLoading(false);
    };
    loadDetail();
    window.scrollTo(0, 0);
  }, [path]);

  if (loading) return <HeroSkeleton />;
  if (!movie) return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-neutral-400 space-y-4">
      <Film className="w-16 h-16 opacity-20" />
      <h2 className="text-xl font-bold">Content Not Found</h2>
      <p>We couldn't find the details for this title.</p>
    </div>
  );

  return (
    <div className="pb-20 animate-in fade-in duration-500">
      {/* Video Player Section */}
      <div className="w-full bg-black aspect-video lg:h-[75vh] relative shadow-2xl">
        <iframe 
          src={activePlayerUrl}
          className="w-full h-full border-0"
          allowFullScreen
          title={movie.title}
        />
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-8 md:mt-12 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/3 flex-shrink-0">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full rounded-xl shadow-2xl border border-neutral-800"
          />
        </div>

        <div className="flex-grow space-y-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-neutral-400">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500" />
                {movie.rating}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {movie.year}
              </div>
              <div className="flex items-center gap-1 uppercase">
                <Film className="w-4 h-4" />
                {movie.type}
              </div>
              {movie.genre && (
                <div className="px-2 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-neutral-300">
                  {movie.genre}
                </div>
              )}
            </div>
          </div>

          <div className="flex border-b border-neutral-800">
            <button 
              onClick={() => setActiveTab('info')}
              className={`pb-4 px-6 font-bold text-sm uppercase tracking-widest transition-colors ${activeTab === 'info' ? 'text-red-600 border-b-2 border-red-600' : 'text-neutral-500'}`}
            >
              Overview
            </button>
            {movie.seasons && movie.seasons.length > 0 && (
              <button 
                onClick={() => setActiveTab('episodes')}
                className={`pb-4 px-6 font-bold text-sm uppercase tracking-widest transition-colors ${activeTab === 'episodes' ? 'text-red-600 border-b-2 border-red-600' : 'text-neutral-500'}`}
              >
                Episodes
              </button>
            )}
          </div>

          {activeTab === 'info' ? (
            <div className="space-y-6 text-neutral-300 leading-relaxed">
              <p className="text-lg">
                {movie.description || "No description available for this title."}
              </p>
              
              {movie.cast && movie.cast.length > 0 && (
                <div className="pt-4">
                  <h4 className="text-white font-bold mb-2">Starring</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map(actor => (
                      <span key={actor} className="text-sm bg-neutral-900 px-3 py-1 rounded-full text-neutral-400">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {movie.seasons?.map((season: Season, sIdx: number) => (
                <div key={sIdx} className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <List className="w-5 h-5 text-red-600" />
                    {season.seasonTitle}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {season.episodes.map((ep: Episode) => (
                      <button 
                        key={ep.id}
                        onClick={() => {
                           // In a real scenario, we'd fetch the player URL for this specific episode
                           // For this demo, we use the main player URL or a simulated switch
                           console.log("Switching to episode:", ep.title);
                           window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center justify-between p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-600 group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Play className="w-4 h-4 text-neutral-500 group-hover:text-red-600 fill-neutral-500 group-hover:fill-red-600" />
                          <span className="text-sm font-medium">{ep.title}</span>
                        </div>
                        <Volume2 className="w-4 h-4 text-neutral-700" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
