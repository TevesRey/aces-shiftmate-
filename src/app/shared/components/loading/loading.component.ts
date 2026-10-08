import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  template: `
    <div class="w-full space-y-4">
      <div class="flex gap-4">
        <div class="h-12 w-12 rounded-full bg-slate-200 animate-pulse"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 w-1/4 rounded bg-slate-200 animate-pulse"></div>
          <div class="h-3 w-1/2 rounded bg-slate-200 animate-pulse"></div>
        </div>
      </div>
      <div class="h-32 w-full rounded-xl bg-slate-100 animate-pulse border border-slate-200"></div>
      <div class="grid grid-cols-3 gap-4">
        <div class="h-20 rounded-xl bg-slate-100 animate-pulse border border-slate-200"></div>
        <div class="h-20 rounded-xl bg-slate-100 animate-pulse border border-slate-200"></div>
        <div class="h-20 rounded-xl bg-slate-100 animate-pulse border border-slate-200"></div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class LoadingComponent {}
