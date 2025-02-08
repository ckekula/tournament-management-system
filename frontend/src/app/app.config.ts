import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withInterceptors([])), 
    provideApollo(() => {
      const httpLink = inject(HttpLink);
    
      return {
        link: httpLink.create({
          uri: 'http://localhost:8088/api/v1/graphql',
          withCredentials: true
        }),
        cache: new InMemoryCache(),
      };
    })
  ]
};