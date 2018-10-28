import { NgModule, enableProdMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms'
import {
	MatNativeDateModule,
	MatSidenavModule,
	MatPaginatorModule,
	MatOptionModule,
	MatSlideToggleModule,
	MatCheckboxModule,
	MatButtonModule,
	MatTableModule,
	MatChipsModule,
	MatRadioModule,
	MatProgressBarModule,
	MatDialogModule,
	MatSnackBarModule,
	MatCardModule,
	MatInputModule,
	MatToolbarModule,
	MatSelectModule,
} from '@angular/material'
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
		MatNativeDateModule,
		MatSidenavModule,
		MatPaginatorModule,
		MatOptionModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatButtonModule,
		MatTableModule,
		MatChipsModule,
		MatRadioModule,
		MatProgressBarModule,
		MatDialogModule,
		MatSnackBarModule,
		MatCardModule,
		MatInputModule,
		MatToolbarModule,
		MatSelectModule,
	],
	declarations: [AppComponent, IndexComponent, PageNotFoundComponent],
	bootstrap: [AppComponent],
	providers: [appRoutingProviders, FormBuilder],
	entryComponents: [],
})
export class AppModule {}
