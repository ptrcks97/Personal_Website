import { Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { LEVEL_LABEL, LEVEL_VALUE, PROFILE, Skill } from '../data/profile';
import { Panel } from '../ui/panel';

const SEGMENTS = 20;

/** Skills als Ressourcen-Monitor mit segmentierten Balken. */
@Component({
  selector: 'app-skills',
  imports: [Panel],
  template: `
    <app-panel index="04" [title]="i18n.tx('Ressourcen', 'Resources')" path="/proc/skills" [delay]="80">
      <div class="cols">
        @for (group of groups; track group.key) {
          <section>
            <h3>
              <span class="dim">[</span>{{ i18n.t(group.title) }}<span class="dim">]</span>
            </h3>
            <ul>
              @for (s of group.items; track s.name; let i = $index) {
                <li [attr.aria-label]="s.name + ': ' + i18n.t(levelLabel[s.level])">
                  <span class="name">{{ s.name }}</span>
                  <span class="lvl" [class.expert]="s.level === 'expert'">{{ i18n.t(levelLabel[s.level]) }}</span>
                  <span class="bar" aria-hidden="true">
                    @for (seg of segments; track seg) {
                      <i [class.on]="seg < levelValue[s.level]" [style.animation-delay.ms]="300 + i * 60 + seg * 22"></i>
                    }
                  </span>
                </li>
              }
            </ul>
          </section>
        }
      </div>
      <p class="legend dim">
        ▮ {{ i18n.tx('Selbsteinschätzung', 'Self-assessment') }} ·
        GRUNDLAGEN/FOUNDATION → SICHER/PROFICIENT → EXPERTE/EXPERT
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
    .cols {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5em 2em;
    }
    h3 {
      font-size: 22px;
      margin-bottom: 0.4em;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.15em 0.75em;
      padding: 0.35em 0;
      font-size: 13.5px;
    }
    .name {
      color: var(--p-100);
    }
    .lvl {
      font-size: 11px;
      letter-spacing: 0.1em;
      color: var(--p-500);
      align-self: center;

      &.expert {
        color: var(--bg);
        background: var(--p-300);
        padding: 0 0.4em;
        text-shadow: none;
      }
    }
    .bar {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      gap: 2px;
      height: 9px;

      i {
        background: var(--p-700);
      }
      i.on {
        background: var(--p-300);
        box-shadow: 0 0 5px rgba(57, 255, 106, 0.6);
        animation: seg-on 0.12s steps(1) both;
      }
    }
    .legend {
      margin: 1.2em 0 0;
      font-size: 11px;
      letter-spacing: 0.06em;
    }
    @keyframes seg-on {
      from {
        background: var(--p-700);
        box-shadow: none;
      }
    }
  `,
})
export class Skills {
  protected readonly i18n = inject(I18n);
  protected readonly levelLabel = LEVEL_LABEL;
  protected readonly levelValue = LEVEL_VALUE;
  protected readonly segments = Array.from({ length: SEGMENTS }, (_, i) => i);

  protected readonly groups: { key: string; title: { de: string; en: string }; items: Skill[] }[] = [
    { key: 'lang', title: { de: 'Sprachen & Frameworks', en: 'Languages & frameworks' }, items: PROFILE.languages },
    { key: 'cap', title: { de: 'Fähigkeiten', en: 'Capabilities' }, items: PROFILE.capabilities },
  ];
}
