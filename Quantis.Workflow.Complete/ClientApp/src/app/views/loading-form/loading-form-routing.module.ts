import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingFormComponent } from './loading-form.component';
import { LoadingFormDetailComponent } from './loading-form-detail/loading-form-detail.component';

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
            {
                path: 'detail',
                component: LoadingFormDetailComponent,
                data: {
                    title: 'Form Detail'
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
