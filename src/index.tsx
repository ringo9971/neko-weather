import React from 'react';
import ReactDom from 'react-dom/client';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

Modal.setAppElement('#root');
const root = ReactDom.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
