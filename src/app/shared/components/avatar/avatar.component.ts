import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="relative inline-block">
      <div [class]="avatarClasses">
        <ng-container *ngIf="imageUrl; else initials">
          <img [src]="imageUrl" [alt]="name" class="h-full w-full rounded-full object-cover" />
        </ng-container>
        <ng-template #initials>
          <span class="flex h-full w-full items-center justify-center text-sm font-medium text-white">
            {{ getInitials() }}
          </span>
        </ng-template>
      </div>
      <div *ngIf="status === 'online'" class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-accent"></div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class AvatarComponent {
  @Input() imageUrl?: string;
  @Input() name: string = 'User';
  @Input() status: 'online' | 'offline' = 'offline';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get avatarClasses() {
    const sizes = {
      sm: 'h-6 w-6 text-[10px]',
      md: 'h-8 w-8 text-xs',
      lg: 'h-12 w-12 text-sm',
    };
    return `relative flex items-center justify-center rounded-full bg-primary text-primary-foreground overflow-hidden ${sizes[this.size]}`;
  }

  getInitials() {
    return this.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
