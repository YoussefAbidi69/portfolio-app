import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { CountUpDirective } from '../../directives/count-up.directive';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, AsyncPipe, TranslateModule, ScrollRevealDirective, CountUpDirective],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
    portfolio = inject(PortfolioService);
    private translate = inject(TranslateService);

    profile$ = this.portfolio.profile$;
    techCount$ = this.portfolio.techCount$;
    projectsCount$ = this.portfolio.projectsCount$;
    certificationsCount$ = this.portfolio.certificationsCount$;

    typedSubtitle = signal('');
    terminalLineCount = signal(0);

    private typewriterTimer: ReturnType<typeof setTimeout> | null = null;
    private terminalTimer: ReturnType<typeof setTimeout> | null = null;
    private langSub?: Subscription;

    readonly terminalLineDelays = [0, 120, 240, 360, 480, 600, 720, 840, 960];

    ngOnInit(): void {
        this.startTypewriter();
        this.startTerminalAnimation();

        this.langSub = this.translate.onLangChange.subscribe(() => {
            this.typedSubtitle.set('');
            this.terminalLineCount.set(0);
            setTimeout(() => {
                this.startTypewriter();
                this.startTerminalAnimation();
            }, 100);
        });
    }

    ngOnDestroy(): void {
        if (this.typewriterTimer) clearTimeout(this.typewriterTimer);
        if (this.terminalTimer) clearTimeout(this.terminalTimer);
        this.langSub?.unsubscribe();
    }

    private startTypewriter(): void {
        if (this.typewriterTimer) clearTimeout(this.typewriterTimer);
        this.typedSubtitle.set('');

        this.translate.get('HERO.TITLE_LINE2').subscribe(full => {
            let i = 0;
            const tick = () => {
                if (i <= full.length) {
                    this.typedSubtitle.set(full.slice(0, i));
                    i++;
                    this.typewriterTimer = setTimeout(tick, 70);
                }
            };
            setTimeout(tick, 400);
        });
    }

    private startTerminalAnimation(): void {
        if (this.terminalTimer) clearTimeout(this.terminalTimer);
        this.terminalLineCount.set(0);
        const totalLines = 9;
        let count = 0;

        const step = () => {
            if (count < totalLines) {
                count++;
                this.terminalLineCount.set(count);
                this.terminalTimer = setTimeout(step, 130);
            }
        };
        setTimeout(step, 300);
    }
}
