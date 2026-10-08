import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  dateJoined: string;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private mockEmployees: Employee[] = [
    {
      id: 'EMP001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      department: 'Nursing',
      position: 'Head Nurse',
      status: 'Active',
      dateJoined: '2022-03-15',
    },
    {
      id: 'EMP002',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'm.chen@example.com',
      phone: '+1 (555) 234-5678',
      department: 'Administration',
      position: 'Facility Manager',
      status: 'Active',
      dateJoined: '2021-11-02',
    },
    {
      id: 'EMP003',
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'e.davis@example.com',
      phone: '+1 (555) 345-6789',
      department: 'Nursing',
      position: 'Registered Nurse',
      status: 'On Leave',
      dateJoined: '2023-06-20',
    },
    {
      id: 'EMP004',
      firstName: 'James',
      lastName: 'Wilson',
      email: 'j.wilson@example.com',
      phone: '+1 (555) 456-7890',
      department: 'Maintenance',
      position: 'Technical Lead',
      status: 'Inactive',
      dateJoined: '2020-01-10',
    },
    {
      id: 'EMP005',
      firstName: 'Olivia',
      lastName: 'Brown',
      email: 'o.brown@example.com',
      phone: '+1 (555) 567-8901',
      department: 'Nursing',
      position: 'Nursing Assistant',
      status: 'Active',
      dateJoined: '2023-09-12',
    },
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.mockEmployees);
  employees$ = this.employeesSubject.asObservable();

  getEmployees(): Employee[] {
    return this.employeesSubject.value;
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.getEmployees().find(e => e.id === id);
  }

  addEmployee(employee: Employee): void {
    const updated = [...this.getEmployees(), employee];
    this.employeesSubject.next(updated);
  }

  updateEmployee(id: string, updates: Partial<Employee>): void {
    const updated = this.getEmployees().map(e => e.id === id ? { ...e, ...updates } : e);
    this.employeesSubject.next(updated);
  }

  deleteEmployee(id: string): void {
    const updated = this.getEmployees().filter(e => e.id !== id);
    this.employeesSubject.next(updated);
  }
}
