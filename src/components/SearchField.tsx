import { settingsStore } from '@/stores/settings';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { bookmarksStore, generateId } from '@/stores/bookmark';
import { toast } from '@/hooks/use-toast';
// @ts-expect-error
import IconPicker from 'react-icons-picker';
import { clickEscButton } from '@/app';

export default function SearchField() {
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useAtom(settingsStore);
  const [icon, setIcon] = useState('');
  const [bookmarks, setBookmarks] = useAtom(bookmarksStore);

  useEffect(() => {
    let searchEngineToSet = localStorage.getItem('searchEngine') as string;

    if (!searchEngineToSet) {
      searchEngineToSet = 'google';
      localStorage.setItem('searchEngine', searchEngineToSet);
    } else {
      searchEngineToSet = searchEngineToSet;
    }

    setSettings({ searchEngine: searchEngineToSet });
  }, [window]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const searchTerm = formData.get('search') as string;
    if (!searchTerm) return setError('Please enter a search term');

    setError(null);

    let searchEngineUrl;

    switch (settings.searchEngine) {
      case 'google':
        searchEngineUrl = 'https://www.google.com/search?q=';
        break;
      case 'duckduckgo':
        searchEngineUrl = 'https://duckduckgo.com/?q=';
        break;
      case 'bing':
        searchEngineUrl = 'https://www.bing.com/search?q=';
        break;
      case 'brave':
        searchEngineUrl = 'https://search.brave.com/search?q=';
        break;
      case 'yahoo':
        searchEngineUrl = 'https://search.yahoo.com/search?p=';
        break;
      case 'wikipedia':
        searchEngineUrl = 'https://en.wikipedia.org/wiki/Special:Search?search=';
        break;
      case 'privacywall':
        searchEngineUrl = 'https://www.privacywall.org/search/secure?q=';
        break;
      default:
        searchEngineUrl = 'https://www.google.com/search?q=';
    }

    window.open(searchEngineUrl + searchTerm, '_blank');
    console.log(`opening ${searchTerm}`);
    return;
  };

  const addBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const label = formData.get('label') as string;
    const url = formData.get('url') as string;
    const blank = formData.get('blank') as string;

    console.table({ label, url, blank });

    if (!label || !url) {
      return;
    } else {
      const newBookmark = {
        id: generateId(),
        label,
        icon,
        url,
        blank: blank === 'on',
      };

      // @ts-ignore
      localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, newBookmark]));
      setBookmarks([...bookmarks, newBookmark]);

      toast({
        title: 'Success!',
        description: 'Bookmark added successfully',
      });

      clickEscButton();
    }
  };

  return (
    <form className='mt-10 flex  items-center justify-center gap-2' onSubmit={submit}>
      <Input type='text' placeholder={`Search on ${settings.searchEngine}... 🔍`} name='search' />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Plus size={32} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Bookmark</DialogTitle>
            <DialogDescription>Fill out the details below to add a new bookmark</DialogDescription>
          </DialogHeader>

          <form className='flex flex-col gap-5' onSubmit={addBookmark}>
            <Input name='label' placeholder='Enter a title for your bookmark' />

            <div className='flex flex-col gap-5'>
              <Label htmlFor='icon'>Icon</Label>
              <IconPicker value={icon} onChange={(v: string) => setIcon(v)} />
            </div>

            <Input name='url' placeholder='Enter an url for your bookmark' />

            <div className='flex gap-3'>
              <Switch name='blank' />
              <span>Open in new tab</span>
            </div>

            <Button type='submit'>Add bookmark</Button>
          </form>
        </DialogContent>
      </Dialog>

      {error && <p className='error'>{error}</p>}
    </form>
  );
}
