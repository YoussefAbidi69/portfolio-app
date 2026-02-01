import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

import { TiltDirective } from '../../directives/tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TiltDirective, ScrollRevealDirective, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skillCategories: any[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.skillCategories = this.portfolioService.getSkills();
  }
}
