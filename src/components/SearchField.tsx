import { searchEngines, settingsStore } from '@/stores/settings';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';

export default function SearchField() {
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useAtom(settingsStore);

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
    e.preventDefault()

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

  return (
    <form className='mt-10 flex flex-col items-center justify-center gap-x-6' onSubmit={submit}>
      <Input type='text' placeholder={`Search on ${settings.searchEngine}... 🔍`} name='search' />

      {error && <p className='error'>{error}</p>}
    </form>
  );
}
