import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component.ts';
import { Button } from '../../../shared/components/button/button.ts';

@Component({
  selector: 'app-user-filters',
  template: `
    <div class="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
      <div class="w-full md:w-96">
        <app-search-input
          placeholder="Search users..."
          (search)="onSearch($event)">
        </app-search-input>
      </div>

      <div class="flex flex-wrap gap-3 items-center">
        <div class="flex items-center gap-2">
          <select
            (change)="onFilterChange('role', $event)"
            class="px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
            <option value="">Role: All</option>
            <option value="ADMIN">Administrator</option>
            <option value="MANAGER">Manager</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <select
            (change)="onFilterChange('status', $event)"
            class="px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
            <option value="">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <select
            (change)="onFilterChange('department', $event)"
            class="px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
            <option value="">Department: All</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        <app-button
          *ngIf="hasFilters"
          variant="ghost"
          size="sm"
          (click)="resetFilters()">
          Reset Filters
        </app-button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, SearchInputComponent, Button],
})
export class UserFiltersComponent {
  @Output() filterChanged = new EventEmitter<{ search: string; role: string; status: string; department: string }>();
  @Input() hasFilters = false;

  private currentFilters = {
    search: '',
    role: '',
    status: '',
    department: ''
  };

  onSearch(value: string) {
    this.currentFilters.search = value.toLowerCase();
    this.filterChanged.emit({ ...this.currentFilters });
  }

  onFilterChange(field: string, event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    (this.currentFilters as any)[field] = value;
    this.filterChanged.emit({ ...this.currentFilters });
  }

  resetFilters() {
    this.currentFilters = { search: '', role: '', status: '', department: '' };
    this.filterChanged.emit({ ...this.currentFilters });
  }
}
