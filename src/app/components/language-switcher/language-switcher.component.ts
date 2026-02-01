import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent {
  languages = [
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'de', label: 'DE', flag: '🇩🇪' }
  ];

  currentLang = 'fr';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'fr';
  }

  changeLanguage(langCode: string) {
    this.translate.use(langCode);
    this.currentLang = langCode;
  }
}
