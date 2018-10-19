import { Routes, RouterModule } from '@angular/router'
import { IndexComponent } from '@client/Components/Index/IndexComponent'
import { PageNotFoundComponent } from '@client/Components/PageNotFound'

const appRoutes: Routes = [
	{
		path: '',
		component: IndexComponent,
	},
	{
		path: '**',
		component: PageNotFoundComponent,
	},
]

export const appRoutingProviders: any[] = [

]

export const routing = RouterModule.forRoot(appRoutes)
