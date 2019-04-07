import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error;
  loading: boolean;
  constructor(private user: UserService, private cf: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.cf.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.loading = true;
    this.error = '';
    this.user.userLogin(this.loginForm.value).subscribe((res:any) =>{
      this.loading = false;
      localStorage.setItem('token', res.token)
      this.router.navigate(['/profile'])
    }, err => {
      this.loading = false
      this.error = err.error.message;
      console.log('eroor',this.error)
    })
  }
}
