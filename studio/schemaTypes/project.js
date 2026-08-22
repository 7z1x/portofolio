import { defineArrayMember, defineField, defineType } from 'sanity';

const CATEGORIES = ['AI', 'Data Analyst & Data Science', 'Other'];

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Dipakai pada URL /project/slug. Jangan diubah setelah project dipublikasikan.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'repositoryName',
      title: 'GitHub repository name',
      type: 'string',
      description: 'Nama repo persis tanpa username, contoh: ai-marketplace-assistant.',
    }),
    defineField({ name: 'tagline', title: 'Short tagline', type: 'string' }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: CATEGORIES, layout: 'tags' },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'year', title: 'Display year', type: 'string' }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'externalCoverUrl',
      title: 'External cover URL (optional)',
      type: 'url',
      description: 'Fallback untuk migrasi. Untuk konten baru, sebaiknya upload Cover image.',
    }),
    defineField({
      name: 'bgColor',
      title: 'Fallback background color',
      type: 'string',
      initialValue: '#C5CAE9',
      validation: (rule) => rule.regex(/^#[0-9a-fA-F]{6}$/, { name: 'hex color' }),
    }),
    defineField({ name: 'description', title: 'Short description', type: 'text', rows: 4 }),
    defineField({ name: 'overview', title: 'Overview', type: 'text', rows: 8 }),
    defineField({ name: 'roles', title: 'Roles', type: 'string' }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({
      name: 'techStack',
      title: 'Tech stack',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({
      name: 'designScreens',
      title: 'Design screens',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'designScreen',
          title: 'Design screen',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'externalUrl',
              title: 'External URL (optional)',
              type: 'string',
              description: 'Dipakai hanya untuk gambar lama di folder public.',
            }),
          ],
          preview: { select: { title: 'label', media: 'image' } },
        }),
      ],
    }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'homepage', title: 'Live demo URL', type: 'url' }),
    defineField({ name: 'featured', title: 'Featured project', type: 'boolean', initialValue: false }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Angka lebih kecil tampil lebih dulu.',
      initialValue: 100,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({ name: 'isVisible', title: 'Show on portfolio', type: 'boolean', initialValue: true }),
  ],
  orderings: [
    { title: 'Display order', name: 'displayOrder', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', repositoryName: 'repositoryName', media: 'coverImage', visible: 'isVisible' },
    prepare({ title, repositoryName, media, visible }) {
      return {
        title,
        subtitle: `${visible === false ? 'Hidden · ' : ''}${repositoryName || 'No GitHub repository'}`,
        media,
      };
    },
  },
});
