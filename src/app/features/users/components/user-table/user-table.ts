import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component.ts';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component.ts';
import { Button } from '../../../shared/components/button/button.ts';
import { User } from '../models/user.model.ts';
import { Employee } from '../employees/models/employee.model.ts';

@Component({
  selector: 'app-user-table',
  template: `
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm responsive-table">
        <thead class="text-text-muted uppercase text-[11px] font-bold bg-slate-50/50">
          <tr>
            <th class="py-3 px-6">User</th>
            <th class="py-3 px-6">Email</th>
            <th class="py-3 px-6">Employee ID</th>
            <th class="py-3 px-6">Role</th>
            <th class="py-3 px-6">Department</th>
            <th class="py-3 px-6">Status</th>
            <th class="py-3 px-6">Last Active</th>
            <th class="py-3 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-text-muted/5">
          <tr *ngFor="let user of users" class="hover:bg-slate-50/80 transition-colors group">
            <td class="py-4 px-6" data-label="User">
              <div class="flex items-center gap-3">
                <app-avatar [name]="getUserName(user)" size="sm"></app-avatar>
                <span class="font-medium text-text-main">{{ getUserName(user) }}</span>
              </div>
            </td>
            <td class="py-4 px-6 text-text-muted" data-label="Email">{{ user.email }}</td>
            <td class="py-4 px-6 text-text-muted" data-label="Emp ID">{{ user.employeeId }}</td>
            <td class="py-4 px-6" data-label="Role">
              <span class="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                {{ user.role }}
              </span>
            </td>
            <td class="py-4 px-6 text-text-muted" data-label="Dept">{{ getDepartment(user) }}</td>
            <td class="py-4 px-6" data-label="Status">
              <app-status-badge [type]="mapStatus(user.status)"></app-status-badge>
            </td>
            <td class="py-4 px-6 text-text-muted" data-label="Active">{{ user.lastActive | date:'shortDate' }}</td>
            <td class="py-4 px-6 text-right" data-label="Actions">
              <div class="flex justify-end gap-2">
                <app-button variant="ghost" size="sm" (click)="action.emit({ type: 'view', user })">View</app-button>
                <app-button variant="ghost" size="sm" (click)="action.emit({ type: 'edit', user })">Edit</app-button>
                <app-button variant="ghost" size="sm" (click)="action.emit({ type: 'role', user })">Role</app-button>
                <app-button variant="ghost" size="sm" (click)="action.emit({ type: 'toggle', user })"
                            [class.text-red-500]="user.status === 'Active'">
                  {{ user.status === 'Active' ? 'Deactivate' : 'Activate' }}
                </app-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './user-table.css',
  standalone: true,
  imports: [CommonModule, AvatarComponent, StatusBadgeComponent, Button],
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Input() employees: Employee[] = [];
  @Output() action = new EventEmitter<{ type: 'view' | 'edit' | 'role' | 'toggle', user: User }>();

  getUserName(user: User): string {
    const emp = this.employees.find(e => e.id === user.employeeId);
    return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown User';
  }

  getDepartment(user: User): string {
    const emp = this.employees.find(e => e.id === user.employeeId);
    return emp ? emp.department : 'N/A';
  }

  mapStatus(status: string): any {
    const map: Record<string, any> = {
      'Active': 'active',
      'Inactive': 'cancelled',
      'Pending': 'pending'
    };
    return map[status] || 'active';
  }
}
