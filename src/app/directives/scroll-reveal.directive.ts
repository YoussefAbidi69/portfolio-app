// src/app/directives/scroll-reveal.directive.ts
import { Directive, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';

@Directive({
    selector: '[appScrollReveal]',
    standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
    private el = inject(ElementRef<HTMLElement>);
    private observer?: IntersectionObserver;

    ngOnInit(): void {
        const node = this.el.nativeElement;
        node.classList.add('reveal');

        this.observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        this.observer?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        );

        this.observer.observe(node);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
