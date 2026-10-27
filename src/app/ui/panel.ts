import { Component, input } from '@angular/core';

/** HUD-Fenster mit Titelzeile, Status-LED und Eckmarkierungen. */
@Component({
  selector: 'app-panel',
  template: `
    <header class="bar">
      <span class="idx">{{ index() }}</span>
      <h2 class="title">{{ title() }}</h2>
      <span class="path dim">{{ path() }}</span>
      <span class="spacer"></span>
      <span class="state">
        <span class="led" [class.warn]="status() === 'warn'"></span>
        {{ statusText() }}
      </span>
    </header>
    <div class="body">
      <ng-content />
    </div>
    <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
  `,
  styleUrl: './panel.scss',
  host: { '[style.--delay]': 'delay() + "ms"' },
})
export class Panel {
  readonly index = input.required<string>();
  readonly title = input.required<string>();
  readonly path = input('');
  readonly status = input<'ok' | 'warn'>('ok');
  readonly statusText = input('ONLINE');
  readonly delay = input(0);
}
