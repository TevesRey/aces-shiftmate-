import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

@Component({
  selector: 'app-page-header',
  template: `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-primary">{{ title }}</h1>
        <p class="text-text-muted mt-1">{{ description }}</p>
      </div>
      <div class="flex items-center gap-3">
        <ng-content select="[actions]"></ng-content>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class PageHeaderComponent {
  @Input() title: string = 'Page Title';
  @Input() description: string = 'Page description goes here.';
}
