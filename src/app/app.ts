import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header.component';
import { FooterComponent } from './shared/footer.component';
import { ThemeService } from './core/theme.service';
import { LanguageService } from './core/language.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <a href="#main" class="skip-link">Skip to content</a>
    <app-header />
    <main id="main" class="main">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100dvh;
    }
    .main {
      flex: 1;
    }
    .skip-link {
      position: absolute;
      left: -9999px;
      top: 0.5rem;
      background: var(--accent);
      color: var(--accent-fg);
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      z-index: 100;
    }
    .skip-link:focus {
      left: 0.5rem;
    }
  `,
})
export class App {
  // Eager-instantiate so theme + language are applied before child views render.
  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);
}
