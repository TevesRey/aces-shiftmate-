import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../../shared/components/card/card.ts';
import { Button } from '../../../../shared/components/button/button.ts';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.html',
  styleUrl: './roles.css',
  standalone: true,
  imports: [CommonModule, Card, Button],
})
export class RolesComponent {}
