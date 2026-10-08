import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from './button/button';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div class="h-20 w-20 rounded-full bg-slate-100 text-text-muted flex items-center justify-center mb-4">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 016.586 13H4" /></svg>
      </div>
      <h3 class="text-lg font-bold text-primary mb-1">{{ title }}</h3>
      <p class="text-text-muted max-w-xs mb-6">{{ description }}</p>
      <app-button *ngIf="ctaLabel" [variant]="ctaVariant" (click)="ctaAction()">
        {{ ctaLabel }}
      </app-button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, Button],
})
export class EmptyStateComponent {
  @Input() title: string = 'No data found';
  @Input() description: string = 'There is currently nothing to display here.';
  @Input() ctaLabel?: string;
  @Input() ctaVariant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' = 'primary';

  ctaAction() {
    console.log('CTA Action triggered');
  }
}
