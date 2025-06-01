import { Routes, RouterModule } from '@angular/router'
import { IndexComponent } from '@client/Components/Index/Index.Component'
import { PageNotFoundComponent } from '@client/Components/PageNotFound'
import { BarComponent } from '@client/Components/Bar/Bar.Component'

const appRoutes: Routes = [
	{
		path: '',
		component: IndexComponent,
	},
	{
		path: 'bar',
		component: BarComponent,
	},
	{
		path: '**',
		component: PageNotFoundComponent,
	},
]

export const appRoutingProviders: any[] = []

export const routing = RouterModule.forRoot(appRoutes)
