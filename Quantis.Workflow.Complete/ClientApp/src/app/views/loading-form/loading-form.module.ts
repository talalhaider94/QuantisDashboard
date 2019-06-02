import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingFormComponent } from './loading-form.component';
import { LoadingFormRoutingModule } from './loading-form-routing.module';
import { LoadingFormDetailComponent } from './loading-form-detail/loading-form-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProveVarieComponent } from './prove-varie/prove-varie.component';

@NgModule({
  declarations: [ 
    LoadingFormComponent,
    LoadingFormDetailComponent,
    ProveVarieComponent ],
  imports: [
    CommonModule,
    LoadingFormRoutingModule,
    ReactiveFormsModule
  ],
})
export class LoadingFormModule {}
