import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/throw';
@Injectable()
export class UserService {
  // private headers;
  constructor(private http:HttpClient) { }
  baseUrl = 'https://greencommunitylaundry.herokuapp.com/api/'; 
  userLogin(user){
    return this.http.post(`${this.baseUrl}auth/local`,user)
  }
  register(user) {
    return this.http.post(`${this.baseUrl}users`, user)
  }
  getProfile(token) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}users/me`, {headers})
  }
}

