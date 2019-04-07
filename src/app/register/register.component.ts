import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private user: UserService, private cf: FormBuilder, private router: Router) { }
  register: FormGroup;
  error;
  loading: boolean;
  success;
  ngOnInit() {
    this.register = this.cf.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  signUp() {
    this.loading = true
    this.error = ''
    this.user.register(this.register.value).subscribe((res:any) => {
      this.loading = false;
      this.user.userLogin(this.register.value).subscribe((e:any) => {
        localStorage.setItem('token', e.token)
        this.router.navigate(['/profile'])
      })
    },
    error => {
      this.loading = false
      console.log('rtu',error)
      if(error.status == 422) {
        this.error = error.error.errors.email.message
      }
      else if(error.status == 0) {
        this.success = true
        this.user.userLogin(this.register.value).subscribe((e:any) => {
          localStorage.setItem('token', e.token)
          this.router.navigate(['/profile'])
        })
      }
    })
  }
}
