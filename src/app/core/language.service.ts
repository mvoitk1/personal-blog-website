import { DOCUMENT, Inject, Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

export type Lang = 'en' | 'et';

const STORAGE_KEY = 'mv.lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly current = signal<Lang>('en');

  readonly active = computed(() => this.current());
  readonly available: readonly Lang[] = ['en', 'et'] as const;

  constructor(
    @Inject(DOCUMENT) private readonly doc: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
    let initial: Lang = 'en';
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === 'en' || stored === 'et') {
        initial = stored;
      } else if (navigator.language?.toLowerCase().startsWith('et')) {
        initial = 'et';
      }
    }
    this.set(initial);
  }

  set(lang: Lang): void {
    this.current.set(lang);
    this.transloco.setActiveLang(lang);
    this.doc.documentElement.lang = lang;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }
}
