// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Impor Layout baru
import MainLayout from './layout/MainLayout'; // <--- Path yang benar

// Impor Halaman baru
import Home from './pages/Home'; // <--- Path yang benar
import Project from './pages/Project'; // <--- Path yang benar

// Placeholder
const Experience = () => <h1 style={{ padding: '100px' }}>Experience Page</h1>;
const Contact = () => <h1 style={{ padding: '100px' }}>Contact Page</h1>;

const router = createBrowserRouter([
  {
    element: <MainLayout />, // <--- Gunakan MainLayout, BUKAN App
    children: [
      { index: true, element: <Home /> },
      { path: 'project', element: <Project /> },
      { path: 'experience', element: <Experience /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);