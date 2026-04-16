// src/app/services/portfolio.service.ts
// Loads all portfolio data from /assets/data/*.json.
// Adding/editing a project, certification or experience means editing ONE json file.

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';
import {
    Profile,
    SkillCategory,
    Experience,
    Project,
    Certification
} from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
    private http = inject(HttpClient);
    private base = 'assets/data';

    // Cached observables (shareReplay avoids repeated HTTP requests).
    readonly profile$: Observable<Profile> =
        this.http.get<Profile>(`${this.base}/profile.json`).pipe(shareReplay(1));

    readonly skills$: Observable<SkillCategory[]> =
        this.http.get<SkillCategory[]>(`${this.base}/skills.json`).pipe(shareReplay(1));

    readonly experiences$: Observable<Experience[]> =
        this.http.get<Experience[]>(`${this.base}/experiences.json`).pipe(shareReplay(1));

    readonly projects$: Observable<Project[]> =
        this.http.get<Project[]>(`${this.base}/projects.json`).pipe(shareReplay(1));

    readonly certifications$: Observable<Certification[]> =
        this.http.get<Certification[]>(`${this.base}/certifications.json`).pipe(shareReplay(1));

    // Computed stats for the hero section.
    readonly techCount$: Observable<number> = this.skills$.pipe(
        map(cats => cats.reduce((acc, c) => acc + c.skills.length, 0))
    );

    readonly projectsCount$: Observable<number> = this.projects$.pipe(
        map(list => list.length)
    );

    readonly certificationsCount$: Observable<number> = this.certifications$.pipe(
        map(list => list.filter(c => c.status === 'obtained' || c.status === 'in_progress').length)
    );
}
