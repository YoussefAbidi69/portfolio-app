// src/app/components/experience/experience.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { TechBadgeComponent } from '../tech-badge/tech-badge.component';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule, AsyncPipe, TranslateModule, ScrollRevealDirective, SectionHeadingComponent, TechBadgeComponent],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.css'
})
export class ExperienceComponent {
    private portfolio = inject(PortfolioService);
    experiences$ = this.portfolio.experiences$;
}
