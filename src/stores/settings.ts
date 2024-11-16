import { atom } from 'jotai';

export const searchEngines = ['google', 'duckduckgo', 'bing', 'brave', 'yahoo', 'wikipedia'];

interface Settings {
  searchEngine: string;
}

export const settingsStore = atom<Settings>({ searchEngine: 'google' });
