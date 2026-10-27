import { Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SystemState } from '../core/system';
import { PROFILE } from '../data/profile';
import { Panel } from '../ui/panel';

@Component({
  selector: 'app-ident',
  imports: [Panel],
  template: `
    <app-panel index="01" [title]="i18n.tx('Identifikation', 'Identification')" path="/home/patrick/whoami" [delay]="0">
      <div class="grid">
        <figure class="photo" tabindex="0" [attr.aria-label]="p.name">
          <img [src]="p.photo" [alt]="i18n.tx('Pixel-Art-Porträt von ', 'Pixel art portrait of ') + p.name" width="460" height="460" />
          <span class="scan"></span>
          <figcaption>
            <span>SUBJ-0001</span>
            <span class="dim">{{ i18n.tx('HOVER = FARBE', 'HOVER = COLOR') }}</span>
          </figcaption>
        </figure>

        <div class="info">
          <p class="prompt dim">patrick&#64;ps-os:~$ whoami</p>
          <h1 class="name">{{ p.name }}</h1>
          <p class="role">&gt; {{ i18n.t(p.role) }}<span class="cursor"></span></p>

          <dl class="kv">
            <dt>{{ i18n.tx('STANDORT', 'BASE') }}</dt>
            <dd>{{ p.location }}</dd>
            <dt>{{ i18n.tx('EINSATZ', 'MODE') }}</dt>
            <dd>
              <span class="ok">[✓]</span> {{ i18n.tx('Vor Ort', 'On-site') }}
              &nbsp;<span class="ok">[✓]</span> Remote
            </dd>
            <dt>{{ i18n.tx('AKTUELL', 'CURRENT') }}</dt>
            <dd>AI Software Engineer &#64; Finnova Bankware AG</dd>
            <dt>{{ i18n.tx('AUSBILDUNG', 'EDUCATION') }}</dt>
            <dd>BSc Computer Science · HSLU</dd>
          </dl>
        </div>
      </div>

      <p class="bio">{{ i18n.t(p.bio) }}</p>

      <div class="actions">
        <button class="btn" type="button" (click)="system.scrollTo('uplink')">
          ▶ {{ i18n.tx('Kontakt aufnehmen', 'Get in touch') }}
        </button>
        <button class="btn" type="button" (click)="system.scrollTo('projects')">
          ▶ {{ i18n.tx('Projekte ansehen', 'View projects') }}
        </button>
      </div>
    </app-panel>
  `,
  styles: `
    :host {
      display: block;
    }
    app-panel {
      height: 100%;
    }
    .grid {
      display: grid;
      grid-template-columns: minmax(140px, 220px) 1fr;
      gap: clamp(16px, 2.5vw, 28px);
      align-items: start;
    }
    .photo {
      position: relative;
      margin: 0;
      border: 1px solid var(--p-500);
      padding: 6px;
      background: var(--bg);
      outline: none;

      img {
        display: block;
        width: 100%;
        height: auto;
        image-rendering: pixelated;
        filter: grayscale(1) sepia(1) hue-rotate(68deg) saturate(3.2) brightness(0.85) contrast(1.15);
        transition: filter 0.25s steps(4);
      }
      .scan {
        position: absolute;
        inset: 6px 6px 30px;
        pointer-events: none;
        background: repeating-linear-gradient(to bottom, transparent 0 2px, rgba(0, 0, 0, 0.35) 3px);
        transition: opacity 0.25s;
      }
      &:hover img,
      &:focus-visible img {
        filter: none;
      }
      &:hover .scan,
      &:focus-visible .scan {
        opacity: 0.3;
      }
      figcaption {
        display: flex;
        justify-content: space-between;
        padding-top: 6px;
        font-size: 11px;
        letter-spacing: 0.08em;
      }
    }
    .prompt {
      margin: 0;
      font-size: 13px;
    }
    .name {
      font-size: clamp(40px, 5.2vw, 68px);
      line-height: 0.95;
      margin: 0.1em 0 0.15em;
      text-shadow: var(--glow-strong);
    }
    .role {
      margin: 0 0 1em;
      font-family: var(--font-display);
      font-size: clamp(22px, 2.4vw, 28px);
      color: var(--p-300);
    }
    .kv {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.25em 1em;
      margin: 0;
      font-size: 13.5px;

      dt {
        color: var(--p-500);
        letter-spacing: 0.08em;
      }
      dd {
        margin: 0;
      }
      .ok {
        color: var(--p-300);
      }
    }
    .bio {
      margin: 1.4em 0 1.2em;
      padding-left: 1em;
      border-left: 2px solid var(--p-500);
      max-width: 70ch;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75em;
    }
    @media (max-width: 560px) {
      .grid {
        grid-template-columns: 1fr;
      }
      .photo {
        max-width: 240px;
      }
    }
  `,
})
export class Ident {
  protected readonly i18n = inject(I18n);
  protected readonly system = inject(SystemState);
  protected readonly p = PROFILE;
}
