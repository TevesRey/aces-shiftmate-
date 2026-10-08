import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class SidebarComponent {
  collapsed = false;
  mobileOpen = false;

  navItems = [
    {
      section: 'Workspace',
      items: [
        { label: 'Dashboard', route: '/app/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { label: 'Employees', route: '/app/employees', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20a3 3 0 01-3-3M12 20h-5v-2a3 3 0 01-5.356-1.857M12 20a3 3 0 01-3-3' },
        { label: 'Shifts', route: '/app/shifts', icon: 'M8 7V3m8 4V3m-9 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2v-11a2 2 0 012-2z' },
        { label: 'Schedule', route: '/app/schedule', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
      ]
    },
    {
      section: 'Management',
      items: [
        { label: 'Users', route: '/app/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z' },
        { label: 'Reports', route: '/app/reports', icon: 'M9 17v-2m3 2v-4m3 2v-4M9 17l6-6m0 0l6 6m-6-6v12' },
      ]
    },
    {
      section: 'Personal',
      items: [
        { label: 'Profile', route: '/app/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { label: 'Settings', route: '/app/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
      ]
    }
  ];

  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit() {
    this.sidebarService.collapsed$.subscribe(val => this.collapsed = val);
    this.sidebarService.mobileOpen$.subscribe(val => this.mobileOpen = val);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.sidebarService.closeMobile();
  }
}
