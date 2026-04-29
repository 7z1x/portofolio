import { useState, useEffect, useCallback, useTransition } from 'react';
import { fetchRepos, mapRepoToProject } from '../services/github';
import { PROJECT_OVERRIDES } from '../data/projects';

const EXCLUDED_REPOS = ['7z1x'];

export default function useGitHubRepos() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const load = useCallback(async () => {
    try {
      const repos = await fetchRepos();

      const mapped = repos
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

      startTransition(() => {
        setProjects(mapped);
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
