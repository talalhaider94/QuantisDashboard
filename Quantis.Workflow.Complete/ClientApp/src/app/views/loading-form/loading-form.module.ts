import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingFormComponent } from './loading-form.component';
import { LoadingFormRoutingModule } from './loading-form-routing.module';

@NgModule({
  declarations: [ LoadingFormComponent ],
  imports: [
    CommonModule,
    LoadingFormRoutingModule
  ],
})
export class LoadingFormModule {}
