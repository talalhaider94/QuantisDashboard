import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingFormComponent } from './loading-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Loading Form'
        },
        children: [
            {
                path: '',
                redirectTo: 'admin'
            },
            {
                path: 'admin',
                component: LoadingFormComponent,
                data: {
                    title: 'Admin'
                }
            },
        ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingFormRoutingModule {}
