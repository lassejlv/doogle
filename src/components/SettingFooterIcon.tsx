import { Settings2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { useAtom } from 'jotai';
import { searchEngines, settingsStore } from '@/stores/settings';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';

export default function SettingFooterIcon() {
  const [settings, setSettings] = useAtom(settingsStore);
  const { toast } = useToast();


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
                <SelectValue placeholder="Select a search engine" />
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
        </DialogContent>
      </Dialog>
    </footer >
  );
}
