import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { Button } from '../../shared/components/button/button';
import { Modal } from '../../shared/components/modal/modal';
import { EmployeeStatsComponent } from './components/employee-stats/employee-stats.component';
import { EmployeeFiltersComponent } from './components/employee-filters/employee-filters.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { LoadingComponent } from '../../shared/components/loading/loading';
import { Employee, EmployeeStatus } from './models/employee.model';
import { MOCK_EMPLOYEES } from './models/mock-employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    StatCardComponent,
    Button,
    Modal,
    EmployeeStatsComponent,
    EmployeeFiltersComponent,
    EmployeeTableComponent,
    EmployeeFormComponent,
    EmployeeDetailsComponent,
    EmptyStateComponent,
    LoadingComponent
  ],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [...MOCK_EMPLOYEES];
  filteredEmployees: Employee[] = [...MOCK_EMPLOYEES];
  isLoading = false;

  modalOpen = false;
  modalType: 'add' | 'edit' | 'view' | null = null;
  selectedEmployee: Employee | null = null;

  filters = {
    search: '',
    status: '',
    department: '',
    position: ''
  };

  ngOnInit() {
    this.applyFilters();
  }

  get stats() {
    return {
      total: this.employees.length,
      active: this.employees.filter(e => e.status === 'Active').length,
      onLeave: this.employees.filter(e => e.status === 'On Leave').length,
      inactive: this.employees.filter(e => e.status === 'Inactive').length,
    };
  }

  handleFilterChange(newFilters: any) {
    this.filters = { ...newFilters };
    this.applyFilters();
  }

  handleFilterReset() {
    this.filters = { search: '', status: '', department: '', position: '' };
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEmployees = this.employees.filter(emp => {
      const matchesSearch = !this.filters.search ||
        emp.firstName.toLowerCase().includes(this.filters.search) ||
        emp.lastName.toLowerCase().includes(this.filters.search) ||
        emp.email.toLowerCase().includes(this.filters.search) ||
        emp.employeeId.toLowerCase().includes(this.filters.search) ||
        emp.department.toLowerCase().includes(this.filters.search) ||
        emp.position.toLowerCase().includes(this.filters.search);

      const matchesStatus = !this.filters.status || emp.status === this.filters.status;
      const matchesDept = !this.filters.department || emp.department === this.filters.department;
      const matchesPos = !this.filters.position || emp.position === this.filters.position;

      return matchesSearch && matchesStatus && matchesDept && matchesPos;
    });
  }

  openAddModal() {
    this.modalType = 'add';
    this.selectedEmployee = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      employeeId: '',
      department: 'Engineering',
      position: '',
      dateJoined: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    this.modalOpen = true;
  }

  openEditModal(employee: Employee) {
    this.modalType = 'edit';
    this.selectedEmployee = { ...employee };
    this.modalOpen = true;
  }

  openViewModal(employee: Employee) {
    this.modalType = 'view';
    this.selectedEmployee = employee;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.modalType = null;
    this.selectedEmployee = null;
  }

  saveEmployee(employee: Employee) {
    if (this.modalType === 'add') {
      this.employees = [...this.employees, employee];
    } else if (this.modalType === 'edit') {
      this.employees = this.employees.map(e => e.id === employee.id ? employee : e);
    }
    this.applyFilters();
    this.closeModal();
  }

  handleEmployeeAction(event: { type: 'view' | 'edit' | 'deactivate', employee: Employee }) {
    if (event.type === 'view') {
      this.openViewModal(event.employee);
    } else if (event.type === 'edit') {
      this.openEditModal(event.employee);
    } else if (event.type === 'deactivate') {
      this.deactivateEmployee(event.employee);
    }
  }

  deactivateEmployee(employee: Employee) {
    if (confirm(`Are you sure you want to deactivate ${employee.firstName} ${employee.lastName}?`)) {
      this.employees = this.employees.map(e => e.id === employee.id ? { ...e, status: 'Inactive' } : e);
      this.applyFilters();
    }
  }
}
