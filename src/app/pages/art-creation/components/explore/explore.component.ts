import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreationStatus, HeaderAction, LayoutType, UserProfile } from 'src/app/pages/models';
import { Creation } from './../../../models';
import { AuthService } from '@services/auth.service';
import { ApiService } from '@services/api.service';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  	creations: Creation[] = [];
	layout: LayoutType = 'List';
	status: CreationStatus = 'Published';
	commentFC = new FormControl('', Validators.required);
	followedByUsersIds: number[] = [];
	userProfile!: UserProfile;

	disableFollowBtn = false;
	disableSubmitBtn = false;
	loading = false;

	constructor(private apiService: ApiService,
				private authService: AuthService,
				private router: Router) 
	{
		this.authService.userProfileSubject.subscribe(resp => {
			this.userProfile = resp;
		});
	}

	ngOnInit(): void {
		this.getAllCreations();
		this.getFollowedByUsersIds();
	}

	getAllCreations(): void {
		this.loading = true;

		this.apiService.get(`/creations?status=${this.status}`).subscribe({
			next: (resp) => {
				this.creations = resp.data.creations;
				this.loading = false;
			},
			error: () => this.loading = false
		});
	}

	getFollowedByUsersIds(): void {
		this.disableFollowBtn = true;
		
		this.apiService.get(`/followers`).subscribe({
			next: (resp) => {
				this.followedByUsersIds = resp.data;
				this.disableFollowBtn = false;
			},
			error: () => {
				this.loading = false;
				this.disableFollowBtn = false;
			}
		});
	}

	onHeaderAction(action: HeaderAction): void {
		switch(action.type) {
			case 'LayoutChange':
				this.layout = action.value;
				break;

			case 'Refresh':
				this.getAllCreations();
				break
		}
	}

	navigetToCreate(): void {
		this.router.navigateByUrl('create');
	}

	onSubmitComment(creation: Creation): void {
		this.disableSubmitBtn = true;

		const payload = {
			creationId: creation.creationId,
			comment: this.commentFC.value
		};
		
		this.apiService.post('/comments', payload).subscribe({
			next: (resp: any) => {
				this.commentFC.reset();
				this.disableSubmitBtn = false;
				creation.creation_comments.push(resp.data);
			},
			error: () => this.disableSubmitBtn = false
		});
	}

	onFollowUser(creation: Creation): void {
		this.disableFollowBtn = true;
		const userId = creation.user.userId;

		this.apiService.post('/followers', { userId }).subscribe({
			next: () => {
				this.disableFollowBtn = false;
				this.getFollowedByUsersIds();
			},
			error: () => this.disableFollowBtn = false
		})
	}
}
