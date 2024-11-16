import React from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { showSettingsModal } from '@/stores/settings';

export default function SettingModal() {
  const [settingsOpen, setSettingsOpen] = useAtom(showSettingsModal);

  return (
    <motion.div
      className={`'fixed top-0 left-0 right-0 bottom-0 bg-zinc-950 bg-opacity-50 backdrop-blur-sm flex items-center justify-center' ${
        settingsOpen ? 'block' : 'hidden'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSettingsOpen(false)}
    >
      <div className='w-full max-w-md space-y-4'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-zinc-300'>Doogle</h1>
        </div>
        <></>

        <button onClick={() => setSettingsOpen(false)}>Close</button>
      </div>
    </motion.div>
  );
}
