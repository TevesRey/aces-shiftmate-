export type ShiftStatus = 'Scheduled' | 'Active' | 'Completed' | 'Cancelled';

export interface Shift {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  department: string;
  position: string;
  date: string; // ISO format YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: ShiftStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
