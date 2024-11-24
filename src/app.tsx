import React, { useEffect } from 'react';
import SearchField from './components/SearchField';
import { useAtom } from 'jotai';
import { Bookmark, bookmarksStore } from './stores/bookmark';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';
import { useToast } from './hooks/use-toast';

export default function App() {
  const [bookmarks, setBookmarks] = useAtom(bookmarksStore)
  const { toast } = useToast();

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
    const iconUrl = formData.get('iconUrl') as string
    const url = formData.get('url') as string
    const blank = formData.get('blank') as string

    console.table({ label, iconUrl, url, blank })

    if (!label || !iconUrl || !url) {
      return toast({
        title: "Error!",
        description: "Please fill out all the fields",
        variant: "destructive"
      })
    } else {

      const newBookmark = {
        label,
        icon: iconUrl,
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

    }
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-4'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-zinc-300'>Doogle</h1>
        </div>
        <SearchField />

        <div className='grid grid-cols-10 gap-5 my-3'>
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
                <Input name="iconUrl" placeholder='Enter an icon url for your bookmark' />
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
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <img
                        src={bm.icon}
                        className='w-8 h-8'
                        loading='lazy'
                      />
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
