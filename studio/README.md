# Portfolio CMS

Sanity Studio untuk mengelola project, experience, dan pengaturan portfolio.

## Environment

Salin `.env.example` menjadi `.env`, lalu isi project ID Sanity:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

Frontend membutuhkan nilai yang sama di `.env` root dan di Environment Variables Vercel:

```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

## Commands

- `npm run studio:dev` — menjalankan Studio lokal.
- `npm run studio:build` — memvalidasi production build Studio.
- `npm run studio:deploy` — deploy ke domain `*.sanity.studio`.
- `npm run studio:seed` — membuat file import awal dari data lokal lama.

Jangan pernah memasukkan token dengan izin write ke variable `VITE_*`.
