import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
  standalone: true,
  imports: [CommonModule, Button],
})
export class EmptyStateComponent {}
