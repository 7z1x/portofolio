const GITHUB_USERNAME = '7z1x';
const GITHUB_API = 'https://api.github.com';
const IS_PROD = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

const cache = new Map();

function escapeSvgText(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSvgTitleLines(value = '', maxLineLength = 22, maxLines = 2) {
  const words = String(value).replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  const lines = [];
  let currentLine = '';
  let truncated = false;

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;

    if (candidate.length <= maxLineLength) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      lines.push(`${word.slice(0, Math.max(0, maxLineLength - 3))}...`);
      currentLine = '';
      truncated = true;
    }

    if (lines.length === maxLines) {
      truncated = true;
      break;
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  } else if (currentLine) {
    truncated = true;
  }

  if (truncated && lines.length > 0) {
    const lastIndex = lines.length - 1;
    const line = lines[lastIndex];
    if (!line.endsWith('...')) {
      lines[lastIndex] = line.length > maxLineLength - 3
        ? `${line.slice(0, maxLineLength - 3)}...`
        : `${line}...`;
    }
  }

  return lines.length > 0 ? lines : ['Untitled Project'];
}

function createFallbackCover({ name, language, bgColor }) {
  const title = escapeSvgText(name);
  const titleLines = getSvgTitleLines(name).map(escapeSvgText);
  const titleMarkup = titleLines
    .map((line, index) => `<tspan x="230" dy="${index === 0 ? 0 : '1.08em'}">${line}</tspan>`)
    .join('');
  const subtitleY = titleLines.length > 1 ? 555 : 515;
  const subtitle = escapeSvgText(language || 'GitHub Project');
  const background = escapeSvgText(bgColor || '#C5CAE9');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${title}">
      <rect width="1200" height="900" rx="36" fill="${background}"/>
      <circle cx="1010" cy="170" r="190" fill="rgba(255,255,255,0.22)"/>
      <circle cx="165" cy="735" r="240" fill="rgba(0,0,0,0.07)"/>
      <rect x="170" y="260" width="860" height="380" rx="30" fill="rgba(255,255,255,0.84)"/>
      <rect x="170" y="610" width="860" height="30" rx="0" fill="rgba(0,0,0,0.18)"/>
      <text x="230" y="385" fill="#202532" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="400">7z1x/</text>
      <text x="230" y="445" fill="#202532" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700">${titleMarkup}</text>
      <text x="230" y="${subtitleY}" fill="#6b7280" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="500">${subtitle}</text>
      <circle cx="920" cy="405" r="58" fill="#202532"/>
      <path d="M920 334c-40 0-72 32-72 72 0 32 21 59 50 68 4 1 5-2 5-4v-18c-20 4-25-9-25-9-3-8-8-10-8-10-7-5 0-5 0-5 8 1 12 8 12 8 7 12 18 8 23 6 1-5 3-8 5-10-16-2-33-8-33-36 0-8 3-15 8-20-1-2-4-10 1-20 0 0 6-2 20 8 6-2 12-2 18-2s12 1 18 2c14-10 20-8 20-8 5 10 2 18 1 20 5 5 8 12 8 20 0 28-17 34-33 36 3 2 5 7 5 14v23c0 3 2 5 5 4 29-10 50-37 50-68-8-40-40-72-80-72z" fill="#ffffff"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

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
    fallbackCoverImage: createFallbackCover({
      name: prettyName,
      language: repo.language,
      bgColor,
    }),
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
