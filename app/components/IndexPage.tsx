"use client";

import React from 'react';
import Particles from './Particles';
import { Search, ChevronRight, Home } from 'lucide-react';
import { Book, Chapter } from '@/types/book';

type Props = {
  bookData: Book;
  theme: 'light' | 'dark';
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectChapter: (c: Chapter) => void;
  onBackToCover: () => void;
};

const IndexPage: React.FC<Props> = ({ bookData, theme, searchQuery, setSearchQuery, onSelectChapter, onBackToCover }) => {
  const q = searchQuery.trim().toLowerCase();
  const filteredChapters = q
    ? bookData.chapters.filter(chapter =>
        chapter.title.toLowerCase().includes(q) ||
        chapter.content.some(verse => verse.text.toLowerCase().includes(q))
      )
    : bookData.chapters;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100'} transition-colors duration-500 p-8`}>
      <Particles />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <button
            onClick={onBackToCover}
            className={`mb-6 ${theme === 'dark' ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-800'} transition-colors flex items-center gap-2 mx-auto`}
          >
            <Home size={20} />
            Return to Cover
          </button>
          
          <div className="text-amber-700 text-3xl mb-4">◈</div>
          <h1 className={`text-5xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-amber-200' : 'text-amber-900'}`}>
            Table of Contents
          </h1>
          <p className={`text-lg italic ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}`}>
            Choose Your Path of Reading
          </p>
        </div>

        <div className="mb-8 relative">
          <div className={`flex items-center ${theme === 'dark' ? 'bg-slate-800/50 border-amber-700/30' : 'bg-white/50 border-amber-200'} backdrop-blur-sm border rounded-lg px-4 py-3 shadow-md`}>
            <Search className={`${theme === 'dark' ? 'text-amber-600' : 'text-amber-700'} mr-3`} size={20} />
            <input
              type="text"
              placeholder="Search chapters or verses..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className={`flex-1 bg-transparent outline-none ${theme === 'dark' ? 'text-amber-200 placeholder-amber-400/50' : 'text-amber-900 placeholder-amber-700/50'}`}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredChapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className={`group ${theme === 'dark' ? 'bg-slate-800/50 border-amber-700/30 hover:border-amber-600' : 'bg-white/70 border-amber-200 hover:border-amber-600'} backdrop-blur-sm border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fadeIn`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelectChapter(chapter)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl text-amber-600 group-hover:scale-110 transition-transform">
                  {chapter.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-serif font-semibold mb-2 ${theme === 'dark' ? 'text-amber-200' : 'text-amber-900'}`}>
                    Chapter {chapter.id}: {chapter.title}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
                    {chapter.content.length} verses • {chapter.readTime} min read
                  </p>
                </div>
                <ChevronRight className={`${theme === 'dark' ? 'text-amber-600' : 'text-amber-700'} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
