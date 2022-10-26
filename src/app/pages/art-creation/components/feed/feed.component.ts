import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { Creation, CreationLike, HeaderAction, LayoutType } from 'src/app/pages/models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  	creations: Creation[] = [];
	layout: LayoutType = 'List';
	commentFC = new FormControl('', Validators.required);
	disableSubmitBtn = false;
	disableLikeBtn = false;
	loading = false;

	constructor(private apiService: ApiService,
				private router: Router,
				private configService: ConfigService) 
	{ }

	ngOnInit(): void {
		this.getAllCreations();
	}

	getAllCreations(): void {
		this.loading = true;

		this.apiService.get(`/followers/creations`).subscribe({
			next: (resp) => {
				this.creations = resp.data.creations;
				this.loading = false;
			},
			error: () => this.loading = false
		});
	}

	onHeaderAction(action: HeaderAction): void {
		switch(action.type) {
			case 'LayoutChange':
				this.layout = action.value;
				break;

			case 'Refresh':
				this.getAllCreations();
				break;
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

	isLiked(creation: Creation): boolean {
		if (creation.isLiked) return true;
		
		const userIdsWhoLiked = creation.creation_likes.map(user => user.userId);

		if (userIdsWhoLiked.includes(this.configService.user.userId)) {
			return true;
		}

		return false;
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
}