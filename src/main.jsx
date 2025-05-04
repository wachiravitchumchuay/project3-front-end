import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context/AppContext'; // ✅ import the provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider> {/* ✅ wrap App here */}
      <App />
    </AppProvider>
  </StrictMode>
);