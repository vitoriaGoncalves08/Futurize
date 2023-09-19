import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'; // Importe createRoot do local correto
import './index.css';
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/auth';

const root = document.getElementById('root');

// Use createRoot para renderizar seu aplicativo
const rootInstance = createRoot(root);
rootInstance.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
);
