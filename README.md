# Portfolio — Cloud & DevOps Engineer

Portfolio Angular 18 (standalone) avec design "Deep Tech", i18n FR/EN/DE et système de données scalable en JSON.

---

## Installation & lancement

```bash
npm install
npm start
# ouvrir http://localhost:4200
```

Build production :
```bash
npm run build
```

---

## Architecture des données (le point clé)

Toutes les données du portfolio sont dans **`src/assets/data/`** en JSON. Pour modifier le contenu, **vous n'éditez jamais le code TypeScript** — uniquement les JSON et les traductions.

```
src/assets/
├── data/
│   ├── profile.json          ← infos perso
│   ├── skills.json           ← tech stack (noms de techno = non traduits)
│   ├── experiences.json      ← expériences (textes via clés i18n)
│   ├── projects.json         ← projets (textes via clés i18n)
│   └── certifications.json   ← certifs (nom propre = non traduit)
└── i18n/
    ├── fr.json               ← traductions FR
    ├── en.json               ← traductions EN
    └── de.json               ← traductions DE
```

**Règle simple** : ce qui est un nom propre (AWS, Docker, GameMasterFX, "AWS Certified...") → un seul endroit. Ce qui est une phrase en français/anglais/allemand → clé i18n + 3 traductions.

---

## Recettes de maintenance

### Ajouter une certification

1. Ouvrir `src/assets/data/certifications.json`, ajouter un objet :
   ```json
   {
     "id": "kcna-2026",
     "name": "Kubernetes and Cloud Native Associate",
     "issuer": "CNCF",
     "date": "2026-05",
     "status": "in_progress",
     "shortCode": "K8s",
     "issuerColor": "#326CE5",
     "verifyUrl": "https://credly.com/badges/..."
   }
   ```
2. Rien d'autre à faire. Statuts possibles : `obtained` | `in_progress` | `planned`.

### Ajouter une expérience

1. Ouvrir `src/assets/data/experiences.json`, ajouter :
   ```json
   {
     "id": "ma-nouvelle-xp-2026",
     "role": "EXPERIENCES.MA_NOUVELLE_XP.ROLE",
     "company": "EXPERIENCES.MA_NOUVELLE_XP.COMPANY",
     "period": "EXPERIENCES.MA_NOUVELLE_XP.PERIOD",
     "description": "EXPERIENCES.MA_NOUVELLE_XP.DESC",
     "stack": ["Kubernetes", "Terraform", "AWS"],
     "current": true
   }
   ```
2. Dans les **3 fichiers** `fr.json`, `en.json`, `de.json`, ajouter sous `EXPERIENCES` :
   ```json
   "MA_NOUVELLE_XP": {
     "ROLE": "Cloud Engineer",
     "COMPANY": "MyCompany",
     "PERIOD": "Jan 2026 — aujourd'hui",
     "DESC": "Description…"
   }
   ```

### Ajouter un projet

Même principe dans `projects.json` + clés sous `PROJECTS` dans les i18n. Catégories : `cloud` | `devops` | `web` | `ai` | `other`.

### Ajouter une techno dans le stack

Ouvrir `skills.json`, ajouter dans le tableau `skills` de la bonne catégorie :
```json
{ "name": "Rancher", "color": "#0075A8", "level": "beginner" }
```
Les couleurs sont les couleurs de marque officielles — la carte s'adapte automatiquement.

### Modifier infos perso

Éditer `profile.json`. Le flag `available: true/false` contrôle l'affichage du badge "Open to opportunities" dans le hero.

---

## Arborescence

```
src/
├── app/
│   ├── components/
│   │   ├── header/            Navigation + burger mobile
│   │   ├── hero/              Intro + carte terminal
│   │   ├── skills/            Tech stack par catégories
│   │   ├── experience/        Timeline verticale
│   │   ├── projects/          Cartes filtrables
│   │   ├── certifications/    Badges certifs + statut
│   │   ├── contact/           CTA + email en ligne de commande
│   │   ├── footer/            Pied de page
│   │   ├── section-heading/   Réutilisable (/02, /03...)
│   │   ├── tech-badge/        Chip coloré réutilisable
│   │   ├── scroll-progress/   Barre fine en haut
│   │   ├── back-to-top/       FAB
│   │   └── language-switcher/ FR / EN / DE
│   ├── directives/
│   │   ├── scroll-reveal.directive.ts
│   │   ├── tilt.directive.ts
│   │   └── count-up.directive.ts
│   ├── models/
│   │   └── portfolio.models.ts
│   ├── services/
│   │   └── portfolio.service.ts   Charge tous les JSON
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   ├── data/                  Données JSON (voir ci-dessus)
│   ├── i18n/                  Traductions FR/EN/DE
│   └── images/                Photo de profil, etc.
├── styles.css                 Design system (tokens, fonts, utils)
├── index.html
└── main.ts
```

---

## Design system

Tokens CSS dans `styles.css` :

- **Palette** : fond `#060912` → `#0F1629`, accent principal cyan `#22D3EE` → violet `#A78BFA`
- **Fonts** : Outfit (titres), Inter (corps), JetBrains Mono (code/meta)
- **Radius** : `--radius-sm` 6px, `--radius-md` 10px, `--radius-lg` 16px
- **Ease** : `--ease-out` pour toutes les transitions

Pour changer la palette globale : éditer les variables dans `:root` de `styles.css`.

---

## Animations

- Scroll reveal sur chaque section (IntersectionObserver)
- Typewriter dans le hero (cursor `_` qui clignote)
- Count-up sur les stats (0 → valeur finale, easing cubique)
- Tilt 3D subtil sur les cartes projets (4° max, désactivé au touch)
- Pulse sur le badge "Available" + dot "in progress"
- Progress bar en haut qui suit le scroll

Tout respecte `prefers-reduced-motion`.

---

## Accessibilité

- Curseur natif conservé (pas de `cursor: none`)
- `prefers-reduced-motion` géré globalement dans `styles.css`
- Labels ARIA sur tous les boutons icônes
- Contraste AA sur tous les textes
- Navigation clavier fonctionnelle

---

## Déploiement

Le build génère `dist/portfolio-app/` — hébergeable sur GitHub Pages, Vercel, Netlify, Cloudflare Pages. Le fichier `CNAME` dans `src/` est copié automatiquement (configuré dans `angular.json`).
