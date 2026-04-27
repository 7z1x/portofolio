import { useState, useEffect, useCallback, useTransition } from 'react';
import { fetchRepos, mapRepoToProject } from '../services/github';
import { PROJECT_OVERRIDES } from '../data/projects';

/**
 * Custom hook that fetches GitHub repos ASYNCHRONOUSLY in the background.
 *
 * Uses React's useTransition to mark the state update as non-urgent,
 * so the UI stays responsive while data loads.
 *
 * - Repos listed in PROJECT_OVERRIDES get enriched with custom data.
 * - Forked repos and profile repos are excluded.
 */

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
          if (a._hasOverride && !b._hasOverride) return -1;
          if (!a._hasOverride && b._hasOverride) return 1;
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

      // Use startTransition so React batches this update as low-priority
      // => the UI doesn't freeze/lag while processing 30+ projects
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
