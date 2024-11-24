import { atom } from "jotai";
import { v7 as uuid } from "uuid";

export const generateId = () => uuid();

export interface Bookmark {
  id: string;
  label: string;
  url: string;
  blank: boolean;
  icon: string;
}

export const bookmarksStore = atom<Bookmark[]>()
