export interface PostMeta {
  slug: string;
  date: string;
  title: { en: string; et: string };
  summary: { en: string; et: string };
  readingMinutes: number;
}

export const POSTS: readonly PostMeta[] = [
  {
    slug: 'welcome',
    date: '2026-06-01',
    title: {
      en: 'Welcome to the blog',
      et: 'Tere tulemast blogisse',
    },
    summary: {
      en: 'Why I built this site, what I plan to write about, and the stack behind it.',
      et: 'Miks ma selle saidi ehitasin, millest plaanin kirjutada ja milline tehnoloogia selle taga on.',
    },
    readingMinutes: 3,
  },
] as const;
