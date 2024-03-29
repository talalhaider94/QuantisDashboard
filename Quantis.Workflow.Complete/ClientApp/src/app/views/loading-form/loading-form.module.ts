import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingFormComponent } from './loading-form.component';
import { LoadingFormRoutingModule } from './loading-form-routing.module';
import { LoadingFormDetailComponent } from './loading-form-detail/loading-form-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProveVarieComponent } from './prove-varie/prove-varie.component';

import {
  MatSidenavModule,
  MatButtonModule,
  MatFormFieldModule, 
  MatInputModule,
  MatRippleModule,
  MatCardModule, 
  MatProgressSpinnerModule, 
  MatMenuModule, 
  MatIconModule, 
  MatToolbarModule,
  MatSelectModule, 
  MatTableModule, 
  MatSortModule, 
  MatDatepickerModule, 
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [ 
    LoadingFormComponent,
    LoadingFormDetailComponent,
    ProveVarieComponent ],
  imports: [
    CommonModule,
    LoadingFormRoutingModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatRippleModule,
    MatCardModule, 
    MatProgressSpinnerModule, 
    MatMenuModule, 
    MatIconModule, 
    MatToolbarModule,
    MatSelectModule, 
    MatTableModule, 
    MatSortModule, 
    MatDatepickerModule, 
    // MAT_DATE_LOCALE,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTooltipModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
  ],
})
export class LoadingFormModule {}
