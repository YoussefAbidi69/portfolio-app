import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, AfterViewInit {
  technosCount: number = 0;
  projectsCount: number = 0;
  certificationsCount: number = 0;

  // Typewriter properties
  displayHalo: string = '';
  displayName: string = '';
  fullHalo: string = '';
  fullName: string = 'Youssef ABIDI';
  isTyping: boolean = false;

  // Canvas properties
  // Canvas properties removed

  constructor(
    private portfolioService: PortfolioService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.technosCount = this.portfolioService.getSkillsCount();
    this.projectsCount = this.portfolioService.getProjectsCount();
    this.certificationsCount = this.portfolioService.getCertificationsCount();

    // Set initial greeting text
    this.translate.get('HERO.GREETING').subscribe((text: string) => {
      this.fullHalo = text;
    });

    // Subscribe to language changes
    this.translate.onLangChange.subscribe(() => {
      this.translate.get('HERO.GREETING').subscribe((text: string) => {
        this.fullHalo = text;
        // Reset and restart animation when language changes
        this.displayHalo = '';
        this.displayName = '';
        if (isPlatformBrowser(this.platformId)) {
          this.startTypingAnimation();
        }
      });
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingAnimation();
    }
  }

  // --- Typewriter Effect ---
  async startTypingAnimation() {
    this.isTyping = true;

    // Type "Salut, je suis"
    await this.typeText(this.fullHalo, (str) => this.displayHalo = str);

    this.isTyping = false;
    // Sleep logic (pause)
    await new Promise(resolve => setTimeout(resolve, 500));
    this.isTyping = true;

    // Type "Youssef ABIDI"
    await this.typeText(this.fullName, (str) => this.displayName = str);

    this.isTyping = false;
  }

  typeText(text: string, callback: (str: string) => void): Promise<void> {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          callback(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 100); // Typing speed
    });
  }


  // --- Background Animation (Global) ---
}

