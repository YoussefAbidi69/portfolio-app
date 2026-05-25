import {
    Component, signal, HostListener, ViewChild, ElementRef,
    AfterViewChecked, OnInit
} from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TermLine {
    type: 'cmd' | 'output' | 'success' | 'error' | 'info' | 'muted';
    text: string;
}

@Component({
    selector: 'app-terminal-nav',
    standalone: true,
    imports: [NgFor, NgIf, NgClass, FormsModule],
    template: `
    <!-- Trigger button -->
    <button class="tn-trigger" (click)="open()" title="Open terminal (Ctrl+K)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
        </svg>
        <span>terminal</span>
        <kbd>^K</kbd>
    </button>

    <!-- Modal overlay -->
    <div class="tn-overlay" *ngIf="isOpen()" (click)="onOverlayClick($event)">
        <div class="tn-window" (click)="$event.stopPropagation()">

            <!-- Title bar -->
            <div class="tn-bar">
                <div class="tn-dots">
                    <span class="d red" (click)="close()"></span>
                    <span class="d yellow"></span>
                    <span class="d green"></span>
                </div>
                <span class="tn-bar-title">youssef&#64;portfolio:~</span>
                <kbd class="esc-hint" (click)="close()">ESC</kbd>
            </div>

            <!-- Output -->
            <div class="tn-output" #outputEl>
                <div *ngFor="let l of lines()" class="tn-line" [ngClass]="'type-' + l.type">
                    <span *ngIf="l.type === 'cmd'" class="tn-prompt">$</span>
                    <span *ngIf="l.type === 'success'" class="tn-arrow">✓</span>
                    <span *ngIf="l.type === 'error'" class="tn-arrow">✗</span>
                    <span class="tn-text">{{ l.text }}</span>
                </div>
            </div>

            <!-- Input -->
            <div class="tn-input-row">
                <span class="tn-prompt">$</span>
                <input
                    #inputEl
                    class="tn-input"
                    [value]="inputVal()"
                    (input)="onInput($event)"
                    (keydown)="onKeydown($event)"
                    [placeholder]="placeholder"
                    autocomplete="off"
                    spellcheck="false"
                />
                <span class="tn-caret" *ngIf="showCaret()"></span>
            </div>

            <!-- Quick nav -->
            <div class="tn-quick">
                <span class="tn-quick-label">Quick:</span>
                <button *ngFor="let q of quickNav" class="tn-pill" (click)="runCommand(q.cmd)">{{ q.label }}</button>
            </div>

            <!-- Hints -->
            <div class="tn-hints">
                <span><kbd>↑↓</kbd> History</span>
                <span><kbd>Tab</kbd> Autocomplete</span>
                <span><kbd>Enter</kbd> Execute</span>
                <span><kbd>ESC</kbd> Close</span>
            </div>
        </div>
    </div>
  `,
    styles: [`
    /* Trigger button */
    .tn-trigger {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 6px 13px;
        border-radius: var(--radius-md, 10px);
        border: 0.5px solid var(--border-default);
        background: transparent;
        color: var(--text-muted);
        font-family: var(--font-mono, monospace);
        font-size: 0.72rem;
        cursor: pointer;
        transition: all 0.2s;
        margin-left: 8px;
    }
    .tn-trigger:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
        background: var(--accent-primary-soft);
    }
    .tn-trigger kbd {
        font-size: 0.6rem;
        padding: 1px 5px;
        border-radius: 4px;
        border: 0.5px solid var(--border-default);
        color: var(--text-faint);
        background: var(--bg-elevated, #0F1629);
        font-family: var(--font-mono, monospace);
    }

    /* Overlay */
    .tn-overlay {
        position: fixed;
        inset: 0;
        background: rgba(6, 9, 18, 0.7);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: overlay-in 0.2s ease both;
    }
    @keyframes overlay-in {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Window */
    .tn-window {
        width: min(640px, 100%);
        background: #0A0E1A;
        border: 0.5px solid rgba(34,211,238,0.2);
        border-radius: 16px;
        overflow: hidden;
        box-shadow:
            0 0 0 1px rgba(34,211,238,0.05),
            0 30px 80px -20px rgba(0,0,0,0.7),
            0 0 100px -30px rgba(34,211,238,0.25);
        animation: window-in 0.25s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes window-in {
        from { opacity: 0; transform: scale(0.94) translateY(-12px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    /* Title bar */
    .tn-bar {
        display: flex;
        align-items: center;
        padding: 10px 14px;
        border-bottom: 0.5px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.02);
    }
    .tn-dots { display: flex; gap: 6px; }
    .d { width: 11px; height: 11px; border-radius: 50%; cursor: pointer; }
    .d.red    { background: #ff5f56; }
    .d.yellow { background: #ffbd2e; }
    .d.green  { background: #27c93f; }
    .tn-bar-title {
        flex: 1;
        text-align: center;
        font-family: var(--font-mono, monospace);
        font-size: 0.7rem;
        color: #64748B;
    }
    .esc-hint {
        font-size: 0.6rem;
        padding: 2px 7px;
        border-radius: 4px;
        border: 0.5px solid rgba(255,255,255,0.12);
        color: #64748B;
        background: rgba(255,255,255,0.04);
        cursor: pointer;
        font-family: var(--font-mono, monospace);
    }
    .esc-hint:hover { color: #94A3B8; border-color: rgba(255,255,255,0.2); }

    /* Output */
    .tn-output {
        padding: 16px 20px 8px;
        font-family: var(--font-mono, monospace);
        font-size: 0.78rem;
        line-height: 1.9;
        min-height: 180px;
        max-height: 280px;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.1) transparent;
    }
    .tn-line { display: flex; align-items: baseline; gap: 8px; }
    .tn-prompt { color: #22D3EE; flex-shrink: 0; }
    .tn-arrow  { flex-shrink: 0; }
    .type-cmd    .tn-text { color: #F1F5F9; }
    .type-output .tn-text { color: #94A3B8; padding-left: 16px; }
    .type-info   .tn-text { color: #A78BFA; }
    .type-success .tn-arrow { color: #34D399; }
    .type-success .tn-text  { color: #34D399; }
    .type-error  .tn-arrow { color: #F87171; }
    .type-error  .tn-text  { color: #F87171; }
    .type-muted  .tn-text  { color: #475569; padding-left: 16px; }

    /* Input row */
    .tn-input-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 20px 10px;
        border-top: 0.5px solid rgba(255,255,255,0.05);
    }
    .tn-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        font-family: var(--font-mono, monospace);
        font-size: 0.82rem;
        color: #F1F5F9;
        caret-color: #22D3EE;
    }
    .tn-input::placeholder { color: #475569; }
    .tn-caret {
        width: 7px; height: 14px;
        background: #22D3EE;
        border-radius: 1px;
        animation: blink 1.1s step-end infinite;
        flex-shrink: 0;
    }
    @keyframes blink { 50% { opacity: 0; } }

    /* Quick nav */
    .tn-quick {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 20px;
        border-top: 0.5px solid rgba(255,255,255,0.05);
        flex-wrap: wrap;
    }
    .tn-quick-label {
        font-family: var(--font-mono, monospace);
        font-size: 0.65rem;
        color: #475569;
    }
    .tn-pill {
        font-family: var(--font-mono, monospace);
        font-size: 0.68rem;
        padding: 3px 11px;
        border-radius: 999px;
        border: 0.5px solid rgba(34,211,238,0.25);
        background: rgba(34,211,238,0.06);
        color: #22D3EE;
        cursor: pointer;
        transition: all 0.18s;
    }
    .tn-pill:hover {
        background: rgba(34,211,238,0.14);
        border-color: rgba(34,211,238,0.5);
    }

    /* Hints */
    .tn-hints {
        display: flex;
        gap: 16px;
        padding: 8px 20px 12px;
        border-top: 0.5px solid rgba(255,255,255,0.04);
    }
    .tn-hints span {
        font-family: var(--font-mono, monospace);
        font-size: 0.6rem;
        color: #475569;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .tn-hints kbd {
        padding: 1px 5px;
        border-radius: 3px;
        border: 0.5px solid rgba(255,255,255,0.1);
        background: rgba(255,255,255,0.04);
        color: #64748B;
        font-family: var(--font-mono, monospace);
        font-size: 0.58rem;
    }
  `]
})
export class TerminalNavComponent implements OnInit, AfterViewChecked {
    @ViewChild('outputEl') private outputEl!: ElementRef<HTMLDivElement>;
    @ViewChild('inputEl')  private inputEl!: ElementRef<HTMLInputElement>;

