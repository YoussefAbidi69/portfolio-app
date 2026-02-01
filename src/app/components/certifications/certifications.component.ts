import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

import { TiltDirective } from '../../directives/tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, TiltDirective, ScrollRevealDirective, TranslateModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit {
  certifications: any[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.certifications = this.portfolioService.getCertifications();
  }
}
