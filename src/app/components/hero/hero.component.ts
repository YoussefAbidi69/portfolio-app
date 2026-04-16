// src/app/components/hero/hero.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { CountUpDirective } from '../../directives/count-up.directive';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, AsyncPipe, TranslateModule, ScrollRevealDirective, CountUpDirective],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
    portfolio = inject(PortfolioService);

    profile$ = this.portfolio.profile$;
    techCount$ = this.portfolio.techCount$;
    projectsCount$ = this.portfolio.projectsCount$;
    certificationsCount$ = this.portfolio.certificationsCount$;

    ngOnInit(): void {}
}
