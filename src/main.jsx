// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import MainLayout from './layout/MainLayout'; 
import Home from './pages/Home'; 
import Project from './pages/Project'; 

// Placeholder
const Experience = () => <h1 style={{ padding: '100px' }}>Experience Page</h1>;
import About from './pages/About';

const router = createBrowserRouter([
  {
    element: <MainLayout />, 
    children: [
      { index: true, element: <Home /> },
      { path: 'project', element: <Project /> },
      { path: 'experience', element: <Experience /> },
      { path: 'about', element: <About /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);