import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

import { TiltDirective } from '../../directives/tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TiltDirective, ScrollRevealDirective, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.projects = this.portfolioService.getProjects();
  }
}
