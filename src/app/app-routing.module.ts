import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExploreComponent } from './pages/art-creation/components/explore/explore.component';
import { CreateComponent } from './pages/art-creation/components/create/create.component';
import { ArtCreationComponent } from './pages/art-creation/main.component';

const routes: Routes = [
	{ path: '', redirectTo: 'creations', pathMatch: 'full' },
	{ path: 'creations', component: ArtCreationComponent },
	{ path: 'create', component: CreateComponent },
	{ path: 'explore', component: ExploreComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
