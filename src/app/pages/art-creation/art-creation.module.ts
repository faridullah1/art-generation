import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';

import { ArtCreationComponent } from './main.component';
import { CreateComponent } from './components/create/create.component';
import { ExploreComponent } from './components/explore/explore.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { FeedComponent } from './components/feed/feed.component';
import { ActionsHeaderComponent } from './components/actions-header/actions-header.component';
import { PublishCreationComponent } from './components/publish-creation/publish-creation.component';
import { PricingComponent } from './components/pricing/pricing.component';


@NgModule({
	declarations: [
		ArtCreationComponent,
		CreateComponent,
		ExploreComponent,
  		PromptComponent,
		FeedComponent,
		ActionsHeaderComponent,
 		PublishCreationComponent,
		PricingComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,

		MaterialModule,
		SharedModule
	]
})
export class ArtCreationModule { }
