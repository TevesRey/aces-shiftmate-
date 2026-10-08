import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-employee-stats',
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <app-stat-card label="Total Employees" [value]="total" [trend]="0" trendLabel="current count"></app-stat-card>
      <app-stat-card label="Active" [value]="active" [trend]="2.4" trendLabel="this month"></app-stat-card>
      <app-stat-card label="On Leave" [value]="onLeave" [trend]="-1.2" trendLabel="vs last month"></app-stat-card>
      <app-stat-card label="Inactive" [value]="inactive" [trend]="0" trendLabel="no change"></app-stat-card>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, StatCardComponent],
})
export class EmployeeStatsComponent {
  @Input() total = 0;
  @Input() active = 0;
  @Input() onLeave = 0;
  @Input() inactive = 0;
}
