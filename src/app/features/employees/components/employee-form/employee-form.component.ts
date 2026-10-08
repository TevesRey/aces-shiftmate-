import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import { Employee, EmployeeStatus } from '../models/employee.model';

@Component({
  selector: 'app-employee-form',
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">First Name</label>
        <input
          [(ngModel)]="employee.firstName"
          type="text"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
          placeholder="Enter first name" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Last Name</label>
        <input
          [(ngModel)]="employee.lastName"
          type="text"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
          placeholder="Enter last name" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Email</label>
        <input
          [(ngModel)]="employee.email"
          type="email"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
          placeholder="email@company.com" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Phone</label>
        <input
          [(ngModel)]="employee.phone"
          type="text"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
          placeholder="+1 (555) 000-0000" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Employee ID</label>
        <input
          [(ngModel)]="employee.employeeId"
          type="text"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
          placeholder="EMP-000" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Department</label>
        <select
          [(ngModel)]="employee.department"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Position</label>
        <input
          [(ngModel)]="employee.position"
          type="text"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
          placeholder="e.g. Software Engineer" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Date Joined</label>
        <input
          [(ngModel)]="employee.dateJoined"
          type="date"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-bold text-text-muted uppercase tracking-wider">Status</label>
        <select
          [(ngModel)]="employee.status"
          class="w-full px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
})
export class EmployeeFormComponent {
  @Input() employee: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: 'Engineering',
    position: '',
    dateJoined: '',
    status: 'Active'
  };
}
