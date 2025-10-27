export interface Verse {
  verse: number;
  text: string;
}

export interface Chapter {
  id: number;
  title: string;
  icon: string;
  readTime: number;
  content: Verse[];
  /** Optional source or attribution text shown under the chapter content */
  source?: string;
}

export interface Book {
  title: string;
  subtitle: string;
  coverQuote: string;
  attribution: string;
  chapters: Chapter[];
}
