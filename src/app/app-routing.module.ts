import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExploreComponent } from './pages/art-creation/components/explore/explore.component';
import { CreateComponent } from './pages/art-creation/components/create/create.component';
import { ArtCreationComponent } from './pages/art-creation/main.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PromptComponent } from './pages/art-creation/components/prompt/prompt.component';
import { FeedComponent } from './pages/art-creation/components/feed/feed.component';

const routes: Routes = [
	{ path: '', redirectTo: 'my-creations', pathMatch: 'full' },
	{ path: 'my-creations', component: ArtCreationComponent },
	{ path: 'feed', component: FeedComponent },
	{ path: 'create', component: CreateComponent },
	{ path: 'create/:prompt', component: PromptComponent },
	{ path: 'explore', component: ExploreComponent },
	{ path: 'login', component: LoginComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
