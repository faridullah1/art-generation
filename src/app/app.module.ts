import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtCreationModule } from './pages/art-creation/art-creation.module';
import { LayoutModule } from './pages/layout/layout.module';
import { FeedComponent } from './pages/art-creation/components/feed/feed.component';


@NgModule({
	declarations: [
		AppComponent,
  		FeedComponent
	],
	imports: [
		// Core modules
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,

		// Custom modules
		LayoutModule,
		ArtCreationModule,
	],
	providers: [],
  	bootstrap: [AppComponent]
})
export class AppModule { }
