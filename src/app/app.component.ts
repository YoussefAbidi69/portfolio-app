// src/app/app.component.ts
import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollProgressComponent } from './components/scroll-progress/scroll-progress.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        HeaderComponent,
        HeroComponent,
        SkillsComponent,
        ExperienceComponent,
        ProjectsComponent,
        CertificationsComponent,
        ContactComponent,
        FooterComponent,
        ScrollProgressComponent,
        BackToTopComponent
    ],
    templateUrl: './app.component.html'
})
export class AppComponent {
    private translate = inject(TranslateService);

    constructor() {
        this.translate.addLangs(['fr', 'en', 'de']);
        this.translate.setDefaultLang('fr');

        const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
        const browser = this.translate.getBrowserLang();
        const initial = saved || (browser && ['fr', 'en', 'de'].includes(browser) ? browser : 'fr');
        this.translate.use(initial);

        this.translate.onLangChange.subscribe(e => {
            if (typeof localStorage !== 'undefined') localStorage.setItem('lang', e.lang);
        });
    }
}
