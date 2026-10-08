import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import { Shift } from '../models/shift.model';

@Component({
  selector: 'app-shift-form',
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Employee</label>
        <select [(ngModel)]="shift.employeeName" class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
          <option value="Elena Cruz">Elena Cruz</option>
          <option value="Marcus Santos">Marcus Santos</option>
          <option value="Sofia Reyes">Sofia Reyes</option>
          <option value="Daniel Garcia">Daniel Garcia</option>
          <option value="Chloe Chen">Chloe Chen</option>
          <option value="Liam Wilson">Liam Wilson</option>
        </select>
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Department</label>
        <input
          [(ngModel)]="shift.department"
          type="text"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
          placeholder="e.g. Engineering" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Position</label>
        <input
          [(ngModel)]="shift.position"
          type="text"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
          placeholder="e.g. Software Engineer" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Date</label>
        <input
          [(ngModel)]="shift.date"
          type="date"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Start Time</label>
        <input
          [(ngModel)]="shift.startTime"
          type="time"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">End Time</label>
        <input
          [(ngModel)]="shift.endTime"
          type="time"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Status</label>
        <select
          [(ngModel)]="shift.status"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
          <option value="Scheduled">Scheduled</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div class="space-y-1 md:col-span-2">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Notes</label>
        <textarea
          [(ngModel)]="shift.notes"
          rows="3"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
          placeholder="Additional shift details..."></textarea>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
})
export class ShiftFormComponent {
  @Input() shift: Shift = {
    id: '',
    employeeId: '',
    employeeName: '',
    department: '',
    position: '',
    date: '',
    startTime: '',
    endTime: '',
    status: 'Scheduled',
    notes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
