import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthService } from '../../_services';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'forget.component.html'
})

export class ForgetComponent implements OnInit{
  title = 'Forget?';
  forgetForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
    ) { }
  
  get f() { return this.forgetForm.controls; }

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
    });
  }

  onForgetFormSubmit() {
    this.submitted = true;
    if (this.forgetForm.invalid) {
      this.toastr.error('Please fill the form correctly.', 'Error');
      return;
    } else {
      const { userName, email } = this.f;
      this.loading = true;
      this.authService.resetPassword(userName.value, email.value).pipe(first()).subscribe(result => {
        console.log('onForgetFormSubmit', result)
        this.loading = false;
        if(!!result){
          this.router.navigate(['/login']);
          this.toastr.success('Please check your email for new password.', 'Success');
        } else {
          this.toastr.error('User not found.', 'Error');  
        }
      }, error => {
        console.error('onForgetFormSubmit', error)
        this.toastr.error('Error while updating password.', 'Error');
        this.loading = false;
      })

    }
  }

}
