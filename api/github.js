const GITHUB_API = 'https://api.github.com';

const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000;
const MAX_CACHE_SIZE = 100;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path, ...queryParams } = req.query;

  if (!path) {
    return res.status(400).json({ error: 'Missing "path" query parameter' });
  }

  if (path.includes('..') || !path.startsWith('/')) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  const allowedPrefixes = ['/repos/', '/users/'];
  if (!allowedPrefixes.some(prefix => path.startsWith(prefix))) {
    return res.status(403).json({ error: 'Forbidden: only /repos and /users endpoints are allowed' });
  }

  const query = new URLSearchParams(queryParams).toString();
  const githubUrl = `${GITHUB_API}${path}${query ? `?${query}` : ''}`;

  const cached = cache.get(githubUrl);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    res.setHeader('X-Cache', 'HIT');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(cached.data);
  }

  try {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'portofolio-vercel-proxy',
    };

    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(githubUrl, { headers });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `GitHub API error: ${response.status}`,
      });
    }

    const data = await response.json();

    cache.set(githubUrl, { data, timestamp: Date.now() });

    // Evict oldest entry if cache exceeds max size
    if (cache.size > MAX_CACHE_SIZE) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }

    res.setHeader('X-Cache', 'MISS');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    const remaining = response.headers.get('X-RateLimit-Remaining');
    const limit = response.headers.get('X-RateLimit-Limit');
    if (remaining) {
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Limit', limit);
    }

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
