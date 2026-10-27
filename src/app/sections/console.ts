import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { I18n } from '../core/i18n';
import { SystemState } from '../core/system';
import { LEVEL_LABEL, PROFILE } from '../data/profile';
import { Panel } from '../ui/panel';

interface Line {
  text: string;
  kind?: 'cmd' | 'ok' | 'err' | 'dim' | 'hi' | 'warn';
  href?: string;
}

const FILES = ['about.txt', 'skills.cfg', 'career.log', 'projects/', 'contact.vcf', 'cv.pdf'];

/** Interaktive Shell mit nützlichen Befehlen und ein paar Easter Eggs. */
@Component({
  selector: 'app-console',
  imports: [Panel],
  templateUrl: './console.html',
  styleUrl: './console.scss',
})
export class Console {
  protected readonly i18n = inject(I18n);
  private readonly system = inject(SystemState);

  protected readonly lines = signal<Line[]>([]);
  protected readonly input = signal('');
  private readonly history: string[] = [];
  private historyIdx = -1;
  private magicWordCount = 0;

  private readonly screen = viewChild.required<ElementRef<HTMLElement>>('screen');
  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');

  private readonly commands: Record<string, (args: string[]) => void> = {
    help: () => this.help(),
    whoami: () => this.print([`${PROFILE.name} — ${this.i18n.t(PROFILE.role)}`, PROFILE.location]),
    about: () => this.print([this.i18n.t(PROFILE.bio)]),
    skills: () =>
      this.print(
        [...PROFILE.languages, ...PROFILE.capabilities].map(
          (s) => `${s.name.padEnd(24, '.')} ${this.i18n.t(LEVEL_LABEL[s.level])}`,
        ),
      ),
    career: () =>
      this.print(
        PROFILE.career.map(
          (e) => `${e.from} → ${(e.to ?? this.tx('heute', 'today')).padEnd(7)}  ${e.org} · ${this.i18n.t(e.role)}`,
        ),
      ),
    projects: () => {
      PROFILE.projects.forEach((p, i) => {
        const link = p.links[0];
        this.push({ text: `[${i + 1}] ${p.name.padEnd(16)} ${this.i18n.t(p.tagline)}` });
        if (link) this.push({ text: `    ↳ ${link.url}`, href: link.url, kind: 'dim' });
      });
    },
    contact: () => {
      this.push({ text: `mail     ${PROFILE.email}`, href: `mailto:${PROFILE.email}` });
      this.push({ text: `linkedin ${PROFILE.linkedin}`, href: PROFILE.linkedin });
      this.push({ text: `github   ${PROFILE.github}`, href: PROFILE.github });
    },
    cv: () => {
      if (PROFILE.cv.available) {
        this.push({ text: this.tx('Lebenslauf herunterladen ↗', 'Download resume ↗'), href: PROFILE.cv.file, kind: 'ok' });
      } else {
        this.push({ text: this.tx('cv.pdf: Upload ausstehend – bitte später erneut versuchen.', 'cv.pdf: upload pending – please try again later.'), kind: 'warn' });
      }
    },
    ls: (args) => {
      const all = args.some((a) => a.startsWith('-') && a.includes('a'));
      this.print([(all ? ['.', '..', '.secret', ...FILES] : FILES).join('  ')]);
    },
    cat: (args) => this.cat(args[0]),
    pwd: () => this.print(['/home/patrick']),
    cd: () => this.print([this.tx('Hier ist es doch schön. Bleib noch etwas.', "It's nice here. Stay a while.")], 'dim'),
    date: () => this.print([new Date().toLocaleString(this.i18n.lang() === 'de' ? 'de-CH' : 'en-GB', { timeZone: 'Europe/Zurich' })]),
    uname: () => this.print(['PS-OS 26.10 patrick-morschach x86_64 Human/Curious']),
    echo: (args) => this.print([args.join(' ')]),
    lang: (args) => {
      const l = args[0];
      if (l === 'de' || l === 'en') {
        this.i18n.lang.set(l);
        this.print([`LANG=${l}`], 'ok');
      } else {
        this.print(['usage: lang de|en'], 'err');
      }
    },
    crt: (args) => {
      const on = args[0] !== 'off';
      this.system.crt.set(on);
      this.print([`CRT ${on ? 'ON' : 'OFF'}`], 'ok');
    },
    clear: () => this.lines.set([]),
    history: () => this.print(this.history.map((h, i) => `${(i + 1).toString().padStart(4)}  ${h}`)),
    reboot: () => this.system.reboot(),
    exit: () => this.print([this.tx('Es gibt kein Entkommen. Aber es gibt einen Kontakt-Button.', "There's no escape. But there is a contact button.")], 'dim'),
    sudo: (args) => this.sudo(args),
    hire: () => this.hire(),
    woof: () => this.print(['  __      _', "o'')}____//", ' `_/      )', ' (_(_/-(_/   WOOF!'], 'warn'),
    hike: () =>
      this.print(
        [this.tx('Rucksack gepackt. Hund angeleint. Bis später! ⛰', 'Backpack packed. Dog on leash. See you later! ⛰')],
        'ok',
      ),
    impressum: () => this.legal(),
    legal: () => this.legal(),
    unix: () => this.unix(),
    fsn: () => this.unix(),
    access: (args) => this.access(args),
    rm: (args) =>
      args.join(' ').includes('-rf')
        ? this.print([this.tx('Netter Versuch. 😉', 'Nice try. 😉')], 'warn')
        : this.print(['rm: missing operand'], 'err'),
  };

  constructor() {
    this.print([
      'PS-OS 26.10 tty1',
      this.tx("Tippe 'help' für eine Liste der Befehle.", "Type 'help' for a list of commands."),
    ], 'dim');
  }

