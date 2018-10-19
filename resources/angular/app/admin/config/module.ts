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
import { routing, appRoutingProviders } from '@admin/config/routing'
import { AppComponent } from '@admin/Components/App.Component'
import { IndexComponent } from '@admin/Components/Index/IndexComponent'
import { PageNotFoundComponent } from '@admin/Components/PageNotFound'

if (process.env.NODE_ENV === 'production') { enableProdMode() }

@NgModule({
	imports: [
		routing, BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule,
		BrowserAnimationsModule, MatNativeDateModule, MatSidenavModule, MatPaginatorModule,
		MatOptionModule, MatSlideToggleModule, MatCheckboxModule, MatButtonModule, MatTableModule,
		MatChipsModule, MatRadioModule, MatProgressBarModule, MatDialogModule, MatSnackBarModule,
		MatCardModule, MatInputModule, MatToolbarModule, MatSelectModule,
	],
	declarations: [ AppComponent, IndexComponent, PageNotFoundComponent ],
	bootstrap: [ AppComponent ],
	providers: [ appRoutingProviders, FormBuilder ],
	entryComponents: [],
})

export class AppModule { }
