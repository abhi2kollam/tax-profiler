import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataMiningComponent } from './data-mining/data-mining.component';
import { NewReturnComponent } from './new-return/new-return.compoenent';
import { FormsComponent } from './forms/forms.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        NewReturnComponent,
        DataMiningComponent,
        FormsComponent
    ],
    imports: [
        BrowserModule,
        TreeModule.forRoot(),
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
