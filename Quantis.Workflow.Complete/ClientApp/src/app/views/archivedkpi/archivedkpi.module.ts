import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ArchivedKpiComponent } from './archivedkpi.component';
import { ArchivedKpiRoutingModule } from './archivedkpi-routing.module';

@NgModule({
  imports: [
    FormsModule,
    ArchivedKpiRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ ArchivedKpiComponent ]
})
export class ArchivedKpiModule { }
