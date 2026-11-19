import { Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { PROFILE } from '../data/profile';
import { Panel } from '../ui/panel';

/** Arbeitsweise als laufende Daemon-Prozesse, optional mit Referenz-Zitat. */
@Component({
  selector: 'app-processes',
  imports: [Panel],
  template: `
    <app-panel index="02" [title]="i18n.tx('Arbeitsweise', 'Work style')" path="systemctl list-units" [delay]="120">
      <ul class="units">
        @for (t of traits; track t.proc) {
          <li>
            <span class="ok">●</span>
            <span class="label">{{ i18n.t(t.label) }}</span>
            <span class="proc">{{ t.proc }}</span>
          </li>
        }
      </ul>

      @if (testimonial; as q) {
        <figure class="quote">
          <blockquote>«{{ i18n.t(q.text) }}»</blockquote>
          <figcaption>— {{ q.author }}, <span class="dim">{{ i18n.t(q.role) }}</span></figcaption>
        </figure>
      } @else {
        <p class="refs dim">{{ i18n.tx('Referenzen gebe ich gerne auf Anfrage bekannt.', 'References are available on request.') }}</p>
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
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: baseline;
        gap: 0.75em;
        padding: 0.5em 0.2em;
        border-bottom: 1px dashed var(--p-700);
      }
    }
    .ok {
      color: var(--p-300);
    }
    .label {
      font-family: var(--font-display);
      font-size: 26px;
      line-height: 1.05;
      color: var(--p-100);
    }
    .proc {
      color: var(--p-500);
      font-size: 12px;
    }
    .refs {
      margin: 1.2em 0 0;
      font-size: 13px;
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
