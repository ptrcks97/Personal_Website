import { Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SystemState } from '../core/system';

interface Block {
  id: string;
  label: string;
  x: number;
  y: number;
  h: number;
}

/**
 * Easter Egg: "It's a UNIX system! I know this!"
 * Ein 3D-Dateisystem-Browser im Stil der frühen 90er. Jeder Block ist ein
 * Verzeichnis – ein Klick springt zum passenden Abschnitt.
 */
@Component({
  selector: 'app-unix',
  templateUrl: './unix.html',
  styleUrl: './unix.scss',
  host: { '(document:keydown.escape)': 'close()', role: 'dialog', 'aria-modal': 'true' },
})
export class Unix {
  protected readonly i18n = inject(I18n);
  private readonly system = inject(SystemState);

  protected readonly blocks: Block[] = [
    { id: 'ident', label: '/home', x: 340, y: 340, h: 120 },
    { id: 'skills', label: '/proc/skills', x: 120, y: 140, h: 170 },
    { id: 'career', label: '/var/log', x: 560, y: 140, h: 140 },
    { id: 'projects', label: '/mnt/projects', x: 120, y: 540, h: 150 },
    { id: 'uplink', label: '/etc/contact', x: 560, y: 540, h: 90 },
  ];

  protected go(id: string): void {
    this.close();
    setTimeout(() => this.system.scrollTo(id), 50);
  }

  protected close(): void {
    this.system.unixMode.set(false);
  }
}
