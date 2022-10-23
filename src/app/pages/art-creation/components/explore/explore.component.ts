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
		}
	}

	navigetToCreate(): void {
		this.router.navigateByUrl('create');
	}
}
