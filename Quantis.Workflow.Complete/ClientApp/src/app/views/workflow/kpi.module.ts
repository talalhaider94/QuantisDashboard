import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { KPIComponent } from './kpi.component';
import { KPIRoutingModule } from './kpi-routing.module';

@NgModule({
  imports: [
    FormsModule,
    KPIRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ KPIComponent ]
})
export class KPIModule { }
