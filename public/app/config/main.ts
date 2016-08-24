import 'reflect-metadata';
import 'rxjs';
import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module';
platformBrowserDynamic().bootstrapModule(AppModule);