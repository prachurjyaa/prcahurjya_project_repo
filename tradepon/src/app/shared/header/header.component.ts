import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/trading', label: 'Trading' },
    { path: '/coupons', label: 'Coupons' },
    { path: '/contact', label: 'Contact' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/login', label: 'Login' }
  ];
}
