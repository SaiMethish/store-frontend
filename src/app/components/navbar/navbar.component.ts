import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { SharedService } from 'src/app/service/shared.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  constructor(private cartService: CartService, private router: Router, public authService: AuthService,
    private sharedService: SharedService, private renderer: Renderer2, private wishlistService: WishlistService,
    private spinner:NgxSpinnerService
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
      this.spinner.show()
      this.cartService.getCart().subscribe({
        next: (res: any) => {
          this.sharedService.setUserCart(res.cartItems);
        },
        error: (err: any) => {
          console.error(err);
        },
        // complete:()=>this.spinner.hide()
      })
    }
    this.wishlistService.getWishlist().subscribe({
      next: (res: any) => {
        console.log(res);
        this.wishlistCount = res.items.length;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete:()=>this.spinner.hide()
    })
  }
  accountClicked = new BehaviorSubject<boolean>(false);
  isAccountClicked: boolean = false;
  wishlistCount!: number;
  searchinputVal: string = "";

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

  iconRouting = (arg: string) => {
    this.accountClicked.next(false);
    this.router.navigate([arg]);
  }
  inputHandler = () => {
    this.sharedService.searchText.next(this.searchinputVal);
    if(this.authService.checkLoginStatus()){
      this.router.navigate(['']);
    }
  };

  debounceFn(fn: any, delay: any) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer); 
      timer = setTimeout(() => {
        fn(args); 
      }, delay);
    };
  }

  debounce = this.debounceFn(this.inputHandler, 2000);

}
