import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { alternatives } from 'joi';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitAttempt: boolean = false;
  loginform = this.fb.group({
    emailId: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
    password: ['', [Validators.required]],

  });
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.loginform.invalid) {
      return;
    } else {
      let data = this.loginform.value;
      this.authService.login(data).subscribe((res: any) => {
        if (res.success) {
          alert("Loggedin Successfully!!");
          this.router.navigate(['home'])
          localStorage.setItem('token', res.token);
          localStorage.setItem('userDetails', JSON.stringify(res.user));
        } else {
          if (res.message) {
            alert(res.message);
          } else {
            alert("Email Id / Password is incorrect!!");
          }
        }
      }, (error) => {
        alert(error);
      })
    }
  }

}