import { FolderInput, FolderOutput, Settings2, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { useAtom } from 'jotai';
import { searchEngines, settingsStore } from '@/stores/settings';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';
import { bookmarksStore } from '@/stores/bookmark';
import { z } from "zod";
import { ScrollArea } from './ui/scroll-area';

const importDataSchema = z.object({
  settings: z.object({
    searchEngine: z.string()
  }),
  bookmarks: z.any()
})

export default function SettingFooterIcon() {
  const [settings, setSettings] = useAtom(settingsStore);
  const [bookmarks, setBookmars] = useAtom(bookmarksStore)
  const { toast } = useToast();



  const removeBookmark = (id: string) => {
    if (!bookmarks) return;
    const confirmed = confirm("Sure you wanna delete it ? ")
    if (!confirmed) return toast({ title: '✅ Cancelled', description: 'Bookmark deletion cancelled' });

    const updatedArray = bookmarks.filter((bookmark) => bookmark.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(updatedArray));
    setBookmars(updatedArray);
  }

  const exportData = () => {

    const data = {
      settings: settings,
      bookmarks: bookmarks
    }

    navigator.clipboard.writeText(JSON.stringify(data))
    toast({
      title: '✅ Data Copied',
      description: 'Data copied to clipboard, go to an other device/browser and click the import button to import the data.'
    })
  }

  const importData = (importedData: any) => {

    const { data, success } = importDataSchema.safeParse(importedData)
    if (!success) return toast({ title: '❌ Invalid Data', description: 'Data is invalid, please check the data and try again' });

    // First set the settings settings
    setSettings(data.settings);
    localStorage.setItem('searchEngine', data.settings.searchEngine);
    // @ts-ignore
    setBookmars(data.bookmarks || []);
    localStorage.setItem('bookmarks', JSON.stringify(data.bookmarks || []));


    toast({
      title: '✅ Data Imported',
      description: 'Data imported successfully'
    })
  }

  const deleteData = () => {
    const confirmed = confirm("Are you sure you wanna delete all data ?")
    if (!confirmed) return toast({ title: '✅ Cancelled', description: 'Data deletion cancelled' });

    localStorage.clear();
    setSettings({ searchEngine: 'google' });
    setBookmars([])

    toast({
      title: '✅ Data Deleted',
      description: 'All data has been deleted'
    })
  }

  return (
    <footer className='fixed bottom-0 left-0 right-0 flex items-center justify-end gap-x-6 p-4 '>
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost">
            <Settings2 />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              <p>Customize your experience</p>
            </DialogDescription>
          </DialogHeader>


          <div className='my-3'>
            <Label htmlFor='searchEngine'>Search Engine</Label>

            <Select onValueChange={(val) => {
              localStorage.setItem('searchEngine', val);
              setSettings({ ...settings, searchEngine: val });
              toast({
                title: "Saved!",
                description: `Updated search engine to: ${val}`
              })
            }}>
              <SelectTrigger>
                <SelectValue placeholder={`${settings.searchEngine ? settings.searchEngine : 'Select a search engine'}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={settings.searchEngine} disabled>
                  {settings.searchEngine}
                </SelectItem>
                <SelectGroup>
                  {searchEngines
                    .filter((engine) => engine !== settings.searchEngine)
                    .map((engine) => {
                      return (
                        <SelectItem value={engine}>
                          {engine}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='my-3'>
            <Label htmlFor='bookmarks'>Bookmarks</Label>

            <ScrollArea className="h-72 w-full">
              <ul className='flex flex-col gap-3'>
                {bookmarks?.map((bookmark) => {
                  return (
                    <li key={bookmark.id} className='flex items-center justify-between gap-x-2'>
                      <span>{bookmark.label}</span>
                      <Button variant='destructive' onClick={() => removeBookmark(bookmark.id)}><Trash /></Button>
                    </li>
                  )
                })}
              </ul>
            </ScrollArea>
          </div>

          <div className='my-3'>
            <Label htmlFor='exportImportData'>Import / Export Data</Label>

            <div className="flex gap-2 my-3">
              <Button size="sm" onClick={() => exportData()}>
                <FolderInput />  Export
              </Button>

              <Button size="sm" variant="secondary" onClick={() => {
                const data = prompt("Paste the data here")
                if (!data) return toast({ title: '❌ Invalid Data', description: 'Data is invalid, please check the data and try again' });

                const confirmed = confirm("Are you sure you wanna import this data ? This will overwrite your current data")
                if (!confirmed) return toast({ title: '✅ Cancelled', description: 'Data import cancelled' });

                importData(JSON.parse(data))
              }}>
                <FolderOutput />  Import
              </Button>

              <Button size="sm" variant="destructive" onClick={() => deleteData()}>
                <Trash />  Delete All Data
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer >
  );
}
