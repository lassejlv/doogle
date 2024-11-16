import { atom } from 'jotai';

export const searchEngines = ['google', 'duckduckgo', 'bing', 'brave'];

interface Settings {
  searchEngine: string;
}

export const settingsStore = atom<Settings>({ searchEngine: 'google' });
