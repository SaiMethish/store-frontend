import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, Login, Register } from '../interfaces/Auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn = this.loggedIn.asObservable();

  changeStatus = (status: boolean) => {
    this.loggedIn.next(status);
  };

  constructor(private http: HttpClient) {}

  isRefresh = new BehaviorSubject<boolean>(false);

  baseUrl = "http://localhost:8080";

  registerApi = (registerObj: Register) => {
    return this.http.post<AuthResponse>(this.baseUrl + "/register", registerObj);
  };

  loginApi = (loginObj: Login) => {
    return this.http.post<AuthResponse>(this.baseUrl + "/login", loginObj);
  };

  logoutApi = () => {
    return this.http.get(this.baseUrl + "/logout");
  };

  refreshToken = (): Observable<AuthResponse> => {
    let refresh_token = sessionStorage.getItem("refresh-token");
    if (!refresh_token) refresh_token = "";
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + refresh_token
    });
    return this.http.get<AuthResponse>(`${this.baseUrl}/refresh`, { headers });
  };

  checkLoginStatus() {
    const token = sessionStorage.getItem("access-token");
    return !!token;
  }
}
