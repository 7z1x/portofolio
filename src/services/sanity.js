import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || 'production';

export const isSanityConfigured = Boolean(projectId);

const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-08-01',
      useCdn: true,
      perspective: 'published',
    })
  : null;

const PROJECTS_QUERY = `
  *[_type == "project" && isVisible != false]
    | order(coalesce(order, 9999) asc, _createdAt desc) {
      "cmsId": _id,
      "id": coalesce(slug.current, repositoryName),
      repositoryName,
      "name": title,
      tagline,
      "category": categories,
      year,
      bgColor,
      "coverImage": coalesce(coverImage.asset->url, externalCoverUrl),
      description,
      overview,
      roles,
      client,
      techStack,
      features[]{title, "desc": description},
      designScreens[]{label, "src": coalesce(image.asset->url, externalUrl)},
      "github": githubUrl,
      homepage,
      featured,
      order
    }
`;

const EXPERIENCES_QUERY = `
  *[_type == "experience" && isVisible != false]
    | order(coalesce(order, 9999) asc, startDate desc) {
      "id": _id,
      icon,
      color,
      role,
      company,
      date,
      type,
      duration,
      location,
      bullets,
      skills
    }
`;

const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    name,
    headline,
    githubUrl,
    linkedinUrl,
    instagramUrl,
    "resumeUrl": resume.asset->url
  }
`;

function cleanProject(project) {
  return Object.fromEntries(
    Object.entries(project).filter(([, value]) => value !== null && value !== undefined)
  );
}

export async function fetchSanityProjects() {
  if (!client) return [];
  const projects = await client.fetch(PROJECTS_QUERY);
  return projects
    .filter((project) => project.id)
    .map(cleanProject);
}

export async function fetchSanityExperiences() {
  if (!client) return [];
  return client.fetch(EXPERIENCES_QUERY);
}

export async function fetchSanitySettings() {
  if (!client) return null;
  return client.fetch(SITE_SETTINGS_QUERY);
}
