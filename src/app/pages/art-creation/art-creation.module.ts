import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ArtCreationComponent } from './main.component';
import { CreateComponent } from './components/create/create.component';
import { ExploreComponent } from './components/explore/explore.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FeedComponent } from './components/feed/feed.component';


@NgModule({
	declarations: [
		ArtCreationComponent,
		CreateComponent,
		ExploreComponent,
  		PromptComponent,
		FeedComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,

		MaterialModule
	]
})
export class ArtCreationModule { }
