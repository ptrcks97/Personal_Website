import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { I18n } from '../core/i18n';
import { SystemState } from '../core/system';
import { PROFILE } from '../data/profile';

export const NAV = [
  { id: 'ident', key: '1', label: { de: 'Ident', en: 'Ident' } },
  { id: 'skills', key: '2', label: { de: 'Skills', en: 'Skills' } },
  { id: 'career', key: '3', label: { de: 'Werdegang', en: 'Career' } },
  { id: 'projects', key: '4', label: { de: 'Projekte', en: 'Projects' } },
  { id: 'uplink', key: '5', label: { de: 'Kontakt', en: 'Contact' } },
  { id: 'console', key: '6', label: { de: 'Konsole', en: 'Console' } },
];

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.html',
  styleUrl: './status-bar.scss',
})
export class StatusBar {
  protected readonly i18n = inject(I18n);
  protected readonly system = inject(SystemState);
  protected readonly nav = NAV;

  private readonly now = signal(new Date());

  protected readonly clock = computed(() =>
    this.now().toLocaleTimeString('de-CH', { timeZone: 'Europe/Zurich', hour12: false }),
  );

  /** Berufliche Laufzeit seit Lehrbeginn, als Jahre/Monate/Tage + Uhrzeit. */
  protected readonly uptime = computed(() => {
    const start = new Date(PROFILE.careerStart + 'T00:00:00');
    const now = this.now();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    const t = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    return `${years}y ${pad(months)}m ${pad(days)}d ${t}`;
  });

  constructor() {
    const id = setInterval(() => this.now.set(new Date()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}
