import 'reflect-metadata'
import 'rxjs'
import 'zone.js'
import 'hammerjs'
import 'bootstrap'

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { appRoutingProviders, routing } from '@client/config/routing'
import { importProvidersFrom, provideAppInitializer } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { AppComponent } from '@client/Components/App.Component'

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(
			routing,
			CommonModule,
			BrowserModule,
			FormsModule,
			ReactiveFormsModule,
		),
		provideHttpClient(withInterceptorsFromDi()),
		appRoutingProviders,
		provideAppInitializer(async () => {
			console.log('Initializing application...')
		}),
		FormBuilder,
		provideAnimations(),
	],
}).catch((err) => {
	console.error(err)
})
