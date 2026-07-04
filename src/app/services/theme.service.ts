import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    isDark = signal(true);

    constructor() {
        const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
        const prefersDark = typeof window !== 'undefined'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
            : true;
        const dark = saved ? saved === 'dark' : prefersDark;
        this.isDark.set(dark);
        this.apply(dark);
    }

    toggle(): void {
        const next = !this.isDark();
        this.isDark.set(next);
        this.apply(next);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('theme', next ? 'dark' : 'light');
        }
    }

    private apply(dark: boolean): void {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }
}
