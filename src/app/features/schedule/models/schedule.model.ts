import { Shift } from '../shifts/models/shift.model';

export interface ScheduleEntry {
  employeeId: string;
  employeeName: string;
  shifts: Shift[];
}

export interface WeeklySchedule {
  startDate: Date;
  endDate: Date;
  entries: ScheduleEntry[];
}
