import 'reflect-metadata'
import 'rxjs'
import 'zone.js/dist/zone'
import 'hammerjs'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from '@admin/config/module'

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => {
		console.error(err)
	})
