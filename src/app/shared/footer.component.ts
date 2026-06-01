import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective],
  template: `
    <footer class="site-footer" *transloco="let t">
      <div class="site-footer__inner">
        <span>© {{ year }} Madis Voitk · {{ t('footer.rights') }}</span>
        <a href="https://github.com/mvoitk1" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  `,
  styles: `
    .site-footer {
      border-top: 1px solid var(--border);
      margin-top: 4rem;
      padding: 1.5rem 1.25rem;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    .site-footer__inner {
      max-width: 64rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .site-footer a {
      color: var(--text-muted);
    }
    .site-footer a:hover,
    .site-footer a:focus-visible {
      color: var(--text);
    }
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
