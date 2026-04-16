// src/app/components/header/header.component.ts
import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, TranslateModule, LanguageSwitcherComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    isMenuOpen = signal(false);
    isScrolled = signal(false);

    toggleMenu(): void {
        this.isMenuOpen.update(v => !v);
    }

    closeMenu(): void {
        this.isMenuOpen.set(false);
    }

    @HostListener('window:scroll')
    onScroll(): void {
        this.isScrolled.set(window.scrollY > 20);
    }
}
