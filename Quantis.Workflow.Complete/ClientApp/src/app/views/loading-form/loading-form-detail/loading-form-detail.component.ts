import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { LoadingFormService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loading-form-detail',
  templateUrl: './loading-form-detail.component.html',
  styleUrls: ['./loading-form-detail.component.scss']
})
export class LoadingFormDetailComponent implements OnInit {
  loading: boolean = false;
  formId: string = null;
  formName: string = null;
  addLoadingForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadigFormService: LoadingFormService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    
    this.addLoadingForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.formId = params.get("formId");
      this.formName = params.get("formName");
      
      this._formFilterById(+this.formId);
      this._kpiByFormId(+this.formId);
    
    })
  }

  _formFilterById(formId: number) {
    this.loadigFormService.getFormById(formId).pipe().subscribe(data => {  //to get the forms fields: api/oracle/getformbyid/:id
      console.log('getFormFilterById', data)
    }, error => {
      this.toastr.error(error.message);
      console.error('getFormFilterById', error)
    });
  }

  _kpiByFormId(formId: number) {
    this.loadigFormService.getKpiByFormId(formId).pipe().subscribe(data => {
      console.log('getKpiByFormId', data)
    }, error => {
      this.toastr.error(error.message);
      console.error('getKpiByFormId', error)
    });
  }

  AddLoadingFormSubmit() {
    alert('WORKING');
  }

}
