import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../../shared/components/card/card.ts';
import { Button } from '../../../../shared/components/button/button.ts';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
  standalone: true,
  imports: [CommonModule, Card, Button],
})
export class HowItWorksComponent {}
