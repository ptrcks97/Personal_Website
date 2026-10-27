import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { I18n } from '../core/i18n';
import { SystemState } from '../core/system';
import { PROFILE } from '../data/profile';

/** Impressum + Datenschutzhinweis als Retro-Fenster (<dialog>). */
@Component({
  selector: 'app-legal',
  templateUrl: './legal.html',
  styleUrl: './legal.scss',
  host: { '(window:hashchange)': 'onHash()' },
})
export class Legal {
  protected readonly i18n = inject(I18n);
  private readonly system = inject(SystemState);
  protected readonly p = PROFILE;
  protected readonly linkLabels = PROFILE.projects
    .flatMap((pr) => pr.links)
    .filter((l) => !l.url.includes('github'))
    .map((l) => l.label)
    .join(', ');

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const el = this.dialog().nativeElement;
      if (this.system.legalOpen() && !el.open) el.showModal();
      else if (!this.system.legalOpen() && el.open) el.close();
    });
  }

  protected onHash(): void {
    if (location.hash === '#impressum') this.system.legalOpen.set(true);
  }

  protected close(): void {
    this.system.legalOpen.set(false);
  }

  protected onClosed(): void {
    this.system.legalOpen.set(false);
    if (location.hash === '#impressum') history.replaceState(null, '', location.pathname + location.search);
  }

  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }
}
