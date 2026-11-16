import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SolutionPage from './SolutionPage';
import './index.css';

const onSolutionPage = window.location.pathname.startsWith('/solutions/');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {onSolutionPage ? <SolutionPage /> : <App />}
  </React.StrictMode>,
);
