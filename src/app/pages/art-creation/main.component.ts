import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Creation, LayoutType } from '../models';


@Component({
  selector: 'app-art-creation',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class ArtCreationComponent implements OnInit {
	creations: Creation[] = [];
	layout: LayoutType = 'List';
	loading = false;
	statusFC = new FormControl('Default');
	statuses = ['Default', 'Published', 'Archived'];

	constructor(private apiService: ApiService, private router: Router) { }

	ngOnInit(): void {
		this.getAllCreations();
	}

	getAllCreations(): void {
		this.loading = true;

		this.apiService.get(`/creations?status=${this.statusFC.value}`).subscribe({
			next: (resp) => {
				this.creations = resp.data.creations;
				this.loading = false;
			},
			error: () => this.loading = false
		});
	}

	onLayoutChange(layout: LayoutType): void {
		this.layout = layout;
	}

	onPublishCreation(creation: Creation): void {
		const payload = {
			creationId: creation.creationId,
			description: 'Testing publishing'
		};

		this.apiService.post('/creations/publish', payload).subscribe({
			next: (resp: any) => creation.isPublished = resp.data.creation.isPublished
		})
	}

	navigetToCreate(): void {
		this.router.navigateByUrl('create');
	}
}
