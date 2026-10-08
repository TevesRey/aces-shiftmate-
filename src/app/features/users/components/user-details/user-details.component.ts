import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model.ts';
import { Employee } from '../employees/models/employee.model.ts';
import { MOCK_EMPLOYEES } from '../employees/models/mock-employees.ts';

@Component({
  selector: 'app-user-details',
  template: `
    <div class="p-6 space-y-8">
      <!-- User Header -->
      <div class="flex items-center gap-4 pb-6 border-b border-text-muted/10">
        <div class="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl">
          {{ getUserInitials() }}
        </div>
        <div>
          <h3 class="text-xl font-bold text-text-main">{{ getFullName() }}</h3>
          <p class="text-sm text-text-muted">{{ user.email }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Account Information -->
        <div class="space-y-4">
          <h4 class="text-xs font-bold uppercase text-text-muted tracking-wider">Account Information</h4>
          <div class="space-y-3">
            <div class="flex justify-between py-2 border-b border-text-muted/5">
              <span class="text-sm text-text-muted">Role</span>
              <span class="text-sm font-medium">{{ user.role }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-text-muted/5">
              <span class="text-sm text-text-muted">Status</span>
              <span class="text-sm font-medium">{{ user.status }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-text-muted/5">
              <span class="text-sm text-text-muted">MFA Enabled</span>
              <span class="text-sm font-medium">{{ user.mfaEnabled ? 'Yes' : 'No' }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-text-muted/5">
              <span class="text-sm text-text-muted">Joined Date</span>
              <span class="text-sm font-medium">{{ user.createdAt | date:'mediumDate' }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-text-muted/5">
              <span class="text-sm text-text-muted">Last Active</span>
              <span class="text-sm font-medium">{{ user.lastActive | date:'medium' }}</span>
            </div>
          </div>
        </div>

        <!-- Employee Information -->
        <div class="space-y-4">
          <h4 class="text-xs font-bold uppercase text-text-muted tracking-wider">Linked Employee</h4>
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
            <div class="flex justify-between py-2 border-b border-slate-200/50">
              <span class="text-sm text-text-muted">Name</span>
              <span class="text-sm font-medium">{{ getFullName() }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-slate-200/50">
              <span class="text-sm text-text-muted">ID</span>
              <span class="text-sm font-medium">{{ user.employeeId }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-slate-200/50">
              <span class="text-sm text-text-muted">Department</span>
              <span class="text-sm font-medium">{{ getDepartment() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class UserDetailsComponent {
  @Input() user!: User;

  getEmployee() {
    return MOCK_EMPLOYEES.find(e => e.id === this.user.employeeId);
  }

  getFullName(): string {
    const emp = this.getEmployee();
    return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown Employee';
  }

  getUserInitials(): string {
    const name = this.getFullName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getDepartment(): string {
    const emp = this.getEmployee();
    return emp ? emp.department : 'N/A';
  }
}
