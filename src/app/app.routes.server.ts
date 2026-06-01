import { RenderMode, ServerRoute } from '@angular/ssr';
import { POSTS } from './blog/posts';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => POSTS.map((p) => ({ slug: p.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
