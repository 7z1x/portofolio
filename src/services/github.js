const GITHUB_USERNAME = '7z1x';
const GITHUB_API = 'https://api.github.com';
const IS_PROD = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

const cache = new Map();

function buildUrl(githubPath) {
  if (IS_PROD) {
    const url = new URL(githubPath, GITHUB_API);
    const params = new URLSearchParams(url.search);
    params.set('path', url.pathname);
    return `/api/github?${params.toString()}`;
  }
  return `${GITHUB_API}${githubPath}`;
}

async function fetchWithCache(githubPath, ttl = 5 * 60 * 1000) {
  const url = buildUrl(githubPath);

  if (cache.has(url)) {
    const { data, timestamp } = cache.get(url);
    if (Date.now() - timestamp < ttl) return data;
  }

  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const data = await res.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

export async function fetchRepos() {
  const repos = await fetchWithCache(
    `/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`
  );
  return repos;
}

export async function fetchRepo(repoName) {
  return fetchWithCache(`/repos/${GITHUB_USERNAME}/${repoName}`);
}

export async function fetchLanguages(repoName) {
  return fetchWithCache(`/repos/${GITHUB_USERNAME}/${repoName}/languages`);
}

export async function fetchReadme(repoName) {
  try {
    const data = await fetchWithCache(
      `/repos/${GITHUB_USERNAME}/${repoName}/readme`
    );
    const binString = atob(data.content);
    const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function mapRepoToProject(repo) {
  const colors = [
    '#C5CAE9', '#F5C6D0', '#B8F0D1', '#FFE0B2', '#D1C4E9',
    '#E8DCC8', '#B3E5FC', '#DCEDC8', '#F0F4C3', '#FFD6E0',
    '#C8E6C9', '#FFE082', '#B2EBF2', '#E1BEE7', '#FFCCBC',
  ];

  const hash = repo.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const bgColor = colors[hash % colors.length];

  const nameLower = (repo.name + ' ' + (repo.description || '')).toLowerCase();
  const lang = (repo.language || '').toLowerCase();
  const category = [];

  const aiKeywords = [
    'ai', 'artificial', 'rag',
    'chatbot', 'agent', 'langchain', 'openai', 'llm', 'gpt',
    'recommendation', 'marketplace-assistant',
  ];
  if (aiKeywords.some(k => nameLower.includes(k))) {
    category.push('AI Engineer');
  }

  const mobileKeywords = ['app', 'android', 'ios', 'mobile', 'compose', 'flutter'];
  if (['kotlin', 'dart', 'swift'].includes(lang) || mobileKeywords.some(k => nameLower.includes(k))) {
    category.push('Mobile Development');
  }

  const mlKeywords = [
    'model', 'machine', 'learning', 'tensorflow', 'eksperimen',
    'sml', 'notebook', 'belajar', 'klasifikasi', 'predictive',
    'cancer', 'cardiovascular', 'rekomendasi', 'recommendation',
    'sign_language', 'analisis', 'analyst', 'analytic', 'dashboard',
    'permasalahan', 'human-resources', 'institusi', 'pendidikan',
    'monitoring', 'logging', 'metabase', 'sentimen', 'sentiment',
  ];
  if (lang === 'jupyter notebook' || mlKeywords.some(k => nameLower.includes(k))) {
    category.push('Machine Learning');
  }

  const uniqueCategory = [...new Set(category)];

  if (uniqueCategory.length === 0) {
    if (['python'].includes(lang)) uniqueCategory.push('Machine Learning');
    else if (['kotlin', 'java', 'dart'].includes(lang)) uniqueCategory.push('Mobile Development');
    else uniqueCategory.push('Other');
  }

  const prettyName = repo.name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  const year = new Date(repo.pushed_at || repo.created_at).getFullYear().toString();

  return {
    id: repo.name,
    name: prettyName,
    tagline: repo.description || `${repo.language || 'Code'} project`,
    category: uniqueCategory,
    year,
    bgColor,
    coverImage: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    github: repo.html_url,
    homepage: (repo.homepage && !['dicoding.com', 'coursera.org', 'udemy.com', 'kaggle.com'].some(domain => repo.homepage.includes(domain))) ? repo.homepage : null,
    roles: 'Developer',
    client: 'Personal Project',
    description: repo.description || `A ${repo.language || ''} project hosted on GitHub.`,
    overview: null,
    techStack: repo.language ? [repo.language] : [],
    features: [],
    designScreens: [],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at || repo.created_at,
    fork: repo.fork,
    defaultBranch: repo.default_branch || 'main',
    _raw: repo,
  };
}
