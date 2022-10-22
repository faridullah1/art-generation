import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtCreationModule } from './pages/art-creation/art-creation.module';
import { LayoutModule } from './pages/layout/layout.module';
import { FeedComponent } from './pages/art-creation/components/feed/feed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule } from 'angular-oauth2-oidc';
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
	],
	providers: [
        { provide: APP_INITIALIZER, useFactory: authAppInitializerFactory, deps: [AuthService], multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: DefaultOAuthInterceptor, multi: true }
    ],
  	bootstrap: [AppComponent]
})
export class AppModule { }
