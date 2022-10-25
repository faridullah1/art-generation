import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Creation, HeaderAction, LayoutType } from 'src/app/pages/models';
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
	loading = false;

	constructor(private apiService: ApiService,
				private router: Router) 
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
}