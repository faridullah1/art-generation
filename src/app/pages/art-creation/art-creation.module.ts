import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ArtCreationComponent } from './main.component';
import { CreateComponent } from './components/create/create.component';
import { ExploreComponent } from './components/explore/explore.component';
import { PromptComponent } from './components/prompt/prompt.component';


@NgModule({
	declarations: [
		ArtCreationComponent,
		CreateComponent,
		ExploreComponent,
  		PromptComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
	]
})
export class ArtCreationModule { }
