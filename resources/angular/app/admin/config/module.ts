import { NgModule, enableProdMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { routing, appRoutingProviders } from '@admin/config/routing'
import { AppComponent } from '@admin/Components/App.Component'
import { IndexComponent } from '@admin/Components/Index/IndexComponent'
import { PageNotFoundComponent } from '@admin/Components/PageNotFound'
import { BarComponent } from '@admin/Components/Bar/Bar.Component'

if (process.env.NODE_ENV === 'production') {
	enableProdMode()
}

@NgModule({
	imports: [
		routing,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatDialogModule,
		MatSnackBarModule,
	],
	declarations: [
		AppComponent,
		IndexComponent,
		PageNotFoundComponent,
		BarComponent,
	],
	bootstrap: [AppComponent],
	providers: [appRoutingProviders, FormBuilder],
	entryComponents: [],
})
export class AppModule {}
