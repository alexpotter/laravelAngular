import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent }   from '../Components/App.Component';

import { routing, appRoutingProviders } from './routing';
import {IndexComponent} from "../Components/Public/Index";
import {AngularComponent} from "../Components/Public/AngularComponent";

@NgModule({
	imports:      [ BrowserModule, routing ],
	declarations: [ AppComponent, IndexComponent, AngularComponent ],
	bootstrap:    [ AppComponent ],
	providers:    [ appRoutingProviders ],
})
export class AppModule { }