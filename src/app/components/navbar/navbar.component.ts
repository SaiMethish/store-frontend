import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(private http:HttpClient, private router:Router, public authService:AuthService){}

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn);
    this.accountClicked.subscribe((status)=>{
      this.isAccountClicked=status;
    })
  }
  accountClicked=new BehaviorSubject<boolean>(false);
  isAccountClicked:boolean=false;

  togglePopup=()=>{
    this.accountClicked.next(!this.isAccountClicked)
  }

  logout=()=>{
    this.togglePopup();
    this.authService.logoutApi();
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
    sessionStorage.removeItem("expiration-time");
    this.authService.changeStatus(false);
    this.router.navigate(['login']);
  }
}
