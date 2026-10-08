export type UserRole = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface User {
  id: string;
  employeeId: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  mfaEnabled: boolean;
  createdAt: string;
}
