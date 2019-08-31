import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataMiningComponent } from './data-mining/data-mining.component';
import { NewReturnComponent } from './new-return/new-return.compoenent';

@NgModule({
    declarations: [
        AppComponent,
        NewReturnComponent,
        DataMiningComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
