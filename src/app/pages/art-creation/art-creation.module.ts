import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtCreationComponent } from './main.component';
import { CreateComponent } from './components/create/create.component';
import { ExploreComponent } from './components/explore/explore.component';


@NgModule({
	declarations: [
		ArtCreationComponent,
		CreateComponent,
		ExploreComponent
	],
	imports: [
		CommonModule
	]
})
export class ArtCreationModule { }
