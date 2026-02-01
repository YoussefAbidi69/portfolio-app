import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-background',
    standalone: true,
    imports: [],
    templateUrl: './background.component.html',
    styleUrl: './background.component.css'
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
    @ViewChild('bgCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
    private animationId: number = 0;
    private particles: any[] = [];
    private resizeObserver: ResizeObserver | undefined;
    private mouseX: number = -100;
    private mouseY: number = -100;
    private mouseListener: any;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.initCanvas();
            this.mouseListener = (e: MouseEvent) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            };
            window.addEventListener('mousemove', this.mouseListener);
        }
    }

    ngOnDestroy(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.mouseListener) {
            window.removeEventListener('mousemove', this.mouseListener);
        }
    }

    initCanvas() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;

        // Set initial size
        this.resizeCanvas();

        // Init particles
        this.createParticles();

        // Start animation loop
        this.animate();

        // Handle resize
        this.resizeObserver = new ResizeObserver(() => {
            this.resizeCanvas();
            this.createParticles(); // Re-create particles for new size
        });
        this.resizeObserver.observe(document.body);
    }

    resizeCanvas() {
        const canvas = this.canvasRef.nativeElement;
        this.canvasRef.nativeElement.width = window.innerWidth;
        this.canvasRef.nativeElement.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const canvas = this.canvasRef.nativeElement;
        // Density calculation
        const particleCount = Math.floor((canvas.width * canvas.height) / 9000);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        if (!this.ctx) return;
        const canvas = this.canvasRef.nativeElement;

        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            // Draw particle
            this.ctx.fillStyle = 'rgba(100, 255, 218, 0.5)';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Connect to Mouse
            let mouseDist = Math.sqrt((p.x - this.mouseX) ** 2 + (p.y - this.mouseY) ** 2);
            if (mouseDist < 150) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(0, 243, 255, ${0.5 * (1 - mouseDist / 150)})`; // Cyan connection
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(this.mouseX, this.mouseY);
                this.ctx.stroke();
            }

            // Draw connections between particles
            for (let j = i + 1; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(100, 255, 218, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}
