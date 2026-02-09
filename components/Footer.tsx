
import React from 'react';
import { Github, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141414] border-t border-neutral-800 py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="space-y-4">
          <h2 className="text-red-600 font-black text-2xl tracking-tighter">ZELSTREAM</h2>
          <p className="text-neutral-500 text-sm max-w-xs">
            The world's most advanced community-driven streaming platform for high-quality movies, series, and anime.
          </p>
          <div className="flex gap-4 text-neutral-400">
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-white" />
            <Github className="w-5 h-5 cursor-pointer hover:text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Explore</h4>
            <ul className="text-neutral-500 text-sm space-y-2">
              <li className="hover:text-red-500 cursor-pointer">Movies</li>
              <li className="hover:text-red-500 cursor-pointer">TV Shows</li>
              <li className="hover:text-red-500 cursor-pointer">Anime</li>
              <li className="hover:text-red-500 cursor-pointer">Trending</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Legal</h4>
            <ul className="text-neutral-500 text-sm space-y-2">
              <li className="hover:text-red-500 cursor-pointer">Terms</li>
              <li className="hover:text-red-500 cursor-pointer">Privacy</li>
              <li className="hover:text-red-500 cursor-pointer">Cookies</li>
              <li className="hover:text-red-500 cursor-pointer">DMCA</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-neutral-600 text-xs">
        &copy; {new Date().getFullYear()} ZELSTREAM Inc. All rights reserved. Data provided by public API sources.
      </div>
    </footer>
  );
};
