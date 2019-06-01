import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-loading-form-detail',
  templateUrl: './loading-form-detail.component.html',
  styleUrls: ['./loading-form-detail.component.scss']
})
export class LoadingFormDetailComponent implements OnInit {
  loading: boolean = false;
  formId: string = null;
  formName: string = null;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.formId = params.get("formId");
      this.formName = params.get("formName");
    })
  }

}
