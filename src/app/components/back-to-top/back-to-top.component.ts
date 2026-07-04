// src/app/components/back-to-top/back-to-top.component.ts
import { Component, HostListener, signal } from '@angular/core';

@Component({
    selector: 'app-back-to-top',
    standalone: true,
    template: `
        <button class="fab" [class.visible]="visible()" (click)="scrollTop()" aria-label="Back to top">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </button>
    `,
    styles: [`
        .fab {
            position: fixed;
            bottom: 24px; right: 24px;
            width: 42px; height: 42px;
            border-radius: 50%;
            background: var(--bg-glass-strong);
            backdrop-filter: blur(10px);
            border: 0.5px solid var(--border-default);
            color: var(--accent-primary);
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s var(--ease-out);
            display: flex; align-items: center; justify-content: center;
            z-index: 900;
        }
        .fab.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .fab:hover {
            border-color: var(--accent-primary);
            box-shadow: 0 0 20px var(--accent-primary-glow);
        }
    `]
})
export class BackToTopComponent {
    visible = signal(false);

    @HostListener('window:scroll')
    onScroll(): void {
        this.visible.set(window.scrollY > 500);
    }

    scrollTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
