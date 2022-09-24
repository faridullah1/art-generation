import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtModel } from 'src/app/pages/models';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
	models: ArtModel[] = [];

	constructor(private router: Router) {
		this.models = [
			{
				name: 'stable_diffusion',
				title: 'Stable Diffusion',
				category: 'Stable',
				type: 'text_to_image'
			},
			{
				name: 'clip_guided_diffusion',
				title: 'CLIP Guided diffusion',
				category: 'Coherent',
				type: 'text_to_image'
			},
			{
				name: 'vqgap_clip',
				title: 'VQGAN + CLIP',
				category: 'Artistic',
				type: 'text_to_image'
			}
		]
	}

	ngOnInit(): void {
	}

	onModelSelect(m: ArtModel): void {
		this.router.navigateByUrl('/login')
	}
}
