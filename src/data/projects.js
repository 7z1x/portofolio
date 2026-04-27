/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  QUICK CONFIG — Edit kategori & foto di sini!                   ║
 * ║                                                                  ║
 * ║  Format: 'nama-repo': { cat: ['Kategori'] }                     ║
 * ║  - cat  = kategori (AI Engineer / Mobile Development / ML)      ║
 * ║  - img  = OPSIONAL, path foto custom (taruh di /public)         ║
 * ║           Kalau ga diisi, otomatis pakai GitHub Preview Image   ║
 * ║  - Repo yang ga ada di sini → auto-detect dari GitHub           ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
const QUICK_CONFIG = {
  // ── AI Engineer ──
  'portofolio':                    { cat: ['AI Engineer'],                     img: '/project_hero_3.png' },
  'ai-marketplace-assistant':      { cat: ['AI Engineer'] },

  // ── Mobile Development ──
  'duet-duetku-finance-traker-app':{ cat: ['Mobile Development'],              img: '/project_hero_2.png' },
  'DicodingEvent':                 { cat: ['Mobile Development'] },
  'Todo-app':                      { cat: ['Mobile Development'] },
  'FindAnimal':                    { cat: ['Mobile Development'] },
  'UnescoApp':                     { cat: ['Mobile Development'] },
  'kalkulator':                    { cat: ['Mobile Development'] },
  'FED':                           { cat: ['Mobile Development'] },
  'Gulugulu':                      { cat: ['Mobile Development'] },

  // ── Machine Learning ──
  'Sign_language':                 { cat: ['AI Engineer', 'Machine Learning'] },
  'Eksperimen_SML_Zulfahmi_M_Ardianto': { cat: ['Machine Learning'] },
  'SMSML_Zulfahmi-M.-Ardianto':   { cat: ['Machine Learning'] },
  'Membangun_model':               { cat: ['Machine Learning'] },
  'Belajar-Machine-Learning-Pemula':{ cat: ['Machine Learning'] },
  'Proyek-Klasifikasi-gambar':     { cat: ['Machine Learning'] },
  'Proyek-Analisis-Sentimen':      { cat: ['Machine Learning'] },
  'Netfix-movie-and-film-rekomendation-project': { cat: ['Machine Learning'] },
  'Breast-Cancer-Predictive-Analityc-Project':   { cat: ['Machine Learning'] },
  'Menyelesaikan-Permasalahan-Institusi-Pendidikan': { cat: ['Machine Learning'] },
  'Menyelesaikan-Permasalahan-Human-Resources':  { cat: ['Machine Learning'] },
  'Monitoring-dan-Logging':        { cat: ['Machine Learning'] },
  'Workflow-CI':                   { cat: ['Machine Learning'] },
  'dicoding':                      { cat: ['Machine Learning'] },

  // ── Lain-lain ──
  'Parsing-CSharp':                { cat: ['Others'] },
  'Skibidi_Dor':                   { cat: ['Others'] },
  'CodeProcessing-GravisVisual':   { cat: ['Others'] },
};


// ═══════════════════════════════════════════════════════════
// DETAILED OVERRIDES — Deskripsi lengkap untuk project utama
// (Ini opsional, cuma untuk project yang mau ditampilin detail)
// ═══════════════════════════════════════════════════════════

