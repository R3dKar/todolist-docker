import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import { App } from './app/app.tsx';
import './style.css';

const root = createRoot(document.getElementById('root')!);
root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);
