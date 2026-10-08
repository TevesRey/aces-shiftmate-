import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component.ts';

@Component({
  selector: 'app-user-stats',
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <app-stat-card label="Total Users" [value]="total" [trend]="0" trendLabel="current count"></app-stat-card>
      <app-stat-card label="Active Users" [value]="active" [trend]="2.4" trendLabel="this month"></app-stat-card>
      <app-stat-card label="Managers" [value]="managers" [trend]="0" trendLabel="current count"></app-stat-card>
      <app-stat-card label="Pending / Inactive" [value]="pending" [trend]="-1.2" trendLabel="vs last month"></app-stat-card>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, StatCardComponent],
})
export class UserStatsComponent {
  @Input() total = 0;
  @Input() active = 0;
  @Input() managers = 0;
  @Input() pending = 0;
}
