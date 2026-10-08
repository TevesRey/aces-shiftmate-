import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Button } from '../../shared/components/button/button.ts';
import { Modal } from '../../shared/components/modal/modal';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component.ts';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component.ts';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component.ts';
import { Card } from '../../shared/components/card/card.ts';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ShiftFormComponent } from '../shifts/components/shift-form/shift-form.component';
import { ShiftDetailsComponent } from '../shifts/components/shift-details/shift-details.component';
import { Shift, ShiftStatus } from '../shifts/models/shift.model';
import { MOCK_SHIFTS } from '../shifts/models/mock-shifts';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    Button,
    Modal,
    SearchInputComponent,
    AvatarComponent,
    StatusBadgeComponent,
    Card,
    EmptyStateComponent,
    LoadingComponent,
    ShiftFormComponent,
    ShiftDetailsComponent
  ],
})
export class ScheduleComponent implements OnInit {
  shifts: Shift[] = [...MOCK_SHIFTS];
  filteredShifts: Shift[] = [...MOCK_SHIFTS];
  isLoading = false;

  // Date Navigation
  currentWeekStart = new Date();
  viewMode: 'week' | 'month' = 'week';

  // Modal State
  modalOpen = false;
  modalType: 'add' | 'edit' | 'view' | null = null;
  selectedShift: Shift | null = null;

  // Filter State
  filters = {
    search: '',
    status: '',
    department: ''
  };

  ngOnInit() {
    this.setWeekStartToMonday();
    this.applyFilters();
  }

  setWeekStartToMonday() {
    const day = this.currentWeekStart.getDay();
    const diff = this.currentWeekStart.getDate() - day + (day === 0 ? -6 : 1);
    this.currentWeekStart.setDate(diff);
    this.currentWeekStart.setHours(0, 0, 0, 0);
  }

  get dateRangeLabel(): string {
    const start = new Date(this.currentWeekStart);
    const end = new Date(this.currentWeekStart);
    end.setDate(start.getDate() + 6);

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} – ${end.toLocaleDateString('en-US', options)}`;
  }

  get weekDays(): Date[] {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(this.currentWeekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }

  nextWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.applyFilters();
  }

  prevWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.applyFilters();
  }

  goToToday() {
    this.currentWeekStart = new Date();
    this.setWeekStartToMonday();
    this.applyFilters();
  }

  handleSearch(query: string) {
    this.filters.search = query.toLowerCase();
    this.applyFilters();
  }

  handleFilterChange(field: string, value: string) {
    (this.filters as any)[field] = value;
    this.applyFilters();
  }

  handleFilterReset() {
    this.filters = { search: '', status: '', department: '' };
    this.applyFilters();
  }

  applyFilters() {
    this.filteredShifts = this.shifts.filter(shift => {
      const matchesSearch = !this.filters.search ||
        shift.employeeName.toLowerCase().includes(this.filters.search) ||
        shift.department.toLowerCase().includes(this.filters.search);
      const matchesStatus = !this.filters.status || shift.status === this.filters.status;
      const matchesDept = !this.filters.department || shift.department === this.filters.department;

      // Only show shifts within the current viewed week
      const shiftDate = new Date(shift.date);
      const weekEnd = new Date(this.currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      const matchesDate = shiftDate >= this.currentWeekStart && shiftDate < weekEnd;

      return matchesSearch && matchesStatus && matchesDept && matchesDate;
    });
  }

  openAddModal() {
    this.modalType = 'add';
    this.selectedShift = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId: '',
      employeeName: '',
      department: '',
      position: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '17:00',
      status: 'Scheduled',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.modalOpen = true;
  }

  openEditModal(shift: Shift) {
    this.modalType = 'edit';
    this.selectedShift = { ...shift };
    this.modalOpen = true;
  }

  openViewModal(shift: Shift) {
    this.modalType = 'view';
    this.selectedShift = shift;
    this.modalOpen = true;
  }

  // Helper to find a shift for an employee on a specific day
  shiftFor(employee: Shift, day: Date): Shift | null {
    const dateStr = day.toISOString().split('T')[0];
    return this.filteredShifts.find(s =>
      s.employeeName === employee.employeeName && s.date === dateStr
    ) || null;
  }

  // Helper to find all shifts for a specific day (Mobile view)
  shiftsForDay(day: Date): Shift[] {
    const dateStr = day.toISOString().split('T')[0];
    return this.filteredShifts.filter(s => s.date === dateStr);
  }

  mapStatus(status: string): any {
    const map: Record<string, any> = {
      'Scheduled': 'scheduled',
      'Active': 'active',
      'Completed': 'completed',
      'Cancelled': 'cancelled'
    };
    return map[status] || 'scheduled';
  }

  closeModal() {
    this.modalOpen = false;
    this.modalType = null;
    this.selectedShift = null;
  }

  saveShift(shift: Shift) {
    if (this.modalType === 'add') {
      this.shifts = [...this.shifts, shift];
    } else if (this.modalType === 'edit') {
      this.shifts = this.shifts.map(s => s.id === shift.id ? shift : s);
    }
    this.applyFilters();
    this.closeModal();
  }

  cancelShift(shift: Shift) {
    if (confirm(`Are you sure you want to cancel ${shift.employeeName}'s shift?`)) {
      this.shifts = this.shifts.map(s => s.id === shift.id ? { ...s, status: 'Cancelled' } : s);
      this.applyFilters();
    }
  }
}
