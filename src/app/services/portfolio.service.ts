import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {

    constructor() { }

    // --- DATA ---

    private skillCategories = [
        /*
        {
            title: 'Cloud Platforms',
            icon: '☁️',
            skills: ['AWS (EC2, S3, RDS)', 'Microsoft Azure', 'Google Cloud Platform']
        },
        
        {
            title: 'DevOps & Containers',
            icon: '🚢',
            skills: ['Docker', 'Kubernetes', 'CI/CD (GitLab, Jenkins)', 'ArgoCD']
        },*/
        {
            title: 'SKILLS.S0',
            icon: '⚙️',
            skills: ['Terraform', 'Ansible', 'CloudFormation', 'Bicep']
        },

        {
            title: 'SKILLS.S1', // Key
            icon: '🐧',
            skills: ['Linux Administration', 'Bash Scripting', 'Python', 'Networking']
        }
    ];

    private projects = [
        {
            title: 'PROJECTS.LIST.0.TITLE',
            description: 'PROJECTS.LIST.0.DESC',
            tags: ['HTML', 'CSS', 'JavaScript', 'Git', 'Symfony 6', 'JavaFx'],
            link: 'https://github.com/YoussefAbidi69/GameMasterFX'
        },
        {
            title: 'PROJECTS.LIST.1.TITLE',
            description: 'PROJECTS.LIST.1.DESC',
            tags: ['C++', 'Qt', 'Git', 'Arduino'],
            link: 'https://github.com/YoussefAbidi69/Integraation_QT'
        },
        {
            title: 'PROJECTS.LIST.2.TITLE',
            description: 'PROJECTS.LIST.2.DESC',
            tags: ['HTML', 'CSS', 'JavaScript', 'Git', 'PHP'],
            link: '#'
        }
    ];

    private experiences = [
        {
            role: 'EXPERIENCE.LIST.0.ROLE',
            company: 'EXPERIENCE.LIST.0.COMPANY',
            period: 'EXPERIENCE.LIST.0.PERIOD',
            description: 'EXPERIENCE.LIST.0.DESC'
        }
    ];

    private certifications = [
        {
            name: 'CERTIFICATIONS.LIST.0.NAME',
            issuer: 'CERTIFICATIONS.LIST.0.ISSUER',
            date: 'CERTIFICATIONS.LIST.0.DATE',
            icon: 'aws-icon'
        },
        {
            name: 'CERTIFICATIONS.LIST.1.NAME',
            issuer: 'CERTIFICATIONS.LIST.1.ISSUER',
            date: 'CERTIFICATIONS.LIST.1.DATE',
            icon: 'azure-icon'
        },
        {
            name: 'CERTIFICATIONS.LIST.2.NAME',
            issuer: 'CERTIFICATIONS.LIST.2.ISSUER',
            date: 'CERTIFICATIONS.LIST.2.DATE',
            icon: 'terraform-icon'
        }
    ];

    // --- GETTERS ---

    getSkills() {
        return this.skillCategories;
    }

    getProjects() {
        return this.projects;
    }

    getExperiences() {
        return this.experiences;
    }

    getCertifications() {
        return this.certifications;
    }

    // --- COMPUTED STATS ---

    getSkillsCount(): number {
        return this.skillCategories.reduce((acc, category) => acc + category.skills.length, 0);
    }

    getProjectsCount(): number {
        return this.projects.length + this.experiences.length;
    }

    getCertificationsCount(): number {
        return this.certifications.length;
    }
}
