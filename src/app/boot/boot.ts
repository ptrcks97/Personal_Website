import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { SystemState } from '../core/system';
import { I18n } from '../core/i18n';

interface BootLine {
  text: string;
  status?: 'ok' | 'info';
}

const SCRIPT: { text: string; status?: 'ok' | 'info'; delay: number }[] = [
  { text: 'PS-BIOS 2.6.10   (C) 1997-2026 Schöpfer Systems', delay: 120 },
  { text: 'CPU0: Homo sapiens · curious edition · multithreaded', delay: 160 },
  { text: '__MEMTEST__', delay: 0 },
  { text: 'Detecting peripherals ...', delay: 220 },
  { text: '  /dev/keyboard0 ..................', status: 'ok', delay: 110 },
  { text: '  /dev/hiking-boots ...............', status: 'ok', delay: 110 },
  { text: '  /dev/dog0 ....................... (good dog)', status: 'ok', delay: 140 },
  { text: 'Mounting /home/patrick ............', status: 'ok', delay: 200 },
  { text: 'Loading kernel: ai-software-engineer-2026.09', status: 'info', delay: 260 },
  { text: 'Started friendliness.service', status: 'ok', delay: 90 },
  { text: 'Started ambition.service', status: 'ok', delay: 90 },
  { text: 'Started helpfulness.service', status: 'ok', delay: 90 },
  { text: 'Started diligence.service', status: 'ok', delay: 90 },
  { text: 'Reached target: dashboard.target', status: 'ok', delay: 240 },
];

@Component({
  selector: 'app-boot',
  templateUrl: './boot.html',
  styleUrl: './boot.scss',
  host: {
    '(document:keydown)': 'skip()',
    '(click)': 'skip()',
    role: 'dialog',
    'aria-label': 'Boot sequence',
  },
})
export class Boot implements OnInit, OnDestroy {
  private readonly system = inject(SystemState);
  protected readonly i18n = inject(I18n);

  protected readonly lines = signal<BootLine[]>([]);
  protected readonly mem = signal(0);
  protected readonly done = signal(false);
  protected readonly leaving = signal(false);

  private cancelled = false;
  private timers: ReturnType<typeof setTimeout>[] = [];

  ngOnInit(): void {
    if (this.system.fastBoot()) {
      this.system.finishBoot();
      return;
    }
    this.run();
  }

  ngOnDestroy(): void {
    this.cancelled = true;
    this.timers.forEach(clearTimeout);
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => this.timers.push(setTimeout(resolve, ms)));
  }

  private async run(): Promise<void> {
    await this.wait(350);
    for (const step of SCRIPT) {
      if (this.cancelled) return;
      if (step.text === '__MEMTEST__') {
        this.lines.update((l) => [...l, { text: step.text }]);
        for (let kb = 0; kb <= 65536; kb += 4096) {
          if (this.cancelled) return;
          this.mem.set(kb);
          await this.wait(28);
        }
        continue;
      }
      await this.wait(step.delay);
      this.lines.update((l) => [...l, { text: step.text, status: step.status }]);
    }
    await this.wait(300);
    this.done.set(true);
    await this.wait(1600);
    this.skip();
  }

  protected skip(): void {
    if (this.cancelled) return;
    this.cancelled = true;
    this.timers.forEach(clearTimeout);
    this.leaving.set(true);
    setTimeout(() => this.system.finishBoot(), 420);
  }
}
