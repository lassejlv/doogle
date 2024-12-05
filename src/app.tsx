import React, { useEffect, useState } from 'react';
import SearchField from './components/SearchField';
import { useAtom } from 'jotai';
import { Bookmark, bookmarksStore, generateId } from './stores/bookmark';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { useToast } from './hooks/use-toast';



export const clickEscButton = () => {
  const escEvent = new KeyboardEvent('keydown', {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    bubbles: true,
  });

  document.dispatchEvent(escEvent);
};

// @ts-ignore: No types for this package
import { IconPickerItem } from 'react-icons-picker';

export default function App() {
  const [bookmarks, setBookmarks] = useAtom(bookmarksStore);

  useEffect(() => {
    const hasBookmark = localStorage.getItem('bookmarks');
    if (!hasBookmark) {
      localStorage.setItem('bookmarks', JSON.stringify([]));
    } else {
      // @ts-ignore
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) as Bookmark[];
      setBookmarks(bookmarks);
    }
  }, [window]);


  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-4'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-zinc-300'>Doogle</h1>
        </div>
        <SearchField />

        <div className='grid grid-cols-5 gap-y-3'>
          {bookmarks &&
            bookmarks.map((bm, index) => (
              <a key={index} href={bm.url} target={`${bm.blank ? '_blank' : ''}`}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant='outline'>
                        <IconPickerItem value={bm.icon} size={40} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{bm.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </a>
            ))}
        </div>
      </div>
    </main>
  );
}
