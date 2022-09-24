import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';


@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [
		ToolbarComponent, 
		FooterComponent
	],
	declarations: [ 
		ToolbarComponent, 
		FooterComponent
	],
})
export class LayoutModule { }
