import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { Button } from '../../shared/components/button/button';
import { Modal } from '../../shared/components/modal/modal';
import { ShiftStatsComponent } from './components/shift-stats/shift-stats.component';
import { ShiftFiltersComponent } from './components/shift-filters/shift-filters.component';
import { ShiftTableComponent } from './components/shift-table/shift-table';
import { ShiftFormComponent } from './components/shift-form/shift-form.component';
import { ShiftDetailsComponent } from './components/shift-details/shift-details.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { LoadingComponent } from '../../shared/components/loading/loading';
import { Shift, ShiftStatus } from './models/shift.model';
import { MOCK_SHIFTS } from './models/mock-shifts';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrl: './shifts.component.css',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    StatCardComponent,
    Button,
    Modal,
    ShiftStatsComponent,
    ShiftFiltersComponent,
    ShiftTableComponent,
    ShiftFormComponent,
    ShiftDetailsComponent,
    EmptyStateComponent,
    LoadingComponent
  ],
})
export class ShiftsComponent implements OnInit {
  shifts: Shift[] = [...MOCK_SHIFTS];
  filteredShifts: Shift[] = [...MOCK_SHIFTS];
  isLoading = false;

  modalOpen = false;
  modalType: 'add' | 'edit' | 'view' | null = null;
  selectedShift: Shift | null = null;

  filters = {
    search: '',
    status: '',
    date: '',
    department: ''
  };

  ngOnInit() {
    this.applyFilters();
  }

  get stats() {
    const today = new Date().toISOString().split('T')[0];
    return {
      today: this.shifts.filter(s => s.date === today).length,
      scheduled: this.shifts.filter(s => s.status === 'Scheduled').length,
      active: this.shifts.filter(s => s.status === 'Active').length,
      completed: this.shifts.filter(s => s.status === 'Completed').length,
    };
  }

  handleFilterChange(newFilters: any) {
    this.filters = { ...newFilters };
    this.applyFilters();
  }

  handleFilterReset() {
    this.filters = { search: '', status: '', date: '', department: '' };
    this.applyFilters();
  }

  applyFilters() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    this.filteredShifts = this.shifts.filter(shift => {
      const matchesSearch = !this.filters.search ||
        shift.employeeName.toLowerCase().includes(this.filters.search) ||
        shift.department.toLowerCase().includes(this.filters.search) ||
        shift.position.toLowerCase().includes(this.filters.search);

      const matchesStatus = !this.filters.status || shift.status === this.filters.status;
      const matchesDept = !this.filters.department || shift.department === this.filters.department;

      let matchesDate = true;
      if (this.filters.date === 'today') matchesDate = shift.date === today;
      else if (this.filters.date === 'tomorrow') matchesDate = shift.date === tomorrow;
      else if (this.filters.date === 'week') {
        const shiftDate = new Date(shift.date);
        const now = new Date();
        const diff = (shiftDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        matchesDate = diff >= 0 && diff <= 7;
      }

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

  handleShiftAction(event: { type: 'view' | 'edit' | 'cancel', shift: Shift }) {
    if (event.type === 'view') {
      this.openViewModal(event.shift);
    } else if (event.type === 'edit') {
      this.openEditModal(event.shift);
    } else if (event.type === 'cancel') {
      this.cancelShift(event.shift);
    }
  }

  cancelShift(shift: Shift) {
    if (confirm(`Are you sure you want to cancel ${shift.employeeName}'s shift scheduled for ${shift.date}?`)) {
      this.shifts = this.shifts.map(s => s.id === shift.id ? { ...s, status: 'Cancelled' } : s);
      this.applyFilters();
    }
  }
}
