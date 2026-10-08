import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { Button } from '../../../shared/components/button/button';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-table',
  template: `
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm responsive-table">
        <thead class="text-text-muted uppercase text-[11px] font-bold bg-slate-50/50">
          <tr>
            <th class="py-3 px-6">Employee</th>
            <th class="py-3 px-6">Employee ID</th>
            <th class="py-3 px-6">Department</th>
            <th class="py-3 px-6">Position</th>
            <th class="py-3 px-6">Status</th>
            <th class="py-3 px-6">Joined</th>
            <th class="py-3 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-text-muted/5">
          <tr *ngFor="let emp of employees" class="hover:bg-slate-50/80 transition-colors group">
            <td class="py-4 px-6" data-label="Employee">
              <div class="flex items-center gap-3">
                <app-avatar [name]="emp.firstName + ' ' + emp.lastName" size="sm"></app-avatar>
                <span class="font-medium text-text-main">{{ emp.firstName }} {{ emp.lastName }}</span>
              </div>
            </td>
            <td class="py-4 px-6 text-text-muted" data-label="ID">{{ emp.employeeId }}</td>
            <td class="py-4 px-6 text-text-muted" data-label="Dept">{{ emp.department }}</td>
            <td class="py-4 px-6 text-text-muted" data-label="Pos">{{ emp.position }}</td>
            <td class="py-4 px-6" data-label="Status">
              <app-status-badge [type]="mapStatus(emp.status)"></app-status-badge>
            </td>
            <td class="py-4 px-6 text-text-muted" data-label="Joined">{{ emp.dateJoined }}</td>
            <td class="py-4 px-6 text-right" data-label="Actions">
              <div class="flex justify-end gap-2">
                <app-button variant="ghost" size="sm" (click)="action.emit({ type: 'view', employee: emp })">View</app-button>
                <app-button variant="ghost" size="sm" (click)="action.emit({ type: 'edit', employee: emp })">Edit</app-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './employee-table.css',
  standalone: true,
  imports: [CommonModule, AvatarComponent, StatusBadgeComponent, Button],
})
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];
  @Output() action = new EventEmitter<{ type: 'view' | 'edit' | 'deactivate', employee: Employee }>();

  mapStatus(status: string): any {
    const map: Record<string, any> = {
      'Active': 'active',
      'On Leave': 'pending',
      'Inactive': 'cancelled'
    };
    return map[status] || 'active';
  }
}
