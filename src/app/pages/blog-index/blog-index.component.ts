import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { POSTS } from '../../blog/posts';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-blog-index',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslocoDirective],
  template: `
    <ng-container *transloco="let t">
      <div class="container blog-index">
        <header class="blog-index__head">
          <h1>{{ t('blog.title') }}</h1>
          <p class="muted">{{ t('blog.subtitle') }}</p>
        </header>

        @if (posts.length === 0) {
          <p class="muted">{{ t('blog.empty') }}</p>
        } @else {
          <ul class="posts">
            @for (p of posts; track p.slug) {
              <li class="posts__item">
                <a [routerLink]="['/blog', p.slug]" class="posts__link">
                  <h2 class="posts__title">{{ p.title[active()] }}</h2>
                  <p class="posts__summary">{{ p.summary[active()] }}</p>
                  <p class="posts__meta">
                    <time [attr.datetime]="p.date">{{ p.date }}</time>
                    · {{ p.readingMinutes }} {{ t('blog.minRead') }}
                  </p>
                </a>
              </li>
            }
          </ul>
        }
      </div>
    </ng-container>
  `,
  styles: `
    .blog-index {
      padding-block: 2.5rem 4rem;
    }
    .blog-index__head h1 {
      margin: 0 0 0.25rem;
      font-size: 2rem;
      letter-spacing: -0.02em;
    }
    .muted {
      color: var(--text-muted);
    }
    .posts {
      list-style: none;
      margin: 1.5rem 0 0;
      padding: 0;
      display: grid;
      gap: 0.75rem;
    }
    .posts__link {
      display: block;
      padding: 1rem 1.1rem;
      border: 1px solid var(--border);
      border-radius: 12px;
      text-decoration: none;
      color: var(--text);
      background: var(--surface);
    }
    .posts__link:hover,
    .posts__link:focus-visible {
      background: var(--surface-2);
      border-color: color-mix(in oklab, var(--accent) 35%, var(--border));
    }
    .posts__title {
      margin: 0 0 0.35rem;
      font-size: 1.15rem;
    }
    .posts__summary {
      margin: 0;
      color: var(--text-muted);
    }
    .posts__meta {
      margin: 0.6rem 0 0;
      color: var(--text-muted);
      font-size: 0.85rem;
    }
  `,
})
export class BlogIndexComponent {
  private readonly lang = inject(LanguageService);
  readonly posts = POSTS;
  readonly active = this.lang.active;
}
