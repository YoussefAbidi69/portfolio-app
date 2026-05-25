import { Component, OnInit, Output, EventEmitter, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface BootLine {
    text: string;
    type: 'muted' | 'cyan' | 'green' | 'violet' | 'warning';
    prefix?: string;
}

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [NgFor, NgIf],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="loader-wrap" [class.hiding]="hiding()">
        <div class="loader-terminal">
            <div class="loader-bar">
                <div class="loader-dots">
                    <span class="d red"></span>
                    <span class="d yellow"></span>
                    <span class="d green"></span>
                </div>
                <div class="loader-title">~/youssef.dev — boot</div>
                <div style="width:60px"></div>
            </div>

            <div class="loader-body">
                <div class="boot-line" *ngFor="let line of visibleLines()" [class]="'type-' + line.type">
                    <span class="line-prefix" *ngIf="line.prefix">{{ line.prefix }}</span>
                    <span class="line-text">{{ line.text }}</span>
                </div>
                <div class="cursor-line" *ngIf="!finished()">
                    <span class="prompt">➜</span>
                    <span class="caret"></span>
                </div>
            </div>

            <div class="loader-footer">
                <div class="progress-track">
                    <div class="progress-fill" [style.width.%]="progress()"></div>
                </div>
                <div class="progress-label">{{ progress() }}%</div>
            </div>
        </div>
    </div>
  `,
    styles: [`
    .loader-wrap {
        position: fixed;
        inset: 0;
        background: #060912;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .loader-wrap::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(34,211,238,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.035) 1px, transparent 1px);
        background-size: 50px 50px;
        mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
        -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
        pointer-events: none;
    }
    .loader-wrap.hiding {
        opacity: 0;
        pointer-events: none;
    }
    .loader-terminal {
        width: min(580px, 90vw);
        background: rgba(15,22,41,0.85);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 0.5px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        overflow: hidden;
        box-shadow:
            0 0 80px -20px rgba(34,211,238,0.35),
            0 20px 60px -10px rgba(0,0,0,0.5);
        animation: terminal-in 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes terminal-in {
        from { opacity: 0; transform: scale(0.95) translateY(16px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    .loader-bar {
        display: flex;
        align-items: center;
        padding: 10px 14px;
        border-bottom: 0.5px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.02);
    }
    .loader-dots { display: flex; gap: 6px; }
    .d { width: 11px; height: 11px; border-radius: 50%; }
    .d.red    { background: #ff5f56; }
    .d.yellow { background: #ffbd2e; }
    .d.green  { background: #27c93f; }
    .loader-title {
        flex: 1;
        text-align: center;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.7rem;
        color: #64748B;
    }
    .loader-body {
        padding: 20px 24px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        line-height: 2;
        min-height: 240px;
    }
    .boot-line {
        display: flex;
        gap: 10px;
        animation: line-in 0.3s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes line-in {
        from { opacity: 0; transform: translateX(-8px); }
        to   { opacity: 1; transform: translateX(0); }
    }
    .line-prefix { color: #64748B; min-width: 72px; }
    .type-muted   .line-text { color: #94A3B8; }
    .type-cyan    .line-text { color: #22D3EE; }
    .type-green   .line-text { color: #34D399; }
    .type-violet  .line-text { color: #A78BFA; }
    .type-warning .line-text { color: #FBBF24; }
    .cursor-line {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 2px;
    }
    .prompt { color: #34D399; }
    .caret {
        display: inline-block;
        width: 8px;
        height: 14px;
        background: #22D3EE;
        vertical-align: middle;
        animation: blink 1.1s step-end infinite;
    }
    @keyframes blink { 50% { opacity: 0; } }
    .loader-footer {
        padding: 12px 24px 16px;
        border-top: 0.5px solid rgba(255,255,255,0.06);
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .progress-track {
        flex: 1;
        height: 3px;
        background: rgba(255,255,255,0.06);
        border-radius: 999px;
        overflow: hidden;
    }
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #22D3EE, #A78BFA);
        border-radius: 999px;
        transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .progress-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.65rem;
        color: #64748B;
        min-width: 32px;
        text-align: right;
    }
  `]
})
export class LoadingComponent implements OnInit {
    @Output() done = new EventEmitter<void>();

    private readonly bootSequence: (BootLine & { delay: number })[] = [
        { text: 'Initializing portfolio kernel v2.0.0...', type: 'muted', delay: 0 },
        { text: 'Loading modules: [cloud] [devops] [backend]', type: 'muted', delay: 380 },
        { text: 'Mounting filesystems...                  OK', type: 'cyan', prefix: '[  0.2s]', delay: 760 },
        { text: 'Starting Angular@18 runtime...           OK', type: 'cyan', prefix: '[  0.4s]', delay: 1080 },
        { text: 'Deploying stack: Kubernetes · Docker · OpenStack', type: 'violet', prefix: '[  0.7s]', delay: 1400 },
        { text: 'Loading profile: Youssef Abidi...        OK', type: 'green', prefix: '[  0.9s]', delay: 1720 },
        { text: 'All systems operational.                 OK', type: 'green', prefix: '[  1.1s]', delay: 2040 },
        { text: 'Welcome to youssef.dev', type: 'violet', delay: 2360 },
    ];

    visibleLines = signal<(BootLine & { delay: number })[]>([]);
    progress = signal<number>(0);
    hiding = signal<boolean>(false);
    finished = signal<boolean>(false);

    ngOnInit(): void {
        const total = this.bootSequence.length;

        this.bootSequence.forEach((line, i) => {
            setTimeout(() => {
                this.visibleLines.update(lines => [...lines, line]);
                this.progress.set(Math.round(((i + 1) / total) * 100));

                if (i === total - 1) {
                    this.finished.set(true);
                    setTimeout(() => {
                        this.hiding.set(true);
                        setTimeout(() => this.done.emit(), 700);
                    }, 650);
                }
            }, line.delay);
        });
    }
}
