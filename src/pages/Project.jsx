import ScrollStack, { ScrollStackItem } from '../components/ScrollStack/ScrollStack';
import './Project.css'; 
import Galaxy from '../components/Galaxy/Galaxy'; 

export default function Project() {
  return (
    <div className="project-page-container">
      <Galaxy
        mouseRepulsion={false}
        mouseInteraction={false}
        density={1}
        glowIntensity={0.4}
        hueShift={240}
        className="project-galaxy-bg"
      />
      <ScrollStack 
      itemDistance={20}
      baseScale={0.95}
      stackPosition='90'>
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