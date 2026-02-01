import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTilt]',
    standalone: true
})
export class TiltDirective {
    @Input() tiltScale = 1.05;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s');
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        const el = this.el.nativeElement;
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Calculate tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Max rotation deg
        const maxRotate = 10;

        const rotateX = ((y - centerY) / centerY) * -maxRotate;
        const rotateY = ((x - centerX) / centerX) * maxRotate;

        this.renderer.setStyle(el, 'transform', `perspective(1000px) scale(${this.tiltScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'perspective(1000px) scale(1) rotateX(0) rotateY(0)');
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.5s ease-out');
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s linear');
    }
}
