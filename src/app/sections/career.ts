import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../core/i18n';
import { CareerEntry, PROFILE } from '../data/profile';
import { Panel } from '../ui/panel';

const AXIS_START = 2014;
const AXIS_END = 2028;

function toMonths(ym: string): number {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
}

function nowMonths(): number {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
}

const KIND_LABEL = {
  edu: { de: 'EDU ', en: 'EDU ' },
  work: { de: 'JOB ', en: 'JOB ' },
  svc: { de: 'DIEN', en: 'SVC ' },
};

/** Werdegang als Gantt-Chart (Zeitachse) + Systemlog. */
@Component({
  selector: 'app-career',
  imports: [Panel],
  template: `
    <app-panel index="05" [title]="i18n.tx('Werdegang', 'Career')" path="/var/log/career.log" [delay]="160">
      <div class="gantt" role="list">
        <div class="years" aria-hidden="true">
          @for (y of years; track y) {
            <span [style.left.%]="pos(y * 12)">{{ y % 2 === 0 ? "'" + (y % 100).toString().padStart(2, '0') : '' }}</span>
          }
        </div>
        @for (e of rows(); track e.id) {
          <div class="row" role="listitem">
            <button
              type="button"
              class="bar"
              [class]="'bar ' + e.kind"
              [class.active]="active() === e.id"
              [class.running]="!e.to"
              [style.left.%]="e.left"
              [style.width.%]="e.width"
              (mouseenter)="active.set(e.id)"
              (focus)="active.set(e.id)"
              (click)="active.set(e.id)"
              [attr.aria-label]="e.org + ', ' + i18n.t(e.role) + ', ' + e.from + ' – ' + (e.to ?? i18n.tx('heute', 'today'))"
            >
              <span>{{ e.short }}</span>
            </button>
          </div>
        }
        <div class="now" [style.left.%]="nowPos" aria-hidden="true">
          <span>{{ i18n.tx('JETZT', 'NOW') }}</span>
        </div>
      </div>

      <ol class="log">
        @for (e of rows(); track e.id) {
          <li [class.active]="active() === e.id" (mouseenter)="active.set(e.id)">
            <span class="ts dim">{{ e.from }} → {{ e.to ?? i18n.tx('heute  ', 'today  ') }}</span>
            <span class="kind" [class]="'kind ' + e.kind">[{{ i18n.t(kindLabel[e.kind]) }}]</span>
            <span class="what">
              <strong>{{ e.org }}</strong>
              @if (e.place) {
                <span class="dim"> · {{ e.place }}</span>
              }
              <span class="role">{{ i18n.t(e.role) }}</span>
            </span>
            <span class="dur">
              @if (!e.to) {
                <span class="running-tag">RUNNING</span>
              } @else {
                {{ e.duration }}
              }
            </span>
          </li>
        }
      </ol>
    </app-panel>
  `,
  styleUrl: './career.scss',
})
export class Career {
  protected readonly i18n = inject(I18n);
  protected readonly kindLabel = KIND_LABEL;
  protected readonly years = Array.from({ length: AXIS_END - AXIS_START }, (_, i) => AXIS_START + i);
  protected readonly active = signal<string>(PROFILE.career.at(-1)!.id);
  protected readonly nowPos = this.pos(nowMonths());

  protected readonly rows = computed(() =>
    PROFILE.career.map((e: CareerEntry) => {
      const start = toMonths(e.from);
      const end = e.to ? toMonths(e.to) : nowMonths();
      const months = end - start;
      const y = Math.floor(months / 12);
      const m = months % 12;
      return {
        ...e,
        left: this.pos(start),
        width: Math.max(this.pos(end) - this.pos(start), 1.2),
        short: e.org.replace(' Schweiz AG', '').replace(' Bankware AG', ''),
        duration: `${y}y ${m.toString().padStart(2, '0')}m`,
      };
    }),
  );

  protected pos(months: number): number {
    const a = AXIS_START * 12;
    const b = AXIS_END * 12;
    return ((months - a) / (b - a)) * 100;
  }
}
