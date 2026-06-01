import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then((m) => m.LandingComponent),
    title: 'Madis Voitk',
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog-index/blog-index.component').then((m) => m.BlogIndexComponent),
    title: 'Blog · Madis Voitk',
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/blog-post/blog-post.component').then((m) => m.BlogPostComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
