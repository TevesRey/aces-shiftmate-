import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component.ts';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component.ts';
import { Shift } from '../models/shift.model.ts';

@Component({
  selector: 'app-shift-details',
  template: `
    <div class="flex flex-col items-center text-center mb-8">
      <app-avatar [name]="shift.employeeName" size="lg" class="mb-4"></app-avatar>
      <h2 class="text-2xl font-bold text-primary">{{ shift.employeeName }}</h2>
      <p class="text-text-muted font-medium">{{ shift.position }} · {{ shift.department }}</p>
      <app-status-badge [type]="mapStatus(shift.status)" class="mt-2"></app-status-badge>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-6">
        <h3 class="text-sm font-bold text-text-muted uppercase tracking-wider">Shift Details</h3>
        <div class="space-y-3">
          <div class="flex justify-between py-2 border-b border-text-muted/5">
            <span class="text-sm text-text-muted">Date</span>
            <span class="text-sm font-medium text-text-main">{{ shift.date }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-text-muted/5">
            <span class="text-sm text-text-muted">Time</span>
            <span class="text-sm font-medium text-text-main">{{ shift.startTime }} – {{ shift.endTime }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-text-muted/5">
            <span class="text-sm text-text-muted">Duration</span>
            <span class="text-sm font-medium text-text-main">{{ calculateDuration() }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="text-sm font-bold text-text-muted uppercase tracking-wider">Notes</h3>
        <div class="p-4 rounded-xl bg-slate-50 border border-text-muted/10 text-sm text-text-main italic leading-relaxed">
          {{ shift.notes || 'No notes provided for this shift.' }}
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, AvatarComponent, StatusBadgeComponent],
})
export class ShiftDetailsComponent {
  @Input() shift!: Shift;

  mapStatus(status: string): any {
    const map: Record<string, any> = {
      'Scheduled': 'scheduled',
      'Active': 'active',
      'Completed': 'completed',
      'Cancelled': 'cancelled'
    };
    return map[status] || 'scheduled';
  }

  calculateDuration(): string {
    if (!this.shift.startTime || !this.shift.endTime) return 'N/A';
    const start = new Date(`2000-01-01T${this.shift.startTime}`);
    const end = new Date(`2000-01-01T${this.shift.endTime}`);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return `${diff.toFixed(1)} hours`;
  }
}
