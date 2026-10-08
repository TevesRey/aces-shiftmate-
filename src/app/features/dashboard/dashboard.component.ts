import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component.ts';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component.ts';
import { Card } from '../../shared/components/card/card.ts';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component.ts';
import { Button } from '../../shared/components/button/button.ts';

interface Stat {
  label: string;
  value: string;
  trend: number;
  trendLabel: string;
}

interface Shift {
  id: string;
  employee: string;
  position: string;
  time: string;
  status: 'active' | 'scheduled' | 'pending' | 'completed';
  date: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'shift' | 'assignment' | 'system' | 'user';
}

interface WeeklyData {
  day: string;
  scheduled: number;
  completed: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, StatCardComponent, StatusBadgeComponent, Card, AvatarComponent, Button],
})
export class DashboardComponent {
  userName = 'Elton';

  stats: Stat[] = [
    { label: 'Active Employees', value: '128', trend: 8.2, trendLabel: 'this month' },
    { label: 'Shifts Today', value: '24', trend: 12, trendLabel: 'vs yesterday' },
    { label: 'Scheduled', value: '18', trend: -2.4, trendLabel: 'next 7 days' },
    { label: 'Pending', value: '6', trend: 0, trendLabel: 'requires attention' },
  ];

  todayShifts: Shift[] = [
    { id: '1', employee: 'John Doe', position: 'Developer', time: '08:00 – 17:00', status: 'active', date: '2026-10-08' },
    { id: '2', employee: 'Jane Smith', position: 'Designer', time: '09:00 – 18:00', status: 'scheduled', date: '2026-10-08' },
    { id: '3', employee: 'Mark Wilson', position: 'Manager', time: '08:00 – 17:00', status: 'active', date: '2026-10-08' },
    { id: '4', employee: 'Sarah Johnson', position: 'HR Specialist', time: '09:00 – 18:00', status: 'completed', date: '2026-10-08' },
  ];

  upcomingShifts: { date: string, shifts: Shift[] }[] = [
    {
      date: 'Tomorrow, 09 Oct',
      shifts: [
        { id: '5', employee: 'John Doe', position: 'Developer', time: '08:00 – 17:00', status: 'scheduled', date: '2026-10-09' },
        { id: '6', employee: 'Jane Smith', position: 'Designer', time: '09:00 – 18:00', status: 'scheduled', date: '2026-10-09' },
      ]
    },
    {
      date: '10 Oct',
      shifts: [
        { id: '7', employee: 'Mark Wilson', position: 'Manager', time: '08:00 – 17:00', status: 'scheduled', date: '2026-10-10' },
      ]
    }
  ];

  activities: Activity[] = [
    { id: 'a1', user: 'John Doe', action: 'started a shift', timestamp: 'Today · 8:02 AM', type: 'shift' },
    { id: 'a2', user: 'Jane Smith', action: 'was assigned a new schedule', timestamp: 'Today · 7:45 AM', type: 'assignment' },
    { id: 'a3', user: 'Mark Wilson', action: 'updated an employee record', timestamp: 'Yesterday · 4:20 PM', type: 'user' },
    { id: 'a4', user: 'Sarah Johnson', action: 'completed a shift', timestamp: 'Yesterday · 5:03 PM', type: 'shift' },
  ];

  weeklyOverview: WeeklyData[] = [
    { day: 'Mon', scheduled: 18, completed: 15 },
    { day: 'Tue', scheduled: 22, completed: 19 },
    { day: 'Wed', scheduled: 20, completed: 17 },
    { day: 'Thu', scheduled: 24, completed: 20 },
    { day: 'Fri', scheduled: 21, completed: 18 },
    { day: 'Sat', scheduled: 12, completed: 10 },
    { day: 'Sun', scheduled: 8, completed: 6 },
  ];

  get maxWeeklyValue(): number {
    const scheduledMax = Math.max(...this.weeklyOverview.map(d => d.scheduled));
    const completedMax = Math.max(...this.weeklyOverview.map(d => d.completed));
    return Math.max(scheduledMax, completedMax);
  }
}
