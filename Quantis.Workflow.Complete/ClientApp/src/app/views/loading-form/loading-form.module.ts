import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingFormComponent } from './loading-form.component';
import { LoadingFormRoutingModule } from './loading-form-routing.module';
import { LoadingFormDetailComponent } from './loading-form-detail/loading-form-detail.component';

@NgModule({
  declarations: [ LoadingFormComponent, LoadingFormDetailComponent ],
  imports: [
    CommonModule,
    LoadingFormRoutingModule
  ],
})
export class LoadingFormModule {}
