// src/app/models/portfolio.models.ts
// Shared types for all portfolio data.

export interface Profile {
    name: string;
    role: string;
    tagline: string;
    location: string;
    email: string;
    available: boolean;
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    };
    cvUrl: string;
}

export interface SkillCategory {
    id: string;
    title: string;           // I18n key, e.g. "SKILLS.CATEGORIES.CLOUD"
    icon: string;            // Icon name from the shared set
    accent: 'cyan' | 'violet' | 'green' | 'amber';
    skills: Skill[];
}

export interface Skill {
    name: string;            // Tech name (not translated)
    color?: string;          // Optional brand color hex
    level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Experience {
    id: string;
    role: string;            // I18n key
    company: string;         // I18n key
    companyUrl?: string;
    period: string;          // I18n key
    description: string;     // I18n key
    stack: string[];         // Tech names (not translated)
    links?: {
        github?: string;
        demo?: string;
    };
    current?: boolean;
}

export interface Project {
    id: string;
    title: string;           // I18n key
    description: string;     // I18n key
    category: 'cloud' | 'devops' | 'web' | 'ai' | 'other';
    stack: string[];
    links: {
        github?: string;
        demo?: string;
    };
    image?: string;
    featured?: boolean;
    date: string;            // ISO YYYY-MM
}

export interface Certification {
    id: string;
    name: string;            // Not translated (proper name)
    issuer: string;          // Not translated
    date: string;            // ISO YYYY-MM
    status: 'obtained' | 'in_progress' | 'planned';
    badgeUrl?: string;
    verifyUrl?: string;
    issuerColor?: string;    // For icon bg
    shortCode?: string;      // 2-3 letters displayed in the badge
}

export interface Education {
    id: string;
    degree: string;          // I18n key
    school: string;          // I18n key
    period: string;          // I18n key
    description?: string;    // I18n key
}
