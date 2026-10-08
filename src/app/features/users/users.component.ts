import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component.ts';
import { Button } from '../../shared/components/button/button.ts';
import { Modal } from '../../shared/components/modal/modal';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component.ts';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { UserFiltersComponent } from './components/user-filters/user-filters.component';
import { UserTableComponent } from './components/user-table/user-table.ts';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { User, UserRole } from './models/user.model';
import { MOCK_USERS } from './models/mock-users';
import { Employee } from '../employees/models/employee.model';
import { MOCK_EMPLOYEES } from '../employees/models/mock-employees';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    StatCardComponent,
    Button,
    Modal,
    SearchInputComponent,
    UserStatsComponent,
    UserFiltersComponent,
    UserTableComponent,
    UserFormComponent,
    UserDetailsComponent,
    EmptyStateComponent,
    LoadingComponent
  ],
})
export class UsersComponent implements OnInit {
  users: User[] = [...MOCK_USERS];
  filteredUsers: User[] = [...MOCK_USERS];
  isLoading = false;

  modalOpen = false;
  modalType: 'add' | 'edit' | 'view' | 'role' | null = null;
  selectedUser: User | null = null;

  filters = {
    search: '',
    role: '',
    status: '',
    department: ''
  };

  ngOnInit() {
    this.applyFilters();
  }

  get stats() {
    return {
      total: this.users.length,
      active: this.users.filter(u => u.status === 'Active').length,
      managers: this.users.filter(u => u.role === 'MANAGER').length,
      pending: this.users.filter(u => u.status !== 'Active').length,
    };
  }

  handleFilterChange(newFilters: any) {
    this.filters = { ...newFilters };
    this.applyFilters();
  }

  handleFilterReset() {
    this.filters = { search: '', role: '', status: '', department: '' };
    this.applyFilters();
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const employee = MOCK_EMPLOYEES.find(e => e.id === user.employeeId);

      const matchesSearch = !this.filters.search ||
        user.email.toLowerCase().includes(this.filters.search) ||
        (employee && employee.firstName.toLowerCase().includes(this.filters.search)) ||
        (employee && employee.lastName.toLowerCase().includes(this.filters.search));

      const matchesRole = !this.filters.role || user.role === this.filters.role;
      const matchesStatus = !this.filters.status || user.status === this.filters.status;
      const matchesDept = !this.filters.department || (employee && employee.department === this.filters.department);

      return matchesSearch && matchesRole && matchesStatus && matchesDept;
    });
  }

  openAddModal() {
    this.modalType = 'add';
    this.selectedUser = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId: '',
      email: '',
      role: 'EMPLOYEE',
      status: 'Pending',
      lastActive: new Date().toISOString(),
      mfaEnabled: false,
      createdAt: new Date().toISOString(),
    };
    this.modalOpen = true;
  }

  openEditModal(user: User) {
    this.modalType = 'edit';
    this.selectedUser = { ...user };
    this.modalOpen = true;
  }

  openViewModal(user: User) {
    this.modalType = 'view';
    this.selectedUser = user;
    this.modalOpen = true;
  }

  openRoleModal(user: User) {
    this.modalType = 'role';
    this.selectedUser = user;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.modalType = null;
    this.selectedUser = null;
  }

  saveUser(user: User) {
    if (this.modalType === 'add') {
      this.users = [...this.users, user];
    } else if (this.modalType === 'edit') {
      this.users = this.users.map(u => u.id === user.id ? user : u);
    }
    this.applyFilters();
    this.closeModal();
  }

  updateRole(role: UserRole) {
    if (!this.selectedUser) return;
    this.users = this.users.map(u => u.id === this.selectedUser?.id ? { ...u, role } : u);
    this.applyFilters();
    this.closeModal();
  }

  toggleStatus(user: User) {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    this.users = this.users.map(u => u.id === user.id ? { ...u, status: newStatus } : u);
    this.applyFilters();
  }

  handleUserAction(action: { type: 'view' | 'edit' | 'role' | 'toggle', user: User }) {
    const { type, user } = action;
    if (type === 'view') {
      this.openViewModal(user);
    } else if (type === 'edit') {
      this.openEditModal(user);
    } else if (type === 'role') {
      this.openRoleModal(user);
    } else if (type === 'toggle') {
      this.toggleStatus(user);
    }
  }
}
