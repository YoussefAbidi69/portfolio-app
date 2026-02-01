import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-cursor.component.html',
  styleUrls: ['./custom-cursor.component.css']
})
export class CustomCursorComponent implements OnInit {
  mouseX = -100;
  mouseY = -100;
  trailX = -100;
  trailY = -100;

  ngOnInit() {
    this.animateTrail();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  animateTrail() {
    const animate = () => {
      this.trailX += (this.mouseX - this.trailX) * 0.1;
      this.trailY += (this.mouseY - this.trailY) * 0.1;
      requestAnimationFrame(animate);
    };
    animate();
  }
}
