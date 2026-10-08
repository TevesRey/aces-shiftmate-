import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  styleUrl: './button.css',
  templateUrl: './button.html',
  standalone: true,
  imports: [CommonModule],
})
export class Button {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;

  getButtonClasses() {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm',
      outline: 'border border-text-muted/30 bg-transparent text-text-main hover:bg-text-main/5',
      ghost: 'bg-transparent text-text-main hover:bg-text-main/5',
      destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
  }
}
