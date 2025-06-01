import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'

@Component({
	selector: 'my-app',
	templateUrl: './App.Component.html',
	imports: [RouterLink, RouterLinkActive, RouterOutlet],
})
export class AppComponent {}
