import { showSettingsModal } from '@/stores/settings';
import { useAtom } from 'jotai';
import { Settings2 } from 'lucide-react';
import { useEffect } from 'react';

export default function SettingFooterIcon() {
  const [settingsOpen, setSettingsOpen] = useAtom(showSettingsModal);

  useEffect(() => {
    console.log(settingsOpen);
  }, [settingsOpen]);

  return (
    <footer className='fixed bottom-0 left-0 right-0 flex items-center justify-end gap-x-6 p-4 '>
      <button onClick={() => setSettingsOpen(!settingsOpen)}>
        <Settings2 />
      </button>
    </footer>
  );
}
