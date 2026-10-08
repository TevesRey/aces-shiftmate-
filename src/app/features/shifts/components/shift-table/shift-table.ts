import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component.ts';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component.ts';
import { Button } from '../../../shared/components/button/button.ts';
import { Shift } from '../models/shift.model.ts';

@Component({
  selector: 'app-shift-table',
  template: `
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm responsive-table">
        <thead class="text-text-muted uppercase text-[11px] font-bold bg-slate-50/50">
          <tr>
            <th class="py-3 px-6">Employee</th>
            <th class="py-3 px-6">Position</th>
            <th class="py-3 px-6">Department</th>
            <th class="py-3 px-6">Date</th>
            <th class="py-3 px-6">Shift Time</th>
            <th class="py-3 px-6">Status</th>
            <th class="py-3 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-text-muted/5">
          <tr *ngFor="let shift of shifts" class="hover:bg-slate-50/80 transition-colors group">
            <td class="py-4 px-6" data-label="Employee">
              <div class="flex items-center gap-3">
                <app-avatar [name]="shift.employeeName" size="sm"></app-avatar>
                <span class="font-medium text-text-main">{{ shift.employeeName }}</span>
              </div>
            </td>
            <td class="py-4 px-6 text-text-muted" data-label="Position">{{ shift.position }}</td>
            <td class="py-4 px-6 text-text-muted" data-label="Department">{{ shift.department }}</td>
            <td class="py-4 px-6 text-text-muted" data-label="Date">{{ shift.date }}</td>
            <td class="py-4 px-6 text-text-muted" data-label="Time">{{ shift.startTime }} – {{ shift.endTime }}</td>
            <td class="py-4 px-6" data-label="Status">
              <app-status-badge [type]="mapStatus(shift.status)"></app-status-badge>
            </td>
            <td class="py-4 px-6 text-right" data-label="Actions">
              <div class="flex justify-end gap-2">
                <app-button variant="ghost" size="sm" (click)="action.emit({ type: 'view', shift })">View</app-button>
                <app-button variant="ghost" size="sm" (click)="action.emit({ type: 'edit', shift })">Edit</app-button>
                <app-button variant="ghost" size="sm" (click)="action.emit({ type: 'cancel', shift })" class="text-red-500 hover:text-red-600">Cancel</app-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './shift-table.css',
  standalone: true,
  imports: [CommonModule, AvatarComponent, StatusBadgeComponent, Button],
})
export class ShiftTableComponent {
  @Input() shifts: Shift[] = [];
  @Output() action = new EventEmitter<{ type: 'view' | 'edit' | 'cancel', shift: Shift }>();

  mapStatus(status: string): any {
    const map: Record<string, any> = {
      'Scheduled': 'scheduled',
      'Active': 'active',
      'Completed': 'completed',
      'Cancelled': 'cancelled'
    };
    return map[status] || 'scheduled';
  }
}
