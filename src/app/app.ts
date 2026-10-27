import { Component, inject } from '@angular/core';
import { Boot } from './boot/boot';
import { I18n } from './core/i18n';
import { SystemState } from './core/system';
import { Career } from './sections/career';
import { Console } from './sections/console';
import { Ident } from './sections/ident';
import { Processes } from './sections/processes';
import { Projects } from './sections/projects';
import { Sensors } from './sections/sensors';
import { Skills } from './sections/skills';
import { Uplink } from './sections/uplink';
import { NAV, StatusBar } from './status-bar/status-bar';
import { Unix } from './unix/unix';
import { Legal } from './legal/legal';

const SECRET = 'unix';

@Component({
  selector: 'app-root',
  imports: [Boot, StatusBar, Ident, Processes, Sensors, Skills, Career, Projects, Uplink, Console, Unix, Legal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { '(document:keydown)': 'onKey($event)' },
})
export class App {
  protected readonly system = inject(SystemState);
  protected readonly i18n = inject(I18n);
  protected readonly year = new Date().getFullYear();

  private buffer = '';

  protected onKey(event: KeyboardEvent): void {
    if (this.system.booting() || event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, [contenteditable], dialog')) return;

    const nav = NAV.find((n) => n.key === event.key);
    if (nav) {
      this.system.scrollTo(nav.id);
      return;
    }

    // Easter Egg: "unix" irgendwo auf der Seite tippen
    this.buffer = (this.buffer + event.key.toLowerCase()).slice(-SECRET.length);
    if (this.buffer === SECRET) {
      this.buffer = '';
      this.system.unixMode.set(true);
    }
  }
}
