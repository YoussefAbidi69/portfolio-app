import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackgroundComponent } from './components/background/background.component';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeroComponent, SkillsComponent, ExperienceComponent, CertificationsComponent, ProjectsComponent, ContactComponent, FooterComponent, BackgroundComponent, CustomCursorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-app';

  constructor(private translate: TranslateService) {
    translate.addLangs(['fr', 'en', 'de']);
    translate.setDefaultLang('fr');
    translate.use('fr'); // Explicitly start with French
  }
}
