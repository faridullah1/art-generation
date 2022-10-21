import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LayoutType } from '../models';


@Component({
  selector: 'app-art-creation',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class ArtCreationComponent implements OnInit {
	creations: any[] = [];
	layout: LayoutType = 'List';
	loading = false;

	constructor(private apiService: ApiService) { }

	ngOnInit(): void {
		this.getAllCreations();
	}

	getAllCreations(): void {
		this.loading = true;

		this.apiService.get('/creations').subscribe({
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
}
