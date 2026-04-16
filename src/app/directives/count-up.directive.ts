// src/app/directives/count-up.directive.ts
// Animates a number from 0 to [appCountUp] when the element enters the viewport.
import { Directive, ElementRef, Input, OnChanges, OnDestroy, inject } from '@angular/core';

@Directive({
    selector: '[appCountUp]',
    standalone: true
})
export class CountUpDirective implements OnChanges, OnDestroy {
    private el = inject(ElementRef<HTMLElement>);
    private observer?: IntersectionObserver;
    private raf?: number;
    private started = false;

    @Input('appCountUp') target = 0;
    @Input() duration = 1400;
    @Input() suffix = '';

    ngOnChanges(): void {
        this.el.nativeElement.textContent = '0' + this.suffix;
        this.observer?.disconnect();
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting && !this.started) {
                    this.started = true;
                    this.animate();
                }
            });
        }, { threshold: 0.5 });
        this.observer.observe(this.el.nativeElement);
    }

    private animate(): void {
        const start = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - start) / this.duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = Math.round(eased * this.target);
            this.el.nativeElement.textContent = String(val).padStart(2, '0') + this.suffix;
            if (p < 1) this.raf = requestAnimationFrame(tick);
        };
        this.raf = requestAnimationFrame(tick);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
        if (this.raf) cancelAnimationFrame(this.raf);
    }
}
