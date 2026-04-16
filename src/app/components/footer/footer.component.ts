// src/app/components/footer/footer.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, AsyncPipe, TranslateModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
    private portfolio = inject(PortfolioService);
    profile$ = this.portfolio.profile$;
    year = new Date().getFullYear();
}
