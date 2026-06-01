import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageService, type Lang } from '../core/language.service';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, TranslocoDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly lang = inject(LanguageService);
  private readonly themeService = inject(ThemeService);

  readonly active = this.lang.active;
  readonly available = this.lang.available;
  readonly theme = this.themeService.theme;

  setLang(value: Lang): void {
    this.lang.set(value);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
