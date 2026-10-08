import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
  standalone: true,
  imports: [CommonModule, Button],
})
export class ForgotPasswordComponent {
  isLoading = false;
}
