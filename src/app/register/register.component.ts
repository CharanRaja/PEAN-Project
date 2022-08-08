import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signUpform = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    emailId: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    country: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
  });
  submitAttempt: boolean = false;
  userExists: boolean = false;
  usernotExists: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router) { }

  ngOnInit(): void {

  }

  passCheck() {
    this.signUpform.get('confirmPassword')?.valueChanges.subscribe((data: any) => {
      if (this.signUpform.get('password')?.value !== data && this.signUpform.get('password')?.value !== '') {
        this.signUpform.controls.confirmPassword.setErrors({ 'passwordMatch': true });
      } else if (this.signUpform.get('password')?.value === '') {
        this.signUpform.controls.confirmPassword.setErrors({ 'passwordNotMatch': true });
      }
    })
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.signUpform.invalid) {
      return;
    } else {
      let payload = {
        'firstName': this.signUpform.value.firstName,
        'lastName': this.signUpform.value.lastName,
        'emailId': this.signUpform.value.emailId,
        'country': this.signUpform.value.country,
        'mobile': this.signUpform.value.mobile,
        'password': this.signUpform.value.password
      }
      this.authService.register(payload).subscribe((res: any) => {
        if (res.success) {
          this.router.navigate(['login']);
          alert('Registration Success!!')
        } else {
          if (res.message) {
            alert(res.message)
          } else {
            alert('Sorry, Some eror occurred!!')
          }
        }
      }, (error) => {
        alert(error);
      })
    }
  }

  emailIdCheck() {
    if (this.signUpform.controls['emailId'].valid) {
      this.userExists = false;
      let data = {
        emailId: this.signUpform.value.emailId
      };
      this.authService.checkEmailExists(data).subscribe((user: any) => {
        if (user.userExist) {
          this.userExists = true;
        } else {
          this.usernotExists = true;
        }
      }, (error) => {
        alert(error);
      });
    } else {
      return;
    }

  }

}
