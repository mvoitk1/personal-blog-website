import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { POSTS } from '../../blog/posts';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslocoDirective],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  private readonly transloco = inject(TranslocoService);
  private readonly languageService = inject(LanguageService);

  readonly latestPosts = POSTS.slice(0, 3);
  readonly active = this.languageService.active;

  readonly contact = {
    email: 'madis.voitk2003@gmail.com',
    phone: '+372 535 446 11',
    phoneHref: 'tel:+37253544611',
    github: 'https://github.com/mvoitk1',
    githubLabel: 'github.com/mvoitk1',
  };

  readonly experienceItems = (): string[] =>
    (this.transloco.translateObject('experience.items') as string[]) ?? [];

  readonly ecommerceBullets = (): string[] =>
    (this.transloco.translateObject('projects.ecommerce.bullets') as string[]) ?? [];

  readonly courseworkBullets = (): string[] =>
    (this.transloco.translateObject('projects.coursework.bullets') as string[]) ?? [];
}
