import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private collapsed = new BehaviorSubject<boolean>(false);
  collapsed$ = this.collapsed.asObservable();

  private mobileOpen = new BehaviorSubject<boolean>(false);
  mobileOpen$ = this.mobileOpen.asObservable();

  toggleCollapse() {
    this.collapsed.next(!this.collapsed.value);
  }

  toggleMobile() {
    this.mobileOpen.next(!this.mobileOpen.value);
  }

  closeMobile() {
    this.mobileOpen.next(false);
  }
}
