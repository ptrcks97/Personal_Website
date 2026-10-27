import { Injectable, effect, signal } from '@angular/core';

const CRT_KEY = 'ps-os.crt';
const BOOT_KEY = 'ps-os.booted';

function read(storage: () => Storage, key: string): string | null {
  try {
    return storage().getItem(key);
  } catch {
    return null;
  }
}

function write(storage: () => Storage, key: string, value: string): void {
  try {
    storage().setItem(key, value);
  } catch {}
}

/** Globaler Systemzustand: Boot, CRT-Effekte, Easter-Egg-Overlay. */
@Injectable({ providedIn: 'root' })
export class SystemState {
  readonly reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  readonly crt = signal(read(() => localStorage, CRT_KEY) !== 'off');
  /** Boot-Sequenz läuft (beim ersten Besuch pro Session ausführlich, sonst kurz). */
  readonly booting = signal(true);
  readonly fastBoot = signal(this.reducedMotion || read(() => sessionStorage, BOOT_KEY) === '1');
  readonly unixMode = signal(false);
  /** Impressum-Fenster; auch per URL /#impressum direkt verlinkbar. */
  readonly legalOpen = signal(location.hash === '#impressum');

  constructor() {
    effect(() => {
      const on = this.crt();
      document.documentElement.classList.toggle('crt-off', !on);
      write(() => localStorage, CRT_KEY, on ? 'on' : 'off');
    });
  }

  finishBoot(): void {
    write(() => sessionStorage, BOOT_KEY, '1');
    this.booting.set(false);
  }

  reboot(): void {
    this.fastBoot.set(false);
    this.booting.set(true);
    window.scrollTo({ top: 0 });
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({
      behavior: this.reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }
}
