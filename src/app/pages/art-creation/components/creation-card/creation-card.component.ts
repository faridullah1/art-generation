import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';
import { ConfigService } from '@services/config.service';
import { Creation, CreationLike, LayoutType, UserProfile } from 'src/app/pages/models';


@Component({
  selector: 'app-creation-card',
  templateUrl: './creation-card.component.html',
  styleUrls: ['./creation-card.component.scss']
})
export class CreationCardComponent implements OnInit {
	@Input() creation!: Creation;
	@Input() followedByUsersIds: number[] = [];
	@Input() showBtnFollow = true;
	@Input() layout: LayoutType = 'List';

	userProfile!: UserProfile;
	disableFollowBtn = false;
	disableLikeBtn = false;
	disableSubmitBtn = false;
	commentFC = new FormControl('', Validators.required);

	constructor(private apiService: ApiService,
				private authService: AuthService,
				private configService: ConfigService)
	{
		this.authService.userProfileSubject.subscribe(profile => {
			this.userProfile = profile;
		});
	}

	ngOnInit(): void {
		if (this.showBtnFollow) {
			this.getFollowedByUsersIds();
		}
	}

	getFollowedByUsersIds(): void {
		this.disableFollowBtn = true;
		
		this.apiService.get(`/followers`).subscribe({
			next: (resp) => {
				this.followedByUsersIds = resp.data;
				this.disableFollowBtn = false;
			},
			error: () => this.disableFollowBtn = false
		});
	}

	onFollowUser(): void {
		this.disableFollowBtn = true;
		const userId = this.creation.user.userId;

		this.apiService.post('/followers', { userId }).subscribe({
			next: () => {
				this.disableFollowBtn = false;
				this.getFollowedByUsersIds();
			},
			error: () => this.disableFollowBtn = false
		});
	}

	onLikeCreation(): void {
		this.disableLikeBtn = true;

		const creationId = this.creation.creationId;
		const payload = {
			creationId,
			userId: this.configService.user.userId
		}

		if (this.isLiked()) {
			this.apiService.delete('/likes', payload).subscribe({
				next: () => {
					this.creation.isLiked = false;

					const rec = this.creation.creation_likes.find(rec => (rec.creationId === this.creation.creationId && rec.userId === payload.userId));
					const index = this.creation.creation_likes.indexOf(rec as CreationLike);
					this.creation.creation_likes.splice(index, 1);

					this.disableLikeBtn = false;
				},
				error: () => this.disableLikeBtn = false
			});	
		}
		else {
			this.apiService.post('/likes', { creationId }).subscribe({
				next: (resp: any) => {
					this.creation.isLiked = true;
					this.creation.creation_likes.push(resp.data.userLike);
					this.disableLikeBtn = false;
				},
				error: () => this.disableLikeBtn = false
			});	
		}
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

	isLiked(): boolean {
		if (this.creation.isLiked) return true;

		const userIdsWhoLiked = this.creation.creation_likes.map(user => user.userId);

		if (userIdsWhoLiked.includes(this.configService.user.userId)) {
			return true;
		}

		return false;
	}
}
