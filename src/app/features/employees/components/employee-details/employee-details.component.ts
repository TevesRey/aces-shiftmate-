import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component.ts';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component.ts';
import { Employee } from '../models/employee.model.ts';

@Component({
  selector: 'app-employee-details',
  template: `
    <div class="flex flex-col items-center text-center mb-8">
      <app-avatar [name]="employee.firstName + ' ' + employee.lastName" size="lg" class="mb-4"></app-avatar>
      <h2 class="text-2xl font-bold text-primary">{{ employee.firstName }} {{ employee.lastName }}</h2>
      <p class="text-text-muted font-medium">{{ employee.employeeId }}</p>
      <app-status-badge [type]="mapStatus(employee.status)" class="mt-2"></app-status-badge>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-6">
        <h3 class="text-sm font-bold text-text-muted uppercase tracking-wider">Contact Information</h3>
        <div class="space-y-3">
          <div class="flex justify-between py-2 border-b border-text-muted/5">
            <span class="text-sm text-text-muted">Email</span>
            <span class="text-sm font-medium text-text-main">{{ employee.email }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-text-muted/5">
            <span class="text-sm text-text-muted">Phone</span>
            <span class="text-sm font-medium text-text-main">{{ employee.phone }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="text-sm font-bold text-text-muted uppercase tracking-wider">Employment Information</h3>
        <div class="space-y-3">
          <div class="flex justify-between py-2 border-b border-text-muted/5">
            <span class="text-sm text-text-muted">Department</span>
            <span class="text-sm font-medium text-text-main">{{ employee.department }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-text-muted/5">
            <span class="text-sm text-text-muted">Position</span>
            <span class="text-sm font-medium text-text-main">{{ employee.position }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-text-muted/5">
            <span class="text-sm text-text-muted">Date Joined</span>
            <span class="text-sm font-medium text-text-main">{{ employee.dateJoined }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, AvatarComponent, StatusBadgeComponent],
})
export class EmployeeDetailsComponent {
  @Input() employee!: Employee;

  mapStatus(status: string): any {
    const map: Record<string, any> = {
      'Active': 'active',
      'On Leave': 'pending',
      'Inactive': 'cancelled'
    };
    return map[status] || 'active';
  }
}
