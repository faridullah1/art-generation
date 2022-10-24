import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Creation, CreationStatus, HeaderAction, LayoutType } from '../models';


@Component({
  selector: 'app-art-creation',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class ArtCreationComponent implements OnInit {
	creations: Creation[] = [];
	layout: LayoutType = 'List';
	status: CreationStatus = 'Default';
	statuses = ['Default', 'Published', 'Archived'];
	loading = false;

	constructor(private apiService: ApiService, private router: Router) { }

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
		
			case 'StatusChange':
				this.status = action.value;
				this.getAllCreations();
				break;

			case 'Refresh':
				this.getAllCreations();
				break;
		}
	}

	onPublishCreation(creation: Creation): void {
		const payload = {
			creationId: creation.creationId,
			description: 'Testing publishing'
		};

		this.apiService.post('/creations/publish', payload).subscribe({
			next: (resp: any) => {
				this.creations[this.creations.indexOf(creation)] = resp.data.creation
			}
		})
	}

	navigetToCreate(): void {
		this.router.navigateByUrl('create');
	}
}