  private tx(de: string, en: string): string {
    return this.i18n.tx(de, en);
  }

  private push(line: Line): void {
    this.lines.update((l) => [...l, line]);
  }

  private print(texts: string[], kind?: Line['kind']): void {
    this.lines.update((l) => [...l, ...texts.map((text) => ({ text, kind }))]);
  }

  private help(): void {
    const rows: [string, string, string][] = [
      ['whoami', 'Wer bin ich?', 'Who am I?'],
      ['about', 'Kurzprofil', 'Short bio'],
      ['skills', 'Fähigkeiten', 'Skills'],
      ['career', 'Werdegang', 'Career'],
      ['projects', 'Projekte', 'Projects'],
      ['contact', 'Kontaktdaten', 'Contact details'],
      ['cv', 'Lebenslauf', 'Resume'],
      ['lang de|en', 'Sprache wechseln', 'Switch language'],
      ['crt on|off', 'CRT-Effekte', 'CRT effects'],
      ['ls, cat, pwd, date', 'Die üblichen Verdächtigen', 'The usual suspects'],
      ['clear, reboot', 'Aufräumen / Neustart', 'Clean up / restart'],
      ['impressum', 'Impressum & Datenschutz', 'Legal notice & privacy'],
    ];
    this.print(rows.map(([c, de, en]) => `  ${c.padEnd(20)} ${this.tx(de, en)}`));
    this.print([this.tx('  ... und ein paar versteckte. Tipp: ls -a', '  ... and a few hidden ones. Hint: ls -a')], 'dim');
  }

  private cat(file?: string): void {
    switch (file) {
      case 'about.txt':
        return this.commands['about']([]);
      case 'skills.cfg':
        return this.commands['skills']([]);
      case 'career.log':
        return this.commands['career']([]);
      case 'contact.vcf':
        return this.commands['contact']([]);
      case 'cv.pdf':
        return this.commands['cv']([]);
      case '.secret':
        return this.print(
          [
            this.tx('Wenn du dieses System erkennst, weisst du, was zu tun ist.', 'If you recognise this system, you know what to do.'),
            '> "It\'s a ____ system! I know this!"',
          ],
          'warn',
        );
      case 'projects/':
      case 'projects':
        return this.print([`cat: ${file}: Is a directory`], 'err');
      case undefined:
        return this.print(['usage: cat <file>'], 'err');
      default:
        return this.print([`cat: ${file}: No such file or directory`], 'err');
    }
  }

  private sudo(args: string[]): void {
    const rest = args.join(' ');
    if (/hire\s+patrick/i.test(rest)) return this.hire();
    this.print(
      [
        this.tx(`[sudo] Passwort für guest: `, `[sudo] password for guest: `),
        this.tx(
          'guest ist nicht in der sudoers-Datei. Dieser Vorfall wird gemeldet.',
          'guest is not in the sudoers file. This incident will be reported.',
        ),
      ],
      'err',
    );
  }

  private hire(): void {
    this.print([this.tx('Berechtigung erteilt. Öffne Kommunikationskanal …', 'Permission granted. Opening communication channel …')], 'ok');
    const subject = encodeURIComponent(this.tx('Jobanfrage über PS-OS', 'Job inquiry via PS-OS'));
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}`;
  }

  private legal(): void {
    this.print(['cat /etc/legal'], 'dim');
    this.system.legalOpen.set(true);
  }

  private unix(): void {
    this.print(["It's a UNIX system! I know this!"], 'hi');
    setTimeout(() => this.system.unixMode.set(true), 400);
  }

  private access(args: string[]): void {
    const what = args.join(' ').toLowerCase();
    if (!what) return this.print(['access: PERMISSION DENIED.'], 'err');
    this.magicWordCount++;
    this.print([`access: ${what}: PERMISSION DENIED.`], 'err');
    if (this.magicWordCount >= 3) {
      this.print(Array(6).fill("YOU DIDN'T SAY THE MAGIC WORD!"), 'warn');
      this.magicWordCount = 0;
    }
  }

  protected run(): void {
    const raw = this.input().trim();
    this.input.set('');
    this.historyIdx = -1;
    this.push({ text: `guest@ps-os:~$ ${raw}`, kind: 'cmd' });
    if (raw) {
      this.history.push(raw);
      const [cmd, ...args] = raw.split(/\s+/);
      const handler = this.commands[cmd.toLowerCase()];
      if (handler) handler(args);
      else this.print([`${cmd}: command not found. ${this.tx("Versuch's mit 'help'.", "Try 'help'.")}`], 'err');
    }
    queueMicrotask(() => setTimeout(() => this.scrollToEnd()));
  }

  protected onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!this.history.length) return;
      event.preventDefault();
      if (event.key === 'ArrowUp') {
        this.historyIdx = this.historyIdx < 0 ? this.history.length - 1 : Math.max(0, this.historyIdx - 1);
      } else {
        this.historyIdx = this.historyIdx < 0 ? -1 : this.historyIdx + 1;
        if (this.historyIdx >= this.history.length) this.historyIdx = -1;
      }
      this.input.set(this.historyIdx < 0 ? '' : this.history[this.historyIdx]);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const value = this.input();
      const match = Object.keys(this.commands).filter((c) => c.startsWith(value.toLowerCase()));
      if (value && match.length === 1) this.input.set(match[0] + ' ');
      else if (value && match.length > 1) this.print([match.join('  ')], 'dim');
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      this.lines.set([]);
    }
  }

  protected focus(): void {
    if (!window.getSelection()?.toString()) this.field().nativeElement.focus({ preventScroll: true });
  }

  private scrollToEnd(): void {
    const el = this.screen().nativeElement;
    el.scrollTop = el.scrollHeight;
  }
}
