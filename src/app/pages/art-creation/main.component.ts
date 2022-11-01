import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Creation, CreationStatus, GenericApiResponse, HeaderAction, LayoutType } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { PublishCreationComponent } from './components/publish-creation/publish-creation.component';


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
	loadMore = false;

	page = 1;
	limit = 10;
	total = 0;

	constructor(private apiService: ApiService,
				private dialog: MatDialog,
				private router: Router) 
	{ }

	ngOnInit(): void {
		this.getAllCreations();
	}

	getAllCreations(loadMore = false): void {
		loadMore ? this.loadMore = true : this.loading = true;

		this.apiService.get(`/creations/mine?status=${this.status}&page=${this.page}&limit=${this.limit}`).subscribe({
			next: (resp: GenericApiResponse) => 
			{
				this.creations = [...this.creations, ...resp.data.creations];

				loadMore ? this.loadMore = false : this.loading = false;
				this.total = resp.totalRecords;
			},
			error: () => loadMore ? this.loadMore = false : this.loading = false
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
		const dialog = this.dialog.open(PublishCreationComponent, {
			width: '25%',
			panelClass: 'dlg-publish'
		});

		dialog.componentInstance.creationId = creation.creationId;
		dialog.componentInstance.prompt = creation.prompt;

		dialog.afterClosed().subscribe(resp => {
			if (resp) {
				this.creations[this.creations.indexOf(creation)] = resp.data.creation;
			}
		});
	}

	navigetToCreate(): void {
		this.router.navigateByUrl('create');
	}

	onLoadMore(): void {
		this.page ++;
		this.getAllCreations(true);
	}
}
