import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  constructor(private cartService: CartService, private router: Router, public authService: AuthService,
    private sharedService: SharedService, private renderer: Renderer2
  ) { }
  ngAfterViewChecked(): void {
    if (this.authService.checkLoginStatus()) {
      let cart;
      this.sharedService.$userCart.subscribe((val) => {
        cart = val;
        if (cart && this.cartCount) this.renderer.setProperty(this.cartCount.nativeElement, 'textContent', cart.length);
      })
    }
  }
  @ViewChild('cartCount') cartCount!: ElementRef;
  ngOnInit(): void {
    this.accountClicked.subscribe((status) => {
      this.isAccountClicked = status;
    })
    if (this.authService.checkLoginStatus()) {
      this.cartService.getCart().subscribe({
        next: (res: any) => {
          this.sharedService.setUserCart(res.cartItems);
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }
  accountClicked = new BehaviorSubject<boolean>(false);
  isAccountClicked: boolean = false;

  togglePopup = () => {
    this.accountClicked.next(!this.isAccountClicked)
  }

  logout = () => {
    this.togglePopup();
    this.authService.logoutApi();
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
    sessionStorage.removeItem("expiration-time");
    this.authService.changeStatus(false);
    this.router.navigate(['login']);
  }

  iconRouting=(arg:string)=>{
    this.accountClicked.next(false);
    this.router.navigate([arg]);
  }
}
