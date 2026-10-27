import { Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { Panel } from '../ui/panel';

/** Hobbys als Umwelt-Sensoren: Wanderprofil mit animiertem Wanderer + Hund. */
@Component({
  selector: 'app-sensors',
  imports: [Panel],
  template: `
    <app-panel index="03" [title]="i18n.tx('Sensoren', 'Sensors')" path="/dev/outdoor" [delay]="240">
      <div class="trail" aria-hidden="true">
        <svg viewBox="0 0 300 120">
          <defs>
            <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stop-color="#39ff6a" stop-opacity="0.28" />
              <stop offset="1" stop-color="#39ff6a" stop-opacity="0" />
            </linearGradient>
          </defs>
          @for (y of [20, 50, 80, 110]; track y) {
            <line x1="0" x2="300" [attr.y1]="y" [attr.y2]="y" class="gridline" />
          }
          <path
            class="ridge-far"
            d="M0 70 L30 52 L55 64 L90 30 L120 48 L150 22 L185 44 L215 34 L250 58 L300 40"
          />
          <path class="area" [attr.d]="trail + ' L300 120 L0 120 Z'" />
          <path id="trail-path" class="line" [attr.d]="trail" />
          <circle r="3.2" class="walker">
            <animateMotion dur="14s" repeatCount="indefinite" rotate="0">
              <mpath href="#trail-path" />
            </animateMotion>
          </circle>
          <circle r="2" class="dog">
            <animateMotion dur="14s" begin="-0.45s" repeatCount="indefinite">
              <mpath href="#trail-path" />
            </animateMotion>
          </circle>
        </svg>
        <div class="axis dim"><span>START</span><span>{{ i18n.tx('GIPFEL', 'SUMMIT') }}</span><span>{{ i18n.tx('ZIEL', 'FINISH') }}</span></div>
      </div>

      <dl class="readout">
        <dt>{{ i18n.tx('HABITAT', 'HABITAT') }}</dt>
        <dd>{{ i18n.tx('Morschach · über dem Vierwaldstättersee', 'Morschach · above Lake Lucerne') }}</dd>
        <dt>{{ i18n.tx('AKTIVITÄT', 'ACTIVITY') }}</dt>
        <dd>{{ i18n.tx('Wandern · Natur', 'Hiking · nature') }}</dd>
        <dt>{{ i18n.tx('BEGLEITUNG', 'COMPANION') }}</dt>
        <dd><span class="led"></span> /dev/dog0 · {{ i18n.tx('Hund', 'Dog') }} · ONLINE</dd>
      </dl>

      <pre class="dog-ascii" aria-hidden="true" [textContent]="dog"></pre>
    </app-panel>
  `,
  styles: `
    :host {
      display: block;
    }
    app-panel {
      height: 100%;
    }
    .trail {
      border: 1px solid var(--p-600);
      background: var(--bg);
      padding: 6px 6px 2px;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .gridline {
      stroke: var(--p-700);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
      stroke-dasharray: 2 3;
    }
    .ridge-far {
      fill: none;
      stroke: var(--p-600);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }
    .area {
      fill: url(#fill);
    }
    .line {
      fill: none;
      stroke: var(--p-300);
      stroke-width: 2;
      vector-effect: non-scaling-stroke;
      filter: drop-shadow(0 0 3px var(--p-300));
    }
    .walker {
      fill: var(--p-100);
      filter: drop-shadow(0 0 4px var(--p-300));
    }
    .dog {
      fill: var(--warn);
    }
    .axis {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      letter-spacing: 0.1em;
      padding-top: 2px;
    }
    .readout {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.25em 1em;
      margin: 1em 0 0;
      font-size: 13px;

      dt {
        color: var(--p-500);
        letter-spacing: 0.08em;
      }
      dd {
        margin: 0;
      }
    }
    .dog-ascii {
      margin: 0.8em 0 0;
      font-size: 12px;
      line-height: 1.15;
      color: var(--warn);
      text-shadow: 0 0 6px rgba(255, 176, 46, 0.4);
    }
  `,
})
export class Sensors {
  protected readonly i18n = inject(I18n);
  protected readonly dog = ["  __      _", "o'')}____//", " `_/      )", " (_(_/-(_/"].join('\n');
  protected readonly trail =
    'M0 100 L20 96 L38 88 L52 90 L70 74 L88 70 L104 56 L120 60 L138 42 L150 30 L160 24 L172 34 L190 48 L206 52 L222 66 L240 72 L258 84 L276 90 L300 98';
}
