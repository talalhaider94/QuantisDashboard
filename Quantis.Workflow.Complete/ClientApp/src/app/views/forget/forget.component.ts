import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'forget.component.html'
})

export class ForgetComponent implements OnInit{
  title = 'Forget?';
  forgetForm: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder) { }
  
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
        return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.forgetForm.value))
  }

}
