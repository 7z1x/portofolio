import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Experiences',
  type: 'document',
  fields: [
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'company', title: 'Company / organization', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'icon', title: 'Icon letter', type: 'string', validation: (rule) => rule.required().max(2) }),
    defineField({
      name: 'color',
      title: 'Icon color',
      type: 'string',
      initialValue: '#1a73e8',
      validation: (rule) => rule.required().regex(/^#[0-9a-fA-F]{6}$/, { name: 'hex color' }),
    }),
    defineField({ name: 'startDate', title: 'Start date', type: 'date' }),
    defineField({ name: 'endDate', title: 'End date', type: 'date' }),
    defineField({ name: 'date', title: 'Short date label', type: 'string', description: 'Contoh: Nov 2025 — Mei 2026' }),
    defineField({ name: 'type', title: 'Employment type', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration label', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'bullets',
      title: 'Highlights',
      type: 'array',
      of: [defineArrayMember({ type: 'text', rows: 2 })],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
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
    { title: 'Newest start date', name: 'startDateDesc', by: [{ field: 'startDate', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'role', subtitle: 'company', visible: 'isVisible' },
    prepare({ title, subtitle, visible }) {
      return { title, subtitle: `${visible === false ? 'Hidden · ' : ''}${subtitle}` };
    },
  },
});
