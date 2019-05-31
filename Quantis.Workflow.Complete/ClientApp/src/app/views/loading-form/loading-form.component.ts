import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // selector: 'app-loading-form',
  templateUrl: './loading-form.component.html',
  styleUrls: ['./loading-form.component.scss']
})
export class LoadingFormComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }
  ngOnInit() {}

  clickrow() {
    this.router.navigate(['/loading-form/detail']);
  }
}