    isOpen   = signal(false);
    inputVal = signal('');
    lines    = signal<TermLine[]>([]);
    showCaret = signal(true);

    readonly placeholder = 'Type a command...';

    private history: string[] = [];
    private historyIdx = -1;
    private needsScroll = false;

    readonly quickNav = [
        { label: 'home',           cmd: 'home' },
        { label: 'skills',         cmd: 'skills' },
        { label: 'projects',       cmd: 'projects' },
        { label: 'experience',     cmd: 'experience' },
        { label: 'certifications', cmd: 'certifications' },
        { label: 'contact',        cmd: 'contact' },
    ];

    private readonly allCommands = [
        'help','whoami','ls','clear',
        'home','skills','projects','experience','certifications','contact',
        'cat profile.yaml','open github','open linkedin','download cv'
    ];

    ngOnInit(): void {
        this.printWelcome();
    }

    ngAfterViewChecked(): void {
        if (this.needsScroll && this.outputEl) {
            const el = this.outputEl.nativeElement;
            el.scrollTop = el.scrollHeight;
            this.needsScroll = false;
        }
    }

    @HostListener('document:keydown', ['$event'])
    onGlobalKey(e: KeyboardEvent): void {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.toggle();
        }
        if (e.key === 'Escape' && this.isOpen()) this.close();
    }

    open(): void {
        this.isOpen.set(true);
        setTimeout(() => this.inputEl?.nativeElement.focus(), 60);
    }

    close(): void { this.isOpen.set(false); }

    toggle(): void { this.isOpen() ? this.close() : this.open(); }

    onOverlayClick(e: MouseEvent): void {
        if ((e.target as HTMLElement).classList.contains('tn-overlay')) this.close();
    }

    onInput(e: Event): void {
        this.inputVal.set((e.target as HTMLInputElement).value);
        this.historyIdx = -1;
    }

    onKeydown(e: KeyboardEvent): void {
        if (e.key === 'Enter')    { this.execute(); }
        if (e.key === 'Tab')      { e.preventDefault(); this.autocomplete(); }
        if (e.key === 'ArrowUp')  { e.preventDefault(); this.historyUp(); }
        if (e.key === 'ArrowDown'){ e.preventDefault(); this.historyDown(); }
    }

    runCommand(cmd: string): void {
        this.inputVal.set(cmd);
        this.execute();
    }

    private execute(): void {
        const cmd = this.inputVal().trim();
        if (!cmd) return;
        this.addLine({ type: 'cmd', text: cmd });
        this.history.unshift(cmd);
        this.historyIdx = -1;
        this.inputVal.set('');
        this.processCommand(cmd.toLowerCase());
    }

    private processCommand(cmd: string): void {
        switch (cmd) {
            case 'help':
                this.addLines([
                    { type: 'info',   text: 'Available commands:' },
                    { type: 'muted',  text: 'whoami              → show profile info' },
                    { type: 'muted',  text: 'ls                  → list all sections' },
                    { type: 'muted',  text: 'home                → navigate to top' },
                    { type: 'muted',  text: 'skills              → navigate to skills' },
                    { type: 'muted',  text: 'projects            → navigate to projects' },
                    { type: 'muted',  text: 'experience          → navigate to experience' },
                    { type: 'muted',  text: 'certifications      → navigate to certifications' },
                    { type: 'muted',  text: 'contact             → navigate to contact' },
                    { type: 'muted',  text: 'cat profile.yaml    → show profile details' },
                    { type: 'muted',  text: 'open github         → open GitHub profile' },
                    { type: 'muted',  text: 'open linkedin       → open LinkedIn' },
                    { type: 'muted',  text: 'download cv         → download CV' },
                    { type: 'muted',  text: 'clear               → clear terminal' },
                ]);
                break;

            case 'whoami':
            case 'cat profile.yaml':
                this.addLines([
                    { type: 'info',    text: 'name:         Youssef Abidi' },
                    { type: 'output',  text: 'role:         Cloud & DevOps Engineer' },
                    { type: 'output',  text: 'location:     Marsa, Tunis, TN' },
                    { type: 'output',  text: 'email:        youssef.abidi@esprit.tn' },
                    { type: 'output',  text: 'education:    ESPRIT — 2nd year engineering' },
                    { type: 'output',  text: 'stack:        Angular · Spring Boot · K8s · OpenStack' },
                    { type: 'success', text: 'available:    true — open to opportunities' },
                ]);
                break;

            case 'ls':
                this.addLines([
                    { type: 'info',   text: 'Sections:' },
                    { type: 'output', text: '  /home          hero & intro' },
                    { type: 'output', text: '  /stack         tech skills' },
                    { type: 'output', text: '  /experience    work history' },
                    { type: 'output', text: '  /projects      selected projects' },
                    { type: 'output', text: '  /certifications certifications' },
                    { type: 'output', text: '  /contact       get in touch' },
                ]);
                break;

            case 'home':
                this.navigate('#home', 'Navigating to home...');
                break;
            case 'skills':
            case 'cd skills':
                this.navigate('#stack', 'Navigating to skills...');
                break;
            case 'projects':
            case 'cd projects':
                this.navigate('#projects', 'Navigating to projects...');
                break;
            case 'experience':
            case 'cd experience':
                this.navigate('#experience', 'Navigating to experience...');
                break;
            case 'certifications':
            case 'cd certifications':
                this.navigate('#certifications', 'Navigating to certifications...');
                break;
            case 'contact':
            case 'cd contact':
                this.navigate('#contact', 'Navigating to contact...');
                break;

            case 'open github':
                window.open('https://github.com/YoussefAbidi69', '_blank');
                this.addLine({ type: 'success', text: 'Opening GitHub...' });
                break;
            case 'open linkedin':
                window.open('https://www.linkedin.com/in/youssef-abidi-/', '_blank');
                this.addLine({ type: 'success', text: 'Opening LinkedIn...' });
                break;
            case 'download cv':
                this.downloadCV();
                this.addLine({ type: 'success', text: 'Downloading CV...' });
                break;

            case 'clear':
                this.lines.set([]);
                return;

            default:
                this.addLine({ type: 'error', text: `Command not found: "${cmd}" — type "help" to see available commands.` });
        }
    }

    private navigate(hash: string, msg: string): void {
        this.addLine({ type: 'success', text: msg });
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => this.close(), 500);
    }

    private downloadCV(): void {
        const a = document.createElement('a');
        a.href = 'assets/cv_AbidiYoussef.pdf';
        a.download = 'cv_AbidiYoussef.pdf';
        a.click();
    }

    private autocomplete(): void {
        const val = this.inputVal().toLowerCase();
        if (!val) return;
        const match = this.allCommands.find(c => c.startsWith(val));
        if (match) this.inputVal.set(match);
    }

    private historyUp(): void {
        if (!this.history.length) return;
        this.historyIdx = Math.min(this.historyIdx + 1, this.history.length - 1);
        this.inputVal.set(this.history[this.historyIdx]);
    }

    private historyDown(): void {
        if (this.historyIdx <= 0) { this.historyIdx = -1; this.inputVal.set(''); return; }
        this.historyIdx--;
        this.inputVal.set(this.history[this.historyIdx]);
    }

    private addLine(l: TermLine): void {
        this.lines.update(ls => [...ls, l]);
        this.needsScroll = true;
    }

    private addLines(ls: TermLine[]): void {
        this.lines.update(prev => [...prev, ...ls]);
        this.needsScroll = true;
    }

    private printWelcome(): void {
        this.addLines([
            { type: 'info',   text: 'Portfolio Terminal v2.0.0 — youssef.dev' },
            { type: 'muted',  text: 'Type "help" to see available commands.' },
        ]);
    }
}
