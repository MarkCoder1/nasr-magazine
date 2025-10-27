"use client";

import React, { useState } from 'react';
import { Book, Chapter } from '@/types/book';
import { Menu, X, ChevronLeft, ChevronRight, Sun, Moon, Type, Home } from 'lucide-react';
import IconByName from '@/lib/iconMap';

type Props = {
  bookData: Book;
  currentChapter: Chapter | null;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (s: 'small' | 'medium' | 'large') => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  setCurrentChapter: (c: Chapter | null) => void;
  setCurrentPage: (p: 'cover' | 'index' | 'chapter') => void;
  scrollProgress: number;
};

const ChapterPage: React.FC<Props> = ({ bookData, currentChapter, theme, setTheme, fontSize, setFontSize, menuOpen, setMenuOpen, setCurrentChapter, setCurrentPage, scrollProgress }) => {
  if (!currentChapter) return null;

  const currentIndex = bookData.chapters.findIndex(ch => ch.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? bookData.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < bookData.chapters.length - 1 ? bookData.chapters[currentIndex + 1] : null;

  const fontSizes = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl'
  } as const;

  const [highlightedVerses, setHighlightedVerses] = useState<number[]>([]);

  function toggleVerse(verseNum: number) {
    setHighlightedVerses(prev => prev.includes(verseNum) ? prev.filter(v => v !== verseNum) : [...prev, verseNum]);
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100'} transition-colors duration-500`}>
      <div className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-md shadow-md`}>
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`${theme === 'dark' ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-800'} transition-colors`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <h2 className={`text-lg font-serif ${theme === 'dark' ? 'text-amber-200' : 'text-amber-900'} truncate mx-4`}>
            {currentChapter.title}
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`${theme === 'dark' ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-800'} transition-colors`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button
              onClick={() => {
                const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
                const currentIndex = sizes.indexOf(fontSize);
                const nextIndex = (currentIndex + 1) % sizes.length;
                setFontSize(sizes[nextIndex]);
              }}
              className={`${theme === 'dark' ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-800'} transition-colors`}
            >
              <Type size={20} />
            </button>
          </div>
        </div>
        
        <div className="h-1 bg-amber-200">
          <div 
            className="h-full bg-amber-600 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {menuOpen && (
        <div className={`fixed top-0 left-0 bottom-0 w-80 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-2xl z-40 p-6 overflow-y-auto animate-slideInLeft`}>
          <h3 className={`text-2xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-amber-200' : 'text-amber-900'}`}>
            Chapters
          </h3>
          <div className="space-y-2">
            {bookData.chapters.map(chapter => (
              <button
                key={chapter.id}
                onClick={() => {
                  setCurrentChapter(chapter);
                  setMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  chapter.id === currentChapter.id
                    ? theme === 'dark' ? 'bg-amber-900/40 text-amber-200' : 'bg-amber-100 text-amber-900'
                    : theme === 'dark' ? 'hover:bg-slate-700 text-amber-300' : 'hover:bg-amber-50 text-amber-800'
                }`}
              >
                <span className="text-xl mr-2"><IconByName name={chapter.icon} size={20} className="inline mr-2 align-middle" /></span>
                {chapter.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeIn">
            <div className="text-amber-600 text-4xl mb-4"><IconByName name={currentChapter.icon} size={56} className="text-amber-600" /></div>
            <h1 className={`text-4xl md:text-5xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-amber-200' : 'text-amber-900'}`}>
              Chapter {currentChapter.id}: {currentChapter.title}
            </h1>
            <div className="w-24 h-px bg-amber-600 mx-auto" />
          </div>
          <div className={`${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/60'} backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 border ${theme === 'dark' ? 'border-amber-700/30' : 'border-amber-200'}`}>
            {/* Flowing paragraphs across responsive columns to emulate a book */}
            <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: '1.5rem' }}>
              {currentChapter.content.map((verse, index) => (
                <p
                  key={verse.verse}
                  onClick={() => toggleVerse(verse.verse)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleVerse(verse.verse); } }}
                  role="button"
                  tabIndex={0}
                  className={`${fontSizes[fontSize]} leading-relaxed ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'} mb-4 animate-fadeIn avoid-column-break cursor-pointer transition-colors duration-150 ${highlightedVerses.includes(verse.verse) ? (theme === 'dark' ? 'bg-amber-900/30 ring-1 ring-amber-700/40 rounded-md p-2' : 'bg-amber-100/60 ring-1 ring-amber-300 rounded-md p-2') : ''}`}
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <sup className="text-amber-600 font-semibold mr-2">{verse.verse}</sup>
                  {index === 0 ? (
                    <>
                      <span className="float-left text-6xl font-serif leading-none mr-3 mt-1 text-amber-600">{verse.text.charAt(0)}</span>
                      {verse.text.slice(1)}
                    </>
                  ) : (
                    verse.text
                  )}
                </p>
              ))}
            </div>

            {/* Optional source / attribution shown inside the same content block */}
            {currentChapter.source && (
              <div className="mt-6">
                <p className={`text-sm italic ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}`}>
                  {currentChapter.source}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center my-12">
            <div className="flex-1 h-px bg-amber-300" />
            <div className="text-2xl text-amber-600 mx-4">✤</div>
            <div className="flex-1 h-px bg-amber-300" />
          </div>

          <div className="flex justify-between items-center gap-4">
            {prevChapter ? (
              <button
                onClick={() => {
                  setCurrentChapter(prevChapter);
                  window.scrollTo(0, 0);
                }}
                className={`flex items-center gap-2 px-6 py-3 border-2 ${theme === 'dark' ? 'border-amber-600 text-amber-200 hover:bg-amber-600' : 'border-amber-600 text-amber-900 hover:bg-amber-600'} rounded-lg transition-colors hover:text-white group`}
              >
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Previous: {prevChapter.title}</span>
                <span className="sm:hidden">Previous</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('index')}
                className={`flex items-center gap-2 px-6 py-3 border-2 ${theme === 'dark' ? 'border-amber-600 text-amber-200 hover:bg-amber-600' : 'border-amber-600 text-amber-900 hover:bg-amber-600'} rounded-lg transition-colors hover:text-white`}
              >
                <Home size={20} />
                <span className="hidden sm:inline">Back to Index</span>
                <span className="sm:hidden">Index</span>
              </button>
            )}

            {nextChapter ? (
              <button
                onClick={() => {
                  setCurrentChapter(nextChapter);
                  window.scrollTo(0, 0);
                }}
                className={`flex items-center gap-2 px-6 py-3 border-2 ${theme === 'dark' ? 'border-amber-600 text-amber-200 hover:bg-amber-600' : 'border-amber-600 text-amber-900 hover:bg-amber-600'} rounded-lg transition-colors hover:text-white group`}
              >
                <span className="hidden sm:inline">Next: {nextChapter.title}</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('index')}
                className={`flex items-center gap-2 px-6 py-3 border-2 ${theme === 'dark' ? 'border-amber-600 text-amber-200 hover:bg-amber-600' : 'border-amber-600 text-amber-900 hover:bg-amber-600'} rounded-lg transition-colors hover:text-white`}
              >
                <span className="hidden sm:inline">Back to Index</span>
                <span className="sm:hidden">Index</span>
                <Home size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
