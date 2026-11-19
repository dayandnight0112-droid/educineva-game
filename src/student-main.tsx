import React from 'react';
import ReactDOM from 'react-dom/client';
import { StudentApp } from './student/StudentApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StudentApp />
  </React.StrictMode>
);
