import { Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { PROFILE } from '../data/profile';
import { Panel } from '../ui/panel';

/** Arbeitsweise als systemd-Units, jede mit Begründung; optional mit Referenz-Zitat. */
@Component({
  selector: 'app-processes',
  imports: [Panel],
  template: `
    <app-panel index="02" [title]="i18n.tx('Arbeitsweise', 'Work style')" path="systemctl list-units" [delay]="120">
      <ul class="units">
        @for (t of traits; track t.proc) {
          <li>
            <div class="head">
              <span class="ok">●</span>
              <span class="proc">{{ t.proc }}</span>
              <span class="state">active (running)</span>
            </div>
            <div class="label">{{ i18n.t(t.label) }}</div>
            <div class="desc"><span class="tree">└</span><span>{{ i18n.t(t.desc) }}</span></div>
          </li>
        }
      </ul>

      @if (testimonial; as q) {
        <figure class="quote">
          <blockquote>«{{ i18n.t(q.text) }}»</blockquote>
          <figcaption>— {{ q.author }}, <span class="dim">{{ i18n.t(q.role) }}</span></figcaption>
        </figure>
      }
    </app-panel>
  `,
  styles: `
    :host {
      display: block;
    }
    app-panel {
      height: 100%;
    }
    .units {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding: 0.55em 0.2em 0.6em;
        border-bottom: 1px dashed var(--p-700);

        &:first-child {
          padding-top: 0;
        }
      }
    }
    .head {
      display: flex;
      align-items: baseline;
      gap: 0.6em;
      font-size: 12px;
    }
    .ok {
      color: var(--p-300);
    }
    .proc {
      color: var(--p-400);
    }
    .state {
      margin-left: auto;
      color: var(--p-500);
      white-space: nowrap;
    }
    .label {
      font-family: var(--font-display);
      font-size: 25px;
      line-height: 1.1;
      color: var(--p-100);
      padding-left: 1.2em;
    }
    .desc {
      display: flex;
      gap: 0.45em;
      padding-left: 1.2em;
      font-family: var(--font-prose);
      font-size: 14px;
      color: var(--p-200);
      text-shadow: none;
    }
    .tree {
      font-family: var(--font-mono);
      color: var(--p-500);
    }
    .quote {
      margin: 1.2em 0 0;
      padding-left: 1em;
      border-left: 2px solid var(--p-300);

      blockquote {
        margin: 0;
        font-family: var(--font-prose);
        color: var(--p-100);
      }
      figcaption {
        margin-top: 0.4em;
        font-size: 12px;
      }
    }
  `,
})
export class Processes {
  protected readonly i18n = inject(I18n);
  protected readonly traits = PROFILE.traits;
  protected readonly testimonial = PROFILE.testimonial;
}
