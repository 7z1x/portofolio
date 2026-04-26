// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import MainLayout from './layout/MainLayout';
import About from './pages/About';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <About /> },
      { path: 'project', element: <AllProjects /> },
      { path: 'project/:id', element: <ProjectDetail /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);