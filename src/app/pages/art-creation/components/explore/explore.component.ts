import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderAction, LayoutType } from 'src/app/pages/models';
import { Creation } from './../../../models';
import { ApiService } from '@services/api.service';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  	creations: Creation[] = [];
	layout: LayoutType = 'List';
	loading = false;

	constructor(private apiService: ApiService,
				private router: Router) 
	{ }

	ngOnInit(): void {
		this.getAllCreations();
	}

	getAllCreations(): void {
		this.loading = true;

		this.apiService.get(`/creations?status=Published`).subscribe({
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
}
