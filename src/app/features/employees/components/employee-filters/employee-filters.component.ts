import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-employee-filters',
  template: `
    <div class="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
      <div class="w-full md:w-96">
        <app-search-input
          placeholder="Search employees..."
          (search)="onSearch($event)">
        </app-search-input>
      </div>

      <div class="flex flex-wrap gap-3 items-center">
        <div class="flex items-center gap-2">
          <select
            (change)="onFilterChange('status', $event)"
            class="px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
            <option value="">Status: All</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
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

        <div class="flex items-center gap-2">
          <select
            (change)="onFilterChange('position', $event)"
            class="px-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
            <option value="">Position: All</option>
            <option value="Software Developer">Software Developer</option>
            <option value="HR Specialist">HR Specialist</option>
            <option value="Accountant">Accountant</option>
            <option value="Operations Manager">Operations Manager</option>
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
export class EmployeeFiltersComponent {
  @Output() filterChanged = new EventEmitter<{ search: string; status: string; department: string; position: string }>();
  @Input() hasFilters = false;

  private currentFilters = {
    search: '',
    status: '',
    department: '',
    position: ''
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
    this.currentFilters = { search: '', status: '', department: '', position: '' };
    this.filterChanged.emit({ ...this.currentFilters });
  }
}
