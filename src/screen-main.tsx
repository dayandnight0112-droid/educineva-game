import React from 'react';
import ReactDOM from 'react-dom/client';
import { TeacherScreenApp } from './screen/TeacherScreenApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TeacherScreenApp />
  </React.StrictMode>
);
