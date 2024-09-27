/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './assets/styles/_reset.css';
import './assets/styles/fonts.css';
import './assets/styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
