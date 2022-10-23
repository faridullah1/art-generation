import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeaderAction, LayoutType } from 'src/app/pages/models';


@Component({
  selector: 'app-actions-header',
  templateUrl: './actions-header.component.html',
  styleUrls: ['./actions-header.component.scss']
})
export class ActionsHeaderComponent {
	@Output() signal = new EventEmitter<HeaderAction>();

	layout: LayoutType = 'List';
	statusFC = new FormControl('Default');
	statuses = ['Default', 'Published', 'Archived'];

	constructor() { }

	onLayoutChange(layout: LayoutType): void {
		this.signal.emit({ type: 'LayoutChange', value: layout });
	}

	onStatusChange(): void {
		this.signal.emit({ type: 'StatusChange', value: this.statusFC.value });
	}

	onRefresh(): void {
		this.signal.emit({ type: 'Refresh', value: true });
	}
}
