import { atom } from "jotai";

export interface Bookmark {
  label: string;
  url: string;
  blank: boolean;
  icon: string;
}

export const bookmarksStore = atom<Bookmark[]>()
