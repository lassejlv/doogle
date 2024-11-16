import { atom } from 'jotai';

export const searchEngines = ['google', 'duckduckgo', 'bing', 'brave', 'yahoo', 'wikipedia', 'privacywall'];

interface Settings {
  searchEngine: string;
}

export const settingsStore = atom<Settings>({ searchEngine: 'google' });
