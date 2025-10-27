"use client";

import React, { useState, useEffect } from 'react';
import { Book, Chapter } from '@/types/book';
import bookData from '@/lib/bookData';
import CoverPage from './components/CoverPage';
import IndexPage from './components/IndexPage';
import ChapterPage from './components/ChapterPage';

const SacredBookWebsite: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'cover' | 'index' | 'chapter'>('cover');
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (currentPage === 'chapter') {
      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        setScrollProgress(progress);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage]);

  return (
    <>
      {currentPage === 'cover' && (
        <CoverPage
          bookData={bookData as Book}
          theme={theme}
          onEnter={() => setCurrentPage('index')}
        />
      )}

      {currentPage === 'index' && (
        <IndexPage
          bookData={bookData as Book}
          theme={theme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectChapter={(c: Chapter) => {
            setCurrentChapter(c);
            setCurrentPage('chapter');
            window.scrollTo(0, 0);
          }}
          onBackToCover={() => setCurrentPage('cover')}
        />
      )}

      {currentPage === 'chapter' && (
        <ChapterPage
          bookData={bookData as Book}
          currentChapter={currentChapter}
          theme={theme}
          setTheme={setTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          setCurrentChapter={setCurrentChapter}
          setCurrentPage={setCurrentPage}
          scrollProgress={scrollProgress}
        />
      )}
    </>
  );
};

export default SacredBookWebsite;