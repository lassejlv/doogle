import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import SettingFooterIcon from './components/SettingFooterIcon';
import { Toaster } from './components/ui/toaster';
import './global.css';

const rootElement = document.getElementById('app');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
      <Toaster />
      <SettingFooterIcon />
    </React.StrictMode>
  );
}
