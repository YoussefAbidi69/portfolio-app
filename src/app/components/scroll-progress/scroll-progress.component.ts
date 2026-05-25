// src/app/components/scroll-progress/scroll-progress.component.ts
import { Component, HostListener, signal } from '@angular/core';

@Component({
    selector: 'app-scroll-progress',
    standalone: true,
    template: `<div class="bar" [style.width.%]="progress()"></div>`,
    styles: [`
        :host {
            position: fixed;
            top: 0; left: 0; right: 0;
            height: 2px;
            z-index: 1000;
            pointer-events: none;
        }
        .bar {
            height: 100%;
            background: var(--accent-gradient);
            width: 0;
            transition: width 80ms linear;
            box-shadow: 0 0 8px var(--accent-primary-glow);
        }
    `]
})
export class ScrollProgressComponent {
    progress = signal(0);

    @HostListener('window:scroll')
    onScroll(): void {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        this.progress.set(max > 0 ? (h.scrollTop / max) * 100 : 0);
    }
}
