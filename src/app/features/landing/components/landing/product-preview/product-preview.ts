import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../../shared/components/card/card';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.html',
  styleUrl: './product-preview.css',
  standalone: true,
  imports: [CommonModule, Card, Button],
})
export class ProductPreviewComponent {}
