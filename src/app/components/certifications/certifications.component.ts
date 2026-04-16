// src/app/components/certifications/certifications.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';

@Component({
    selector: 'app-certifications',
    standalone: true,
    imports: [CommonModule, AsyncPipe, TranslateModule, ScrollRevealDirective, SectionHeadingComponent],
    templateUrl: './certifications.component.html',
    styleUrl: './certifications.component.css'
})
export class CertificationsComponent {
    private portfolio = inject(PortfolioService);
    certifications$ = this.portfolio.certifications$;

    statusKey(status: string): string {
        return 'CERTIFICATIONS_SECTION.STATUS.' + status.toUpperCase();
    }
}
