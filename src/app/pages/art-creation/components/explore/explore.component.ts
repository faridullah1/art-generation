import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreationStatus, HeaderAction, LayoutType, UserProfile } from 'src/app/pages/models';
import { Creation, CreationLike } from './../../../models';
import { AuthService } from '@services/auth.service';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';


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
	disableLikeBtn = false;
	loading = false;

	constructor(private apiService: ApiService,
				private authService: AuthService,
				private configService: ConfigService,
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

				this.creations = this.creations.map(creation => {
					creation.isLiked = false;
					return creation;
				});
				
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
		});
	}

	onLikeCreation(creation: Creation): void {
		this.disableLikeBtn = true;

		const creationId = creation.creationId;
		const payload = {
			creationId,
			userId: this.configService.user.userId
		}

		if (this.isLiked(creation)) {
			this.apiService.delete('/likes', payload).subscribe({
				next: () => {
					creation.isLiked = false;

					const rec = creation.creation_likes.find(rec => (rec.creationId === creation.creationId && rec.userId === payload.userId));
					const index = creation.creation_likes.indexOf(rec as CreationLike);
					creation.creation_likes.splice(index, 1);

					this.disableLikeBtn = false;
				},
				error: () => this.disableLikeBtn = false
			});	
		}
		else {
			this.apiService.post('/likes', { creationId }).subscribe({
				next: (resp: any) => {
					creation.isLiked = true;
					creation.creation_likes.push(resp.data.userLike);
					this.disableLikeBtn = false;
				},
				error: () => this.disableLikeBtn = false
			});	
		}
	}

	isLiked(creation: Creation): boolean {
		if (creation.isLiked) return true;

		const userIdsWhoLiked = creation.creation_likes.map(user => user.userId);

		if (userIdsWhoLiked.includes(this.configService.user.userId)) {
			return true;
		}

		return false;
	}
}
