// src/app/components/section-heading/section-heading.component.ts
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-section-heading',
    standalone: true,
    template: `
        <div class="section-head">
            <span class="num">{{ num }}</span>
            <h2 class="title">{{ title }}</h2>
            <div class="divider"></div>
            <span class="meta" *ngIf="meta">{{ meta }}</span>
        </div>
    `
})
export class SectionHeadingComponent {
    @Input() num = '/00';
    @Input() title = '';
    @Input() meta?: string;
}
