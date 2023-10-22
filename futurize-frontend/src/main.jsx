import React from 'react';
import { render } from 'react-dom';
import './index.css';
import AppRoutes from './routes/AppRoutes.jsx';

const root = document.getElementById('root');

// Use render to render your application
render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
  root
);
