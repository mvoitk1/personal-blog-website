import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective } from '@jsverse/transloco';
import { POSTS, type PostMeta } from '../../blog/posts';
import { MarkdownService } from '../../blog/markdown.service';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-blog-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslocoDirective],
  template: `
    <ng-container *transloco="let t">
      <article class="container post">
        <a routerLink="/blog" class="post__back">{{ t('blog.back') }}</a>

        @if (meta(); as m) {
          <header class="post__head">
            <h1>{{ m.title[active()] }}</h1>
            <p class="post__meta">
              <time [attr.datetime]="m.date">{{ m.date }}</time>
              · {{ m.readingMinutes }} {{ t('blog.minRead') }}
            </p>
          </header>

          <div class="post__body" [innerHTML]="body()"></div>
        } @else {
          <p>404</p>
        }
      </article>
    </ng-container>
  `,
  styles: `
    .post {
      padding-block: 2.5rem 4rem;
      max-width: 44rem;
    }
    .post__back {
      display: inline-block;
      color: var(--text-muted);
      text-decoration: none;
      margin-bottom: 1.25rem;
    }
    .post__back:hover,
    .post__back:focus-visible {
      color: var(--text);
    }
    .post__head h1 {
      margin: 0 0 0.4rem;
      font-size: 1.9rem;
      letter-spacing: -0.02em;
    }
    .post__meta {
      margin: 0 0 1.75rem;
      color: var(--text-muted);
      font-size: 0.9rem;
    }
    .post__body :first-child {
      margin-top: 0;
    }
    .post__body h2 {
      margin-top: 2rem;
      font-size: 1.3rem;
    }
    .post__body h3 {
      margin-top: 1.5rem;
      font-size: 1.1rem;
    }
    .post__body p,
    .post__body li {
      line-height: 1.65;
    }
    .post__body code {
      background: var(--surface-2);
      padding: 0.1em 0.35em;
      border-radius: 4px;
      font-size: 0.9em;
    }
    .post__body pre {
      background: var(--surface-2);
      padding: 0.9rem 1rem;
      border-radius: 8px;
      overflow-x: auto;
    }
    .post__body pre code {
      background: transparent;
      padding: 0;
    }
    .post__body blockquote {
      border-left: 3px solid var(--accent);
      margin: 1rem 0;
      padding: 0.25rem 1rem;
      color: var(--text-muted);
    }
  `,
})
export class BlogPostComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly markdown = inject(MarkdownService);
  private readonly lang = inject(LanguageService);

  readonly active = this.lang.active;

  private readonly slug = toSignal(
    this.route.paramMap,
    { initialValue: this.route.snapshot.paramMap },
  );

  readonly meta = computed<PostMeta | undefined>(() => {
    const s = this.slug().get('slug');
    return POSTS.find((p) => p.slug === s);
  });

  readonly body = signal<string>('');

  constructor() {
    effect(() => {
      const m = this.meta();
      const lang = this.active();
      if (!m) {
        this.body.set('');
        return;
      }
      this.markdown.loadPost(m.slug, lang).subscribe({
        next: (html) => this.body.set(html),
        error: () => this.body.set('<p>Failed to load post.</p>'),
      });
    });
  }
}
