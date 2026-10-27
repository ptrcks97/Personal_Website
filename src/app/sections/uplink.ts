import { Component, inject, signal } from '@angular/core';
import { I18n } from '../core/i18n';
import { PROFILE } from '../data/profile';
import { Panel } from '../ui/panel';

/** Kontakt-Kanäle + Lebenslauf-Download. */
@Component({
  selector: 'app-uplink',
  imports: [Panel],
  template: `
    <app-panel
      index="07"
      [title]="i18n.tx('Uplink', 'Uplink')"
      path="/etc/contact"
      [delay]="80"
      status="ok"
      statusText="TX/RX"
    >
      <p class="lead">
        {{ i18n.tx('Offen für spannende Projekte und Gespräche – vor Ort oder remote.', 'Open to exciting projects and conversations – on-site or remote.') }}
      </p>

      <ul class="channels">
        <li>
          <span class="k dim">MAIL</span>
          <a [href]="'mailto:' + p.email">{{ p.email }}</a>
          <button type="button" class="copy" (click)="copy()" [attr.aria-label]="i18n.tx('E-Mail kopieren', 'Copy email')">
            {{ copied() ? '[✓]' : '[⧉]' }}
          </button>
        </li>
        <li>
          <span class="k dim">LNKD</span>
          <a [href]="p.linkedin" target="_blank" rel="noopener">linkedin.com/in/patrick-schöpfer ↗</a>
        </li>
        <li>
          <span class="k dim">GHUB</span>
          <a [href]="p.github" target="_blank" rel="noopener">github.com/ptrcks97 ↗</a>
        </li>
      </ul>

      <div class="cv">
        <div>
          <p class="label dim">{{ i18n.tx('LEBENSLAUF', 'RESUME') }}</p>
          <p class="file">{{ fileName }}</p>
        </div>
        @if (p.cv.available) {
          <a class="btn" [href]="p.cv.file" download>⬇ {{ i18n.tx('Download', 'Download') }}</a>
        } @else {
          <button class="btn" type="button" disabled>
            {{ i18n.tx('Upload ausstehend', 'Upload pending') }}
          </button>
        }
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
    .lead {
      margin: 0 0 1.2em;
      font-family: var(--font-display);
      font-size: 24px;
      line-height: 1.2;
      color: var(--p-100);
    }
    .channels {
      list-style: none;
      margin: 0 0 1.4em;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        gap: 0.8em;
        padding: 0.45em 0;
        border-bottom: 1px dashed var(--p-700);
        font-size: 13.5px;
        min-width: 0;
      }
      a {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .k {
        flex: none;
        width: 4ch;
        font-size: 11px;
        letter-spacing: 0.1em;
      }
    }
    .copy {
      background: none;
      border: 0;
      cursor: pointer;
      color: var(--p-400);
      padding: 0;

      &:hover {
        color: var(--p-100);
      }
    }
    .cv {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1em;
      flex-wrap: wrap;
      padding: 0.8em 1em;
      border: 1px solid var(--p-600);
      background: var(--bg);

      p {
        margin: 0;
      }
      .label {
        font-size: 11px;
        letter-spacing: 0.12em;
      }
      .file {
        font-size: 13px;
        word-break: break-all;
      }
    }
  `,
})
export class Uplink {
  protected readonly i18n = inject(I18n);
  protected readonly p = PROFILE;
  protected readonly fileName = PROFILE.cv.file.split('/').pop();
  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.p.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {}
  }
}
