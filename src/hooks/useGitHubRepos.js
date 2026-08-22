import { useState, useEffect, useCallback, useTransition } from 'react';
import { fetchRepos, mapRepoToProject } from '../services/github';
import { PROJECT_OVERRIDES } from '../data/projects';
import { fetchSanityProjects, isSanityConfigured } from '../services/sanity';

const EXCLUDED_REPOS = ['7z1x'];

export default function useGitHubRepos() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const load = useCallback(async () => {
    try {
      const [reposResult, cmsResult] = await Promise.allSettled([
        fetchRepos(),
        fetchSanityProjects(),
      ]);

      const repos = reposResult.status === 'fulfilled' ? reposResult.value : [];
      const githubProjects = repos
        .filter(r => !r.fork && !EXCLUDED_REPOS.includes(r.name))
        .map(repo => {
          const base = mapRepoToProject(repo);
          const override = PROJECT_OVERRIDES[repo.name];
          if (override) {
            return { ...base, ...override, _hasOverride: true };
          }
          return base;
        })
        .sort((a, b) => {
          return new Date(b.pushedAt) - new Date(a.pushedAt);
        });

      const cmsProjects = cmsResult.status === 'fulfilled' ? cmsResult.value : [];
      const githubByRepository = new Map(
        githubProjects.map((project) => [project.id, project])
      );

      const mapped = isSanityConfigured && cmsProjects.length > 0
        ? cmsProjects.map((cmsProject) => {
            const githubProject = githubByRepository.get(cmsProject.repositoryName);

            return {
              id: cmsProject.id,
              name: cmsProject.name || cmsProject.id,
              tagline: 'Portfolio project',
              category: ['Other'],
              year: new Date().getFullYear().toString(),
              bgColor: '#C5CAE9',
              coverImage: null,
              fallbackCoverImage: null,
              github: null,
              homepage: null,
              roles: 'Developer',
              client: 'Personal Project',
              description: '',
              overview: null,
              techStack: [],
              features: [],
              designScreens: [],
              stars: 0,
              forks: 0,
              language: null,
              pushedAt: null,
              defaultBranch: 'main',
              ...(githubProject || {}),
              ...cmsProject,
              _hasCmsContent: true,
            };
          })
        : githubProjects;

      if (mapped.length === 0 && reposResult.status === 'rejected') {
        throw reposResult.reason;
      }

      if (cmsResult.status === 'rejected') {
        console.warn('Sanity projects unavailable; using GitHub/local fallback.', cmsResult.reason);
      }

      startTransition(() => {
        setProjects(mapped);
        setError(null);
        setLoading(false);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { projects, loading: loading || isPending, error, refetch: load };
}
