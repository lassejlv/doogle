import React from 'react';
import SearchField from './components/SearchField';

export default function App() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-4'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-zinc-300'>Doogle</h1>
        </div>
        <SearchField />
      </div>
    </main>
  );
}
