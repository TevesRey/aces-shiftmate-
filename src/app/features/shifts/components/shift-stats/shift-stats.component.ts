import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component.ts';

@Component({
  selector: 'app-shift-stats',
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <app-stat-card label="Shifts Today" [value]="today" [trend]="5" trendLabel="vs yesterday"></app-stat-card>
      <app-stat-card label="Scheduled" [value]="scheduled" [trend]="2.1" trendLabel="this week"></app-stat-card>
      <app-stat-card label="Active" [value]="active" [trend]="0" trendLabel="now"></app-stat-card>
      <app-stat-card label="Completed" [value]="completed" [trend]="12" trendLabel="this month"></app-stat-card>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, StatCardComponent],
})
export class ShiftStatsComponent {
  @Input() today = 0;
  @Input() scheduled = 0;
  @Input() active = 0;
  @Input() completed = 0;
}
