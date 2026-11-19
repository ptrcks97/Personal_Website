import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.html',
  styleUrl: './status-bar.scss',
})
export class StatusBar {
  protected readonly i18n = inject(I18n);
  protected readonly system = inject(SystemState);
  protected readonly nav = NAV;

  /** Karrierebeginn als MM/YYYY und volle Jahre seither – statisch, ohne Timer. */
  protected readonly since = (() => {
    const [y, m] = PROFILE.careerStart.split('-');
    return `${m}/${y}`;
  })();

  protected readonly years = (() => {
    const start = new Date(PROFILE.careerStart + 'T00:00:00');
    const now = new Date();
    const beforeAnniversary =
      now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
    return now.getFullYear() - start.getFullYear() - (beforeAnniversary ? 1 : 0);
  })();
}
