import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from './card/card';

@Component({
  selector: 'app-stat-card',
  template: `
    <app-card class="p-5 flex flex-col justify-between h-full">
      <div>
        <p class="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">{{ label }}</p>
        <h3 class="text-2xl font-bold text-primary">{{ value }}</h3>
      </div>
      <div class="mt-4 flex items-center gap-2">
        <span [class]="trendClasses" class="text-xs font-medium flex items-center gap-1">
          <svg *ngIf="trend > 0" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          <svg *ngIf="trend < 0" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          {{ trend }}%
        </span>
        <span class="text-xs text-text-muted">{{ trendLabel }}</span>
      </div>
    </app-card>
  `,
  standalone: true,
  imports: [CommonModule, Card],
})
export class StatCardComponent {
  @Input() label: string = 'Metric';
  @Input() value: string | number = '0';
  @Input() trend: number = 0;
  @Input() trendLabel: string = 'vs last month';

  get trendClasses() {
    return this.trend > 0
      ? 'text-accent bg-accent/10 px-1.5 py-0.5 rounded'
      : 'text-red-500 bg-red-50 px-1.5 py-0.5 rounded';
  }
}
