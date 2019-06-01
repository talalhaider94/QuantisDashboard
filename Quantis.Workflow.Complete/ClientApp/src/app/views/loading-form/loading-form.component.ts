import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingFormService } from '../../_services';
import { first } from 'rxjs/operators';

@Component({
  // selector: 'app-loading-form',
  templateUrl: './loading-form.component.html',
  styleUrls: ['./loading-form.component.scss']
})
export class LoadingFormComponent implements OnInit {
  loadingForms: any = [];
  loading: boolean = true;
  constructor(
    private router: Router,
    private loadingFormService: LoadingFormService
  ) { }

  ngOnInit() {
    // Danial TODO: Some role permission logic is needed here.
    this.loadingFormService.getLoadingForms().pipe(first()).subscribe(data => {
      this.loadingForms = data;
      this.loading = false;
    }, error => {
      console.error('LoadingFormComponent', error)
      this.loading = false;
    })

  }

  // clickrow(data) {
  //   this.router.navigate(['/loading-form/form', '2', '2']);
  // }

}
