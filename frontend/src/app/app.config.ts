import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import client from './apollo-client';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { CustomePreset } from './customPreset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()), 
    provideApollo(() => client),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: CustomePreset,
        options: {
          prefix: 'p',
          darkModeSelector: 'light',
          cssLayer: false
        }
      }
    })
  ]
};