import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { LoadingComponent } from './components/loading/loading.component';
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
        CommonModule,
        LoadingComponent,
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
    loaded = signal(false);

    constructor() {
        this.translate.addLangs(['en', 'fr', 'de']);
        this.translate.setDefaultLang('en');

        const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
        const browser = this.translate.getBrowserLang();
        const initial = saved || (browser && ['en', 'fr', 'de'].includes(browser) ? browser : 'en');
        this.translate.use(initial);

        this.translate.onLangChange.subscribe(e => {
            if (typeof localStorage !== 'undefined') localStorage.setItem('lang', e.lang);
        });
    }
}
