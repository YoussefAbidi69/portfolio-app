// src/app/components/tech-badge/tech-badge.component.ts
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tech-badge',
    standalone: true,
    template: `
        <span class="badge" [style.--brand]="color">
            {{ name }}
        </span>
    `,
    styles: [`
        .badge {
            display: inline-block;
            background: color-mix(in srgb, var(--brand, var(--accent-primary)) 10%, transparent);
            border: 0.5px solid color-mix(in srgb, var(--brand, var(--accent-primary)) 25%, transparent);
            color: var(--brand, var(--accent-primary));
            font-size: 0.7rem;
            padding: 3px 9px;
            border-radius: var(--radius-sm);
            font-family: var(--font-mono);
            font-weight: 500;
            white-space: nowrap;
        }
    `]
})
export class TechBadgeComponent {
    @Input() name = '';
    @Input() color?: string;
}
