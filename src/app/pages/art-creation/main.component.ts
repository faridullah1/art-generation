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

	constructor(private apiService: ApiService) { }

	ngOnInit(): void {
		this.getAllCreations();
	}

	getAllCreations(): void {
		this.apiService.get().subscribe({
			next: (resp) => {
				console.log(resp);
			},
			error: (error) => console.log(error)
		});
	}

	onLayoutChange(layout: LayoutType): void {

	}
}
