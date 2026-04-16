// src/app/components/skills/skills.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { TechBadgeComponent } from '../tech-badge/tech-badge.component';
import { TranslateService } from '@ngx-translate/core';
import { map, combineLatest } from 'rxjs';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, AsyncPipe, TranslateModule, ScrollRevealDirective, SectionHeadingComponent, TechBadgeComponent],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.css'
})
export class SkillsComponent {
    private portfolio = inject(PortfolioService);
    private translate = inject(TranslateService);

    skills$ = this.portfolio.skills$;

    meta$ = combineLatest([this.portfolio.skills$, this.translate.get('SKILLS.META')]).pipe(
        map(([skills, metaTpl]) => {
            const count = skills.reduce((a, c) => a + c.skills.length, 0);
            return `${count} ${metaTpl}`.replace('·', `· ${skills.length}`);
        })
    );

    iconPaths: Record<string, string> = {
        cloud:     'M17.5 19a2.5 2.5 0 0 0 0-5h-11a2.5 2.5 0 0 0 0 5h11ZM12 14a6 6 0 1 1 6-6',
        code:      'M16 18l6-6-6-6 M8 6l-6 6 6 6',
        container: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
        pipeline:  'M4 6h6a3 3 0 013 3v6a3 3 0 003 3h4 M4 12h8',
        activity:  'M22 12h-4l-3 9L9 3l-3 9H2',
        terminal:  'M4 17l6-6-6-6 M12 19h8'
    };
}
