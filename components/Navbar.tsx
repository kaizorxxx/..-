
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Play } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Trending', path: '/category/trending' },
    { label: 'Movies', path: '/category/indonesian-movies' },
    { label: 'Dramas', path: '/category/kdrama' },
    { label: 'Anime', path: '/category/anime' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#141414] shadow-xl' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1 group">
            <span className="text-red-600 font-black text-2xl md:text-3xl tracking-tighter group-hover:scale-105 transition-transform">ZELSTREAM</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link 
                key={item.label}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-red-500 ${location.pathname === item.path ? 'text-red-500 font-bold' : 'text-neutral-300'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative group">
            <input 
              type="text"
              placeholder="Titles, people, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-neutral-800/50 border border-neutral-700 text-white pl-10 pr-4 py-1.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-neutral-800 transition-all w-40 md:w-64"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </form>

          <button 
            className="lg:hidden p-2 text-white hover:bg-neutral-800 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[#141414] border-b border-neutral-800 py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {menuItems.map((item) => (
            <Link 
              key={item.label}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium text-neutral-300 hover:text-red-500"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
