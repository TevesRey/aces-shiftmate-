import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  template: `
    <span [class]="badgeClasses" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors">
      {{ type }}
    </span>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class StatusBadgeComponent {
  @Input() type: 'active' | 'pending' | 'completed' | 'cancelled' | 'scheduled' = 'active';

  get badgeClasses() {
    const map = {
      active: 'bg-accent/10 text-accent',
      pending: 'bg-amber-100 text-amber-600',
      completed: 'bg-blue-100 text-blue-600',
      cancelled: 'bg-red-100 text-red-600',
      scheduled: 'bg-secondary/10 text-secondary',
    };
    return map[this.type] || map.active;
  }
}
