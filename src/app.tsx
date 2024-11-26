import React, { useEffect, useState } from 'react';
import SearchField from './components/SearchField';
import { useAtom } from 'jotai';
import { Bookmark, bookmarksStore, generateId } from './stores/bookmark';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Switch } from './components/ui/switch';
import { useToast } from './hooks/use-toast';

// @ts-ignore: No types for this package
import IconPicker, { IconPickerItem } from 'react-icons-picker'
import { Label } from './components/ui/label';

export default function App() {
  const [bookmarks, setBookmarks] = useAtom(bookmarksStore)
  const [icon, setIcon] = useState('');
  const { toast } = useToast();

  const clickEscButton = () => {
    const escEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      bubbles: true,
    })

    document.dispatchEvent(escEvent)
  }

  useEffect(() => {


    const hasBookmark = localStorage.getItem('bookmarks')
    if (!hasBookmark) {
      localStorage.setItem('bookmarks', JSON.stringify([]))
    } else {
      // @ts-ignore
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) as Bookmark[]
      setBookmarks(bookmarks)
    }

  }, [window])


  const addBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const label = formData.get('label') as string
    const url = formData.get('url') as string
    const blank = formData.get('blank') as string

    console.table({ label, url, blank })

    if (!label || !url) {
      return;
    } else {

      const newBookmark = {
        id: generateId(),
        label,
        icon,
        url,
        blank: blank === 'on'
      }

      // @ts-ignore
      localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, newBookmark]))
      setBookmarks([...bookmarks, newBookmark])

      toast({
        title: "Success!",
        description: "Bookmark added successfully",
      })

      clickEscButton();

    }
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-4'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-zinc-300'>Doogle</h1>
        </div>
        <SearchField />

        <div className='flex gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus size={32} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Bookmark</DialogTitle>
                <DialogDescription>Fill out the details below to add a new bookmark</DialogDescription>
              </DialogHeader>

              <form className='flex flex-col gap-5' onSubmit={addBookmark}>
                <Input name="label" placeholder='Enter a title for your bookmark' />

                <div className="flex flex-col gap-5">
                  <Label htmlFor="icon">Icon</Label>
                  <IconPicker value={icon} onChange={(v: string) => setIcon(v)} />
                </div>

                <Input name="url" placeholder='Enter an url for your bookmark' />

                <div className='flex gap-3'>
                  <Switch name="blank" />
                  <span>Open in new tab</span>
                </div>

                <Button type="submit">
                  Add bookmark
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          {bookmarks && bookmarks.map((bm, index) => (
            <a key={index} href={bm.url} target={`${bm.blank ? "_blank" : "current"}`}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="outline">
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
