import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { marked } from 'marked';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  private readonly http = inject(HttpClient);

  constructor() {
    marked.setOptions({ gfm: true, breaks: false });
  }

  loadPost(slug: string, lang: string): Observable<string> {
    return this.http
      .get(`/posts/${slug}.${lang}.md`, { responseType: 'text' })
      .pipe(map((md) => marked.parse(md) as string));
  }
}
