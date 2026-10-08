import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder',
  template: `
    <div class="flex flex-col items-center justify-center py-20 text-center">
      <div class="h-24 w-24 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-6">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <h2 class="text-2xl font-bold text-primary mb-2">Coming Soon</h2>
      <p class="text-text-muted max-w-xs">This module is currently under development and will be available in a future update.</p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class PlaceholderComponent {}
