// src/app/components/language-switcher/language-switcher.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-language-switcher',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="lang">
            <button
                *ngFor="let l of langs"
                class="lang-btn"
                [class.active]="current() === l"
                (click)="switch(l)"
                [attr.aria-label]="'Switch to ' + l">
                {{ l.toUpperCase() }}
            </button>
        </div>
    `,
    styles: [`
        .lang {
            display: flex;
            gap: 4px;
            font-family: var(--font-mono);
        }
        .lang-btn {
            background: none;
            border: none;
            color: var(--text-faint);
            font-size: 0.7rem;
            padding: 4px 6px;
            cursor: pointer;
            font-family: inherit;
            transition: color 0.2s;
        }
        .lang-btn:hover { color: var(--text-primary); }
        .lang-btn.active { color: var(--accent-primary); }
    `]
})
export class LanguageSwitcherComponent {
    private translate = inject(TranslateService);
    langs = ['fr', 'en', 'de'];
    current = signal(this.translate.currentLang || this.translate.defaultLang || 'fr');

    switch(l: string): void {
        this.translate.use(l);
        this.current.set(l);
    }
}
