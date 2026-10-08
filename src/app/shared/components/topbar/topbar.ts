import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
})
export class TopbarComponent {
  pageTitle = 'Dashboard';
  pageSubtitle = 'Welcome back, Administrator';

  user = {
    name: 'Elton John',
    role: 'Administrator',
    status: 'online' as const
  };

  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    if (window.innerWidth < 1024) {
      this.sidebarService.toggleMobile();
    } else {
      this.sidebarService.toggleCollapse();
    }
  }
}
