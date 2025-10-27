"use client";

import React from 'react';
import Particles from './Particles';
import { BookOpen } from 'lucide-react';
import { Book } from '@/types/book';

type Props = {
  bookData: Book;
  theme: 'light' | 'dark';
  onEnter: () => void;
};

const CoverPage: React.FC<Props> = ({ bookData, theme, onEnter }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center p-8 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100'} transition-colors duration-500 relative overflow-hidden`}>
      <Particles />

      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-96 h-96 rounded-full border-8 border-amber-800 animate-spin-slow" />
        <div className="absolute w-80 h-80 rounded-full border-8 border-amber-700" />
        <div className="absolute w-64 h-64 rounded-full border-8 border-amber-600" />
      </div>

      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-amber-600/40" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-amber-600/40" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-amber-600/40" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-amber-600/40" />

      <div className="text-center z-10 max-w-2xl animate-fadeIn">
        <div className="text-amber-700 text-4xl mb-6">❦</div>

        <h1 className={`sm:text-6xl text-5xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-amber-200' : 'text-amber-900'} tracking-wide`}>
          {bookData.title}
        </h1>

        <div className="w-32 h-px bg-amber-600 mx-auto mb-4" />

        <p className={`text-xl italic mb-8 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-800'}`}>
          {bookData.subtitle}
        </p>

        <div className={`${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm p-8 rounded-lg shadow-lg mb-8 border ${theme === 'dark' ? 'border-amber-700/30' : 'border-amber-200'}`}>
          <p className={`text-lg italic leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-amber-900'}`}>
            "{bookData.coverQuote}"
          </p>
          <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
            {bookData.attribution}
          </p>
        </div>

        <button
          onClick={onEnter}
          className={`group relative px-8 py-4 text-lg font-medium ${theme === 'dark' ? 'text-amber-200 border-amber-600 hover:bg-amber-600' : 'text-amber-900 border-amber-600 hover:bg-amber-600'} border-2 rounded-lg transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-amber-600/50 overflow-hidden`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <BookOpen size={20} />
            Enter the Book
          </span>
          <div className="absolute inset-0 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </button>

        <div className="text-amber-700 text-4xl mt-8">✤</div>
      </div>
    </div>
  );
};

export default CoverPage;
