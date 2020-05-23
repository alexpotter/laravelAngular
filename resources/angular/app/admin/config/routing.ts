import { Routes, RouterModule } from '@angular/router'
import { IndexComponent } from '@admin/Components/Index/IndexComponent'
import { PageNotFoundComponent } from '@admin/Components/PageNotFound'
import { BarComponent } from '@admin/Components/Bar/Bar.Component'

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
