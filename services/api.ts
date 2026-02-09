
import { ApiResponse, MovieDetail, Category } from '../types';

const BASE_URL = 'https://zeldvorik.ru/apiv3';

export const fetchMovies = async (action: string, page: number = 1): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api.php?action=${action}&page=${page}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, items: [], page, hasMore: false };
  }
};

export const searchMovies = async (query: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api.php?action=search&q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Search error:', error);
    return { success: false, items: [], page: 1, hasMore: false };
  }
};

export const fetchMovieDetail = async (detailPath: string): Promise<MovieDetail | null> => {
  try {
    const response = await fetch(`${BASE_URL}/api.php?action=detail&detailPath=${encodeURIComponent(detailPath)}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.success ? data.item : null;
  } catch (error) {
    console.error('Detail fetch error:', error);
    return null;
  }
};
