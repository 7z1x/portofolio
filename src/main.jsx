import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import MainLayout from './layout/MainLayout';
import AppFallback from './components/AppFallback/AppFallback';

const About = lazy(() => import('./pages/About'));
const AllProjects = lazy(() => import('./pages/AllProjects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

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
    <Suspense fallback={<AppFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
