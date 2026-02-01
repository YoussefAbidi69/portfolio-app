import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appScrollReveal]',
    standalone: true
})
export class ScrollRevealDirective implements AfterViewInit {

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngAfterViewInit() {
        // Add the initial reveal class
        this.renderer.addClass(this.el.nativeElement, 'reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.renderer.addClass(this.el.nativeElement, 'active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(this.el.nativeElement);
    }
}
