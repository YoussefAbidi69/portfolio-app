// src/app/components/projects/projects.component.ts
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TiltDirective } from '../../directives/tilt.directive';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { TechBadgeComponent } from '../tech-badge/tech-badge.component';
import { Project } from '../../models/portfolio.models';
import { toSignal } from '@angular/core/rxjs-interop';

type Filter = 'all' | 'cloud' | 'devops' | 'web' | 'ai' | 'other';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, TranslateModule, ScrollRevealDirective, TiltDirective, SectionHeadingComponent, TechBadgeComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css'
})
export class ProjectsComponent {
    private portfolio = inject(PortfolioService);

    filters: { key: Filter; i18n: string }[] = [
        { key: 'all',    i18n: 'PROJECTS_SECTION.FILTER.ALL' },
        { key: 'cloud',  i18n: 'PROJECTS_SECTION.FILTER.CLOUD' },
        { key: 'devops', i18n: 'PROJECTS_SECTION.FILTER.DEVOPS' },
        { key: 'web',    i18n: 'PROJECTS_SECTION.FILTER.WEB' },
        { key: 'ai',     i18n: 'PROJECTS_SECTION.FILTER.AI' },
        { key: 'other',  i18n: 'PROJECTS_SECTION.FILTER.OTHER' }
    ];

    active = signal<Filter>('all');

    private allProjects = toSignal(this.portfolio.projects$, { initialValue: [] as Project[] });

    visible = computed(() => {
        const list = this.allProjects();
        const f = this.active();
        return f === 'all' ? list : list.filter(p => p.category === f);
    });

    setFilter(f: Filter): void {
        this.active.set(f);
    }

    trackId(_i: number, p: Project): string {
        return p.id;
    }
}
