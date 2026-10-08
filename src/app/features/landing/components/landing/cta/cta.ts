import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.html',
  styleUrl: './cta.css',
  standalone: true,
  imports: [CommonModule, Button],
})
export class CtaComponent {}
