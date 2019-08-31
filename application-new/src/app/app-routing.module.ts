import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewReturnComponent } from './new-return/new-return.compoenent';
import { DataMiningComponent } from './data-mining/data-mining.component';

const routes: Routes = [
    {
        path: '',
        component: DataMiningComponent,
    },
    {
        path: 'questionnaire',
        component: NewReturnComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }