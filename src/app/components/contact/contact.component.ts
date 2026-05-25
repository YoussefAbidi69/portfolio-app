// src/app/components/contact/contact.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, AsyncPipe, TranslateModule, ScrollRevealDirective, SectionHeadingComponent],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css'
})
export class ContactComponent {
    private portfolio = inject(PortfolioService);
    profile$ = this.portfolio.profile$;
}
