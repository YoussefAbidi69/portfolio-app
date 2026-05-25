// src/app/directives/tilt.directive.ts
// Subtle 3D tilt on hover — desktop only.
import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
    selector: '[appTilt]',
    standalone: true
})
export class TiltDirective {
    private el = inject(ElementRef<HTMLElement>);

    @Input() tiltMax = 4;     // Max degrees.
    @Input() tiltScale = 1.01;

    @HostListener('mousemove', ['$event'])
    onMove(e: MouseEvent): void {
        if (window.matchMedia('(hover: none)').matches) return;
        const rect = this.el.nativeElement.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((e.clientY - rect.top - cy) / cy) * -this.tiltMax;
        const ry = ((e.clientX - rect.left - cx) / cx) * this.tiltMax;
        this.el.nativeElement.style.transform =
            `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${this.tiltScale})`;
    }

    @HostListener('mouseleave')
    onLeave(): void {
        this.el.nativeElement.style.transform =
            'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}
