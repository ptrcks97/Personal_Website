import { Component, DestroyRef, inject, signal } from '@angular/core';
import { I18n } from '../core/i18n';
import { PROFILE } from '../data/profile';
import { Panel } from '../ui/panel';

/** Charaktereigenschaften als laufende Daemon-Prozesse (`ps aux`). */
@Component({
  selector: 'app-processes',
  imports: [Panel],
  template: `
    <app-panel index="02" [title]="i18n.tx('Prozesse', 'Processes')" path="ps aux | grep patrick" [delay]="120">
      <p class="dim cmd">{{ i18n.tx('// Wie Kollegen mich beschreiben', '// How colleagues describe me') }}</p>
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>{{ i18n.tx('PROZESS', 'PROCESS') }}</th>
            <th class="num">%CPU</th>
            <th>STAT</th>
          </tr>
        </thead>
        <tbody>
          @for (t of traits; track t.proc; let i = $index) {
            <tr>
              <td class="dim">{{ 1001 + i }}</td>
              <td>
                <span class="proc">{{ t.proc }}</span>
                <span class="label">{{ i18n.t(t.label) }}</span>
              </td>
              <td class="num">{{ cpu()[i].toFixed(1) }}</td>
              <td><span class="run">R+</span></td>
            </tr>
          }
        </tbody>
      </table>
      <p class="foot dim">
        {{ i18n.tx('4 Prozesse · 0 Zombies · Neustart nie nötig', '4 processes · 0 zombies · never needs a restart') }}
      </p>
    </app-panel>
  `,
  styles: `
    :host {
      display: block;
    }
    app-panel {
      height: 100%;
    }
    .cmd {
      margin: 0 0 0.8em;
      font-size: 13px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13.5px;
      font-variant-numeric: tabular-nums;
    }
    th {
      text-align: left;
      font-weight: 400;
      color: var(--p-500);
      font-size: 11px;
      letter-spacing: 0.1em;
      border-bottom: 1px solid var(--p-600);
      padding: 0.2em 0.4em;
    }
    td {
      padding: 0.45em 0.4em;
      border-bottom: 1px dashed var(--p-700);
      vertical-align: top;
    }
    tr:hover td {
      background: var(--p-700);
    }
    .num {
      text-align: right;
    }
    .proc {
      display: block;
      color: var(--p-400);
      font-size: 12px;
    }
    .label {
      display: block;
      font-family: var(--font-display);
      font-size: 24px;
      line-height: 1.05;
      color: var(--p-100);
    }
    .run {
      color: var(--bg);
      background: var(--p-300);
      padding: 0 0.35em;
      text-shadow: none;
      font-size: 12px;
    }
    .foot {
      margin: 0.9em 0 0;
      font-size: 12px;
    }
  `,
})
export class Processes {
  protected readonly i18n = inject(I18n);
  protected readonly traits = PROFILE.traits;
  protected readonly cpu = signal(this.traits.map(() => 96 + Math.random() * 3.9));

  constructor() {
    const id = setInterval(
      () => this.cpu.update((v) => v.map((x) => Math.min(99.9, Math.max(94, x + (Math.random() - 0.5) * 2.2)))),
      1400,
    );
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}