const DETAILED_OVERRIDES = {
  portofolio: {
    name: 'Portfolio Website',
    tagline: 'Personal Portfolio with Cinematic Design',
    roles: 'Frontend Developer, Designer',
    client: 'Personal Project',
    description:
      'A cinematic personal portfolio website featuring WebGL shader backgrounds, interactive timelines, and smooth scroll-based transitions with a retro-hacker aesthetic.',
    overview:
      'This portfolio leverages React with custom WebGL shaders for the FaultyTerminal background effect. It features a modular component architecture with GlassSurface distortion effects, CircularText animations, and a continuous LogoLoop tech stack marquee.',
    techStack: ['React', 'JavaScript', 'CSS3', 'WebGL', 'Vite', 'Framer Motion'],
    features: [
      { title: 'WebGL Shader Background', desc: 'Custom FaultyTerminal shader creating a cinematic retro-hacker aesthetic.' },
      { title: 'Interactive Experience Timeline', desc: 'Expandable accordion with smooth animations for work history.' },
      { title: 'Glass Surface Effects', desc: 'SVG-based displacement and blur effects for frosted glass UI elements.' },
      { title: 'Responsive Design', desc: 'Fully responsive layout with optimized performance across all devices.' },
    ],
    designScreens: [
      { label: 'Home', src: '/design_screen_1.png' },
      { label: 'About', src: '/design_screen_2.png' },
      { label: 'Projects', src: '/design_screen_3.png' },
    ],
  },

  'ai-marketplace-assistant': {
    name: 'AI Marketplace Assistant',
    tagline: 'AI-Powered Sales Analytics Engine',
    roles: 'AI Engineer, Backend Developer',
    client: 'Personal Project',
    description:
      'An AI-powered sales analytics engine that leverages RAG (Retrieval-Augmented Generation) to help businesses evaluate and improve their sales performance through intelligent product recommendations and evaluations.',
    overview:
      'Built with FastAPI and PostgreSQL, this platform delivers real-time AI-driven insights for sales teams. The system uses vector embeddings and semantic search to match customer queries with the most relevant products, while an AI Judge evaluates sales interactions for quality assurance.',
    techStack: ['TypeScript', 'Next.js', 'FastAPI', 'PostgreSQL', 'LangChain', 'OpenAI'],
    features: [
      { title: 'AI Sales Agent', desc: 'Intelligent agent that provides personalized product recommendations based on customer needs.' },
      { title: 'RAG Pipeline', desc: 'Retrieval-Augmented Generation for accurate, context-aware responses from product catalog.' },
      { title: 'AI Judge System', desc: 'Automated evaluation of sales interactions with scoring and feedback.' },
      { title: 'Real-time Analytics', desc: 'Dashboard with comprehensive metrics on agent performance and customer engagement.' },
    ],
    designScreens: [
      { label: 'Dashboard', src: '/design_screen_1.png' },
      { label: 'Agent Chat', src: '/design_screen_2.png' },
      { label: 'Analytics', src: '/design_screen_3.png' },
    ],
  },

  'duet-duetku-finance-traker-app': {
    name: 'Duet Duetku',
    tagline: 'Smart Finance Tracker App',
    roles: 'Mobile Developer, UI/UX Designer',
    client: 'Personal Project',
    description:
      'A modern finance tracking app for Android built with Kotlin. Helps users manage expenses, income, and budgets with a clean neo-brutalist UI.',
    overview:
      'Duet Duetku leverages Kotlin and modern Android architecture to create a seamless financial tracking experience with beautiful Material 3 design.',
    techStack: ['Kotlin', 'Jetpack Compose', 'Room Database', 'Material 3'],
    features: [
      { title: 'Expense Tracking', desc: 'Track daily expenses and income with intuitive category management.' },
      { title: 'Budget Management', desc: 'Set and monitor monthly budgets with visual progress indicators.' },
      { title: 'Beautiful Charts', desc: 'Visual breakdown of spending patterns with interactive charts.' },
      { title: 'Neo-Brutalist Design', desc: 'Bold, vibrant UI with custom color palette and strong visual hierarchy.' },
    ],
    designScreens: [
      { label: 'Home', src: '/design_screen_1.png' },
      { label: 'Expenses', src: '/design_screen_2.png' },
      { label: 'Charts', src: '/design_screen_3.png' },
    ],
  },

  'Sign_language': {
    name: 'Sign Language Detection',
    tagline: 'ML-Powered Sign Language Recognition',
    roles: 'ML Engineer',
    client: 'Academic Project',
    description:
      'A machine learning project that detects and translates sign language gestures into text using computer vision and deep learning.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Mediapipe'],
    features: [
      { title: 'Real-time Detection', desc: 'Live camera feed processing for instant sign language recognition.' },
      { title: 'Deep Learning Model', desc: 'Custom trained neural network for accurate gesture classification.' },
      { title: 'Multi-gesture Support', desc: 'Supports a wide variety of sign language gestures.' },
    ],
  },
};


// ═══════════════════════════════════════════════════
// MERGE — Gabungkan QUICK_CONFIG + DETAILED_OVERRIDES
// (Jangan edit bagian ini)
// ═══════════════════════════════════════════════════

export const PROJECT_OVERRIDES = {};

// 1. Apply quick config (kategori & foto)
for (const [repo, config] of Object.entries(QUICK_CONFIG)) {
  PROJECT_OVERRIDES[repo] = {
    category: config.cat,
    ...(config.img ? { coverImage: config.img } : {}),
  };
}

// 2. Merge detailed overrides on top
for (const [repo, details] of Object.entries(DETAILED_OVERRIDES)) {
  PROJECT_OVERRIDES[repo] = {
    ...PROJECT_OVERRIDES[repo],
    ...details,
  };
}

// Legacy export for backward compatibility.
export const PROJECT_DATA = Object.entries(PROJECT_OVERRIDES).map(([id, data]) => ({
  id,
  ...data,
  github: data.github || `https://github.com/7z1x/${id}`,
  techStack: data.techStack || [],
  features: data.features || [],
  designScreens: data.designScreens || [],
}));
