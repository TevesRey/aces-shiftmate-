import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class AuthLayoutComponent {}
