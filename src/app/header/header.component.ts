import { Component, HostListener, ViewChild } from '@angular/core';
import { PanierComponent } from '../panier/panier.component';
import { CardsComponent } from '../cards/cards.component';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(private authService: AuthService) { }

  isScrolled: boolean;
  Username:string;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = offset > 50;
  }
  isUserSignedIn(): boolean {
    return this.authService.isLoggedIn;  
  }
  UserName(){
    return this.authService.getUserName();
  }
  logout(){
    this.authService.doLogout()
  }
}
