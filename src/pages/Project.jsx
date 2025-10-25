// src/pages/Project.jsx
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack/ScrollStack';
import './Project.css'; // CSS khusus untuk Halaman Project

// Data dummy Anda
const projects = [
  { id: 1, title: 'Project Alpha', color: '#f0f4f8' },
  { id: 2, title: 'Project Beta', color: '#e2e8f0' },
  { id: 3, title: 'Project Gamma', color: '#cbd5e1' },
  { id: 4, title: 'Project Delta', color: '#94a3b8' },
];

export default function Project() {
  return (
    // Wrapper ini akan menjadi container scroll
    <div className="project-page-container">
      
      {/* ScrollStack sekarang akan mengisi parent-nya (yang punya height pasti) */}
      <ScrollStack>
        {projects.map((project) => (
          <ScrollStackItem 
            key={project.id} 
            className="project-card"
            style={{ backgroundColor: project.color }}
          >
            <h2>{project.title}</h2>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}