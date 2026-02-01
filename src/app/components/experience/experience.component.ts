import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

import { TiltDirective } from '../../directives/tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TiltDirective, ScrollRevealDirective, TranslateModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experiences: any[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.experiences = this.portfolioService.getExperiences();
  }
}
