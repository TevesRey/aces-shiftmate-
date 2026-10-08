import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../shared/components/button/button.ts';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [CommonModule, Button],
})
export class LoginComponent {
  // UI State for visual demonstration
  hasError = false;
  isLoading = false;
}
