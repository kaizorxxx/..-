
export interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number | string;
  year: string;
  type: 'movie' | 'tv';
  genre: string;
  detailPath: string;
}

export interface ApiResponse {
  success: boolean;
  items: Movie[];
  page: number;
  hasMore: boolean;
}

export interface Episode {
  id: string;
  title: string;
  path: string;
}

export interface Season {
  seasonTitle: string;
  episodes: Episode[];
}

export interface MovieDetail extends Movie {
  description: string;
  playerUrl: string;
  seasons?: Season[];
  cast?: string[];
}

export enum Category {
  TRENDING = 'trending',
  INDONESIAN_MOVIES = 'indonesian-movies',
  INDONESIAN_DRAMA = 'indonesian-drama',
  KDRAMA = 'kdrama',
  SHORT_TV = 'short-tv',
  ANIME = 'anime'
}
