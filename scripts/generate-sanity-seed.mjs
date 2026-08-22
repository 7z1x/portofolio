import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { PROJECT_DATA } from '../src/data/projects.js';
import { FALLBACK_EXPERIENCES } from '../src/data/experiences.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(currentDir, '../studio/seed');
const outputFile = path.join(outputDir, 'initial-content.ndjson');

function prettyName(value) {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function safeId(value) {
  return value.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-');
}

function keyedItems(items, type, mapItem) {
  return items.map((item, index) => ({
    _key: `${type}-${index + 1}`,
    _type: type,
    ...mapItem(item),
  }));
}

const projectDocuments = PROJECT_DATA.map((project, index) => ({
  _id: `project-${safeId(project.id)}`,
  _type: 'project',
  title: project.name || prettyName(project.id),
  slug: { _type: 'slug', current: project.id },
  repositoryName: project.id,
  ...(project.tagline ? { tagline: project.tagline } : {}),
  categories: project.category || ['Other'],
  ...(project.year ? { year: project.year } : {}),
  bgColor: project.bgColor || '#C5CAE9',
  ...(project.description ? { description: project.description } : {}),
  ...(project.overview ? { overview: project.overview } : {}),
  roles: project.roles || 'Developer',
  client: project.client || 'Personal Project',
  techStack: project.techStack || [],
  features: keyedItems(project.features || [], 'feature', (feature) => ({
    title: feature.title,
    description: feature.desc,
  })),
  designScreens: keyedItems(project.designScreens || [], 'designScreen', (screen) => ({
    label: screen.label,
    externalUrl: screen.src,
  })),
  githubUrl: project.github,
  featured: index < 4,
  order: (index + 1) * 10,
  isVisible: true,
}));

const experienceDocuments = FALLBACK_EXPERIENCES.map((experience, index) => ({
  _id: `experience-${safeId(experience.id)}`,
  _type: 'experience',
  role: experience.role,
  company: experience.company,
  icon: experience.icon,
  color: experience.color,
  date: experience.date,
  type: experience.type,
  duration: experience.duration,
  location: experience.location,
  bullets: experience.bullets,
  skills: experience.skills,
  order: (index + 1) * 10,
  isVisible: true,
}));

const settingsDocument = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  name: 'Zulfahmi M Ardianto',
  headline: 'AI Engineer, Creative Developer, and Curious Thinker.',
  githubUrl: 'https://github.com/7z1x',
  linkedinUrl: 'https://www.linkedin.com/in/zulfahmi-m-ardianto/',
  instagramUrl: 'https://instagram.com/llzf4_',
};

const documents = [...projectDocuments, ...experienceDocuments, settingsDocument];
const content = `${documents.map((document) => JSON.stringify(document)).join('\n')}\n`;

await mkdir(outputDir, { recursive: true });
await writeFile(outputFile, content, 'utf8');
console.log(`Generated ${documents.length} documents at ${outputFile}`);
