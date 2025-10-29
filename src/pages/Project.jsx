// src/pages/Project.jsx
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack/ScrollStack';
import './Project.css'; 
import { AnimatePresence, motion } from 'framer-motion';


const projects = [
  { id: 1, title: 'Project Alpha', color: '#f0f4f8' },
  { id: 2, title: 'Project Beta', color: '#e2e8f0' },
  { id: 3, title: 'Project Gamma', color: '#cbd5e1' },
  { id: 4, title: 'Project Delta', color: '#94a3b8' },
];

export default function Project() {
  return (
    <div className="project-page-container">
      <ScrollStack itemDistance={10}>
        <ScrollStackItem color="#8b5cf6" shadow>
          <h2>Project Alpha</h2>
        </ScrollStackItem>
        <ScrollStackItem color="#ec4899" shadow>
          <h2>Project Beta</h2>
        </ScrollStackItem>
        <ScrollStackItem color="#3b82f6" shadow>
          <h2>Project Gamma</h2>
        </ScrollStackItem>
        <ScrollStackItem color="#10b981" shadow>
          <h2>Project Delta</h2>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  );
}