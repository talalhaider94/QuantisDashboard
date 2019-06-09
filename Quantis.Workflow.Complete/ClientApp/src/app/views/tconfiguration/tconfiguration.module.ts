import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { TConfigurationComponent } from './tconfiguration.component';
import { TConfigurationRoutingModule } from './tconfiguration-routing.module';

@NgModule({
  imports: [
    FormsModule,
    TConfigurationRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ TConfigurationComponent ]
})
export class TConfigurationModule { }
