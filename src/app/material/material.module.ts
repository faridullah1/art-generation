import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,

		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		MatInputModule,
		MatFormFieldModule
	],
	exports: [
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		MatInputModule,
		MatFormFieldModule
	]
})
export class MaterialModule { }
