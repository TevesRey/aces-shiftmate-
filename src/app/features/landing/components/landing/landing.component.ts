import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { HeroComponent } from './hero/hero';
import { FeaturesComponent } from './features/features';
import { ProductPreviewComponent } from './product-preview/product-preview';
import { RolesComponent } from './roles/roles';
import { HowItWorksComponent } from './how-it-works/how-it-works';
import { CtaComponent } from './cta/cta';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    HeroComponent,
    FeaturesComponent,
    ProductPreviewComponent,
    RolesComponent,
    HowItWorksComponent,
    CtaComponent,
    FooterComponent,
  ],
})
export class LandingComponent {}
