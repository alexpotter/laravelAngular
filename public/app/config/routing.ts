import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from "../Components/Public/Index";
import {AngularComponent} from "../Components/Public/AngularComponent";

const appRoutes: Routes = [
	{ path: '', component: IndexComponent },
	{ path: 'angular', component: AngularComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);