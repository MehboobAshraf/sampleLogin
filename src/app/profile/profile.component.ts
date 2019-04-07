import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetail: FormGroup;
  isDataLoaded: boolean = false;
  constructor(private router: Router,private user: UserService, private cf: FormBuilder) { }

  ngOnInit() {    
    this.user.getProfile(localStorage.getItem('token')).subscribe((res:any) => {
      this.isDataLoaded = true
      this.userDetail = this.cf.group({
        email: [res.email],
        name: [res.name]
      }, err => {
        this.router.navigate(['/login'])
      });
    })
  }
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
