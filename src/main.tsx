import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './global.css';
import SettingFooterIcon from './components/SettingFooterIcon';
import SettingModal from './components/SettingModal';

const rootElement = document.getElementById('app');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
      <SettingModal />
      <SettingFooterIcon />
    </React.StrictMode>
  );
}
