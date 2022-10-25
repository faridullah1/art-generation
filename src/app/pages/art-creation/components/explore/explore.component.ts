import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreationStatus, HeaderAction, LayoutType } from 'src/app/pages/models';
import { ApiService } from 'src/app/services/api.service';
import { Creation } from './../../../models';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  	creations: Creation[] = [];
	layout: LayoutType = 'List';
	loading = false;
	status: CreationStatus = 'Published';
	commentFC = new FormControl('', Validators.required);
	disableSubmitBtn = false;

	constructor(private apiService: ApiService, 
				private router: Router) 
	{ }

	ngOnInit(): void {
		this.getAllCreations();
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
		const userId = creation.user.userId;

		this.apiService.post('/follower', { userId }).subscribe({
			next: (resp: any) => {
				console.log('User is followed successfuly =', resp);
			}
		})
	}
}
