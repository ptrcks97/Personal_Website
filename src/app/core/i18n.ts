import { Injectable, effect, signal } from '@angular/core';
import { L, Lang } from '../data/profile';

const STORAGE_KEY = 'ps-os.lang';

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'de' || stored === 'en') return stored;
  } catch {}
  return navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en';
}

@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>(initialLang());

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {}
    });
  }

  /** Übersetzt einen zweisprachigen Text. Reaktiv, da lang() ein Signal ist. */
  t(text: L): string {
    return text[this.lang()];
  }

  /** Kurzform für Inline-Texte in Templates: i18n.tx('Hallo', 'Hello') */
  tx(de: string, en: string): string {
    return this.lang() === 'de' ? de : en;
  }

  toggle(): void {
    this.lang.update((l) => (l === 'de' ? 'en' : 'de'));
  }
}
