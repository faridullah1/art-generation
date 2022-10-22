import { Component, OnInit } from '@angular/core';
import { LayoutType } from 'src/app/pages/models';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  creations: any[] = [];
	layout: LayoutType = 'List';
	loading = false;
  constructor() { }

  ngOnInit(): void {
  }

  onLayoutChange(layout: LayoutType): void {
		this.layout = layout;
	}

}
