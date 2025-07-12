import { Component } from '@angular/core';
import { ToastComponent } from '../../shared/toast/toast.component';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToastComponent, DecimalPipe, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Login logic
  loginUserType = 'customer';
  loginId = '';
  loginPassword = '';
  isLoggedIn = false;
  loggedInUser = '';
  loginError = '';
  dummyEmployee = { id: 'employee1', password: 'emp123' };
  dummyCustomer = { id: 'customer1', password: 'cust123' };
  // Search & dark mode
  searchTerm = '';
  darkMode = false;
  toastMessage = '';
  isToastActive = false;
  isDarkModeActive = false;

  // Animated counters
  couponsCount = 0;
  usersCount = 0;
  tradesCount = 0;

  // Live trading feed
  trades: { user: string; coupon: string; time: string }[] = [];
  tradeCoupons = ['Zomato', 'Swiggy', 'Uber', 'BookMyShow', 'Amazon', 'Flipkart'];
  tradeUsers = ['Amit', 'Priya', 'Rahul', 'Sneha', 'Vikram', 'Sara'];

  // User-uploaded coupons for sale
  userCoupons: { name: string; description: string; price: number; image?: string }[] = [];
  uploadCoupon = { name: '', description: '', price: 0, image: '' };
  uploadImagePreview: string | null = null;
  // Buy coupon functionality
  buyCoupon(coupon: { name: string; description: string; price: number; image?: string }) {
    this.showToast(`You bought ${coupon.name} for ₹${coupon.price}!`);
    // Add further logic for purchase (API, etc.)
  }

  // Sell coupon functionality
  sellCoupon(coupon: { name: string; description: string; price: number; image?: string }) {
    this.showToast(`You sold ${coupon.name}!`);
    // Add further logic for selling (API, etc.)
  }

  // Handle coupon upload
  addCoupon() {
    if (!this.uploadCoupon.name || !this.uploadCoupon.description || !this.uploadCoupon.price) {
      this.showToast('Please fill all coupon details.');
      return;
    }
    this.userCoupons.unshift({
      name: this.uploadCoupon.name,
      description: this.uploadCoupon.description,
      price: this.uploadCoupon.price,
      image: this.uploadCoupon.image
    });
    this.uploadCoupon = { name: '', description: '', price: 0, image: '' };
    this.uploadImagePreview = null;
    this.showToast('Coupon added for sale!');
  }

  // Handle image upload for coupon
  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadCoupon.image = e.target.result;
        this.uploadImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {
    this.animateCounter('couponsCount', 1200, 1000);
    this.animateCounter('usersCount', 350, 1200);
    this.animateCounter('tradesCount', 780, 1400);
    this.startLiveFeed();
  }

  animateCounter(prop: 'couponsCount' | 'usersCount' | 'tradesCount', target: number, duration: number) {
    const start = 0;
    const increment = target / (duration / 20);
    let current = start;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        this[prop] = target;
        clearInterval(interval);
      } else {
        this[prop] = Math.floor(current);
      }
    }, 20);
  }

  startLiveFeed() {
    setInterval(() => {
      const user = this.tradeUsers[Math.floor(Math.random() * this.tradeUsers.length)];
      const coupon = this.tradeCoupons[Math.floor(Math.random() * this.tradeCoupons.length)];
      const time = new Date().toLocaleTimeString();
      this.trades.unshift({ user, coupon, time });
      if (this.trades.length > 8) this.trades.pop();
    }, 2500);
  }

  get filteredTrades() {
    if (!this.searchTerm.trim()) return this.trades;
    const term = this.searchTerm.toLowerCase();
    return this.trades.filter(t => t.user.toLowerCase().includes(term) || t.coupon.toLowerCase().includes(term));
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.isDarkModeActive = this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  showToast(msg: string) {
    this.toastMessage = msg;
    this.isToastActive = true;
    setTimeout(() => {
      this.toastMessage = '';
      this.isToastActive = false;
    }, 2500);
  }
}
