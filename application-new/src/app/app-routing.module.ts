import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewReturnComponent } from './new-return/new-return.compoenent';
import { DataMiningComponent } from './data-mining/data-mining.component';
import { FormsComponent } from './forms/forms.component';

const routes: Routes = [
    {
        path: '',
        component: DataMiningComponent
    },
    {
        path: 'questionnaire',
        component: NewReturnComponent
    },
    {
        path: 'forms',
        component: FormsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }