import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './pages/layout/layout.module';
import { AuthModule } from './pages/auth/auth.module';
import { ArtCreationModule } from './pages/art-creation/art-creation.module';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { DefaultOAuthInterceptor } from './interceptors/token-interceptor';

export function authAppInitializerFactory(authService: AuthService): () => Promise<void> {
	return () => authService.runInitialLoginSequence();
}

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		// Core modules
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,

		// 3rd party modules
		OAuthModule.forRoot({
			resourceServer: {
				allowedUrls: ['http://localhost:3000/api'],
				sendAccessToken: true
			}
		}),

		// Custom modules
		LayoutModule,
		ArtCreationModule,
		AuthModule
	],
	providers: [
        { provide: APP_INITIALIZER, useFactory: authAppInitializerFactory, deps: [AuthService], multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: DefaultOAuthInterceptor, multi: true }
    ],
  	bootstrap: [AppComponent]
})
export class AppModule { }
