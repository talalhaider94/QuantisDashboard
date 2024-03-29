import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingFormComponent } from './loading-form.component';
import { LoadingFormDetailComponent } from './loading-form-detail/loading-form-detail.component';
import { ProveVarieComponent } from './prove-varie/prove-varie.component';
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
                path: 'form/:formId/:formName',
                component: LoadingFormDetailComponent,
                data: {
                    title: 'Form Detail'
                }
            },
            {
                path: 'admin2',
                component: ProveVarieComponent,
                data: {
                    title: 'Admin 2'
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
