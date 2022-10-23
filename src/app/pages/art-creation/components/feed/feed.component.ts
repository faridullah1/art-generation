import { Component, OnInit } from '@angular/core';
import { HeaderAction, LayoutType } from 'src/app/pages/models';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  	creations: any[] = [];
	layout: LayoutType = 'List';
	loading = false;

	constructor() { }

	ngOnInit(): void {
	}

	onHeaderAction(action: HeaderAction): void {
		switch(action.type) {
			case 'LayoutChange':
				this.layout = action.value;
				break;
		}
	}
}