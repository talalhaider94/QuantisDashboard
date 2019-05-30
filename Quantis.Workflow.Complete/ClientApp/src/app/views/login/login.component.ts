import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthService } from '../../_services';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{
  title: string = 'Login';
  loginForm: FormGroup;
  submitted: boolean = false;
  returnUrl: string;
  loading: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { 
    if (this.authService.currentUserValue || this.authService.isLoggedIn()) { 
      console.log('LOGIN IF')
      this.router.navigate(['/dashboard']);
    } else {
      console.log('LOGIN ELSE')
    }
  }
  
  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]]
    });
    // get return url from route parameters
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/dashboard';
    console.log('this.activatedRoute', this.activatedRoute.snapshot.queryParams);
    console.log('this.returnUrl', this.returnUrl);
  }

  onLoginFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        this.toastr.error('Please fill the form correctly.', 'Error');
        return;
    } else {
      const { userName, password } = this.f;
      this.authService.login(userName.value, password.value).pipe(first()).subscribe(data => {
        console.log('onLoginFormSubmit: success', data);
        this.router.navigate([this.returnUrl]);
        this.toastr.success('You are loggedin successfully', 'Success');
      }, error => {
        console.log('onLoginFormSubmit: error', error);
        this.toastr.error(error.message, error.statusText);
      })
    }
    
  }

}
