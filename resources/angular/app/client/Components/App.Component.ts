import { Component } from '@angular/core'

@Component({
	selector: 'my-app',
	template: `
		<nav>
			<a routerLink="/" routerLinkActive="active">Foo</a>
		</nav>
		<router-outlet></router-outlet>
`,
})
export class AppComponent {

}
