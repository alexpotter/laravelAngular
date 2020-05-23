import { NgModule, enableProdMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { routing, appRoutingProviders } from '@client/config/routing'
import { AppComponent } from '@client/Components/App.Component'
import { IndexComponent } from '@client/Components/Index/IndexComponent'
import { PageNotFoundComponent } from '@client/Components/PageNotFound'

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
	declarations: [AppComponent, IndexComponent, PageNotFoundComponent],
	bootstrap: [AppComponent],
	providers: [appRoutingProviders, FormBuilder],
	entryComponents: [],
})
export class AppModule {}
