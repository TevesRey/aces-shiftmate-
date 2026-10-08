import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  template: `
    <div class="relative group">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-secondary transition-colors">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>
      <input
        type="text"
        [placeholder]="placeholder"
        (input)="onInput($event)"
        class="w-full pl-10 pr-3 py-2 border border-text-muted/30 rounded-lg bg-surface text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
      />
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Search...';
  @Output() search = new EventEmitter<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }
}
