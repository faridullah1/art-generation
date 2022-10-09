import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,

		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule
	],
	exports: [
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule
	]
})
export class MaterialModule { }
