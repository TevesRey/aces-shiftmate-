import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserRole, UserStatus } from '../models/user.model';
import { Employee } from '../employees/models/employee.model';
import { MOCK_EMPLOYEES } from '../employees/models/mock-employees';

@Component({
  selector: 'app-user-form',
  template: `
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Employee Link -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-main">Linked Employee</label>
          <select
            [(ngModel)]="user.employeeId"
            class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
            <option value="">Select an employee...</option>
            <option *ngFor="let emp of employees" [value]="emp.id">
              {{ emp.firstName }} {{ emp.lastName }} ({{ emp.id }})
            </option>
          </select>
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-main">Email Address</label>
          <input
            type="email"
            [(ngModel)]="user.email"
            placeholder="user@company.com"
            class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
        </div>

        <!-- Role -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-main">User Role</label>
          <div class="grid grid-cols-3 gap-3">
            <button
              *ngFor="let role of roles"
              type="button"
              (click)="user.role = role"
              [class]="user.role === role
                ? 'bg-secondary text-white border-secondary'
                : 'bg-surface text-text-muted border-text-muted/30'"
              class="px-3 py-2 border rounded-lg text-xs font-bold uppercase transition-all">
              {{ role }}
            </button>
          </div>
        </div>

        <!-- Status -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-main">Account Status</label>
          <select
            [(ngModel)]="user.status"
            class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
            <option *ngFor="let status of statuses" [value]="status">{{ status }}</option>
          </select>
        </div>
      </div>

      <!-- MFA Toggle -->
      <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div>
          <p class="text-sm font-medium text-text-main">Multi-Factor Authentication</p>
          <p class="text-xs text-text-muted">Require MFA for account login</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" [(ngModel)]="user.mfaEnabled" class="sr-only peer">
          <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
        </label>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UserFormComponent {
  @Input() user!: User;

  roles: UserRole[] = ['ADMIN', 'MANAGER', 'EMPLOYEE'];
  statuses: UserStatus[] = ['Active', 'Inactive', 'Pending'];
  employees: Employee[] = MOCK_EMPLOYEES;
}
