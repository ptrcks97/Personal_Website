import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { I18n } from '../core/i18n';
import { PROFILE, Project } from '../data/profile';
import { Panel } from '../ui/panel';

/** Projekte als gemountete Volumes; Details öffnen sich als Fenster (<dialog>). */
@Component({
  selector: 'app-projects',
  imports: [Panel],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly i18n = inject(I18n);
  protected readonly projects = PROFILE.projects;
  protected readonly selected = signal<Project | null>(null);

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(id: string): void {
    const project = this.projects.find((p) => p.id === id);
    if (!project) return;
    this.selected.set(project);
    this.dialog().nativeElement.showModal();
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  protected onDialogClick(event: MouseEvent): void {
    // Klick auf den Backdrop schliesst das Fenster
    if (event.target === this.dialog().nativeElement) this.close();
  }

  protected index(i: number): string {
    return (i + 1).toString().padStart(2, '0');
  }
}
