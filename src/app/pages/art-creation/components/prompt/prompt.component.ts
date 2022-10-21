import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Prediction } from 'src/app/pages/models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
	prompt = new FormControl('Moai statue giving a TED talk', Validators.required);
	prediction: Prediction | null = null;
	disableCreateBtn = false;
	modelType: string = '';

	constructor(private apiService: ApiService, 
				private route: ActivatedRoute,
				private router: Router) 
	{ }

	ngOnInit(): void {
		this.modelType = this.route.snapshot.params['prompt'];
	}

	onCreate(): void {
		this.disableCreateBtn = true;
		const payload = {
			prompt: this.prompt.value,
			modelType: this.modelType
		}

		console.log(payload);

		this.apiService.post('/creations', payload).subscribe({
			next: (resp: any) => {
				this.router.navigateByUrl('/my-creations');
			}
		});

		// this.createModelUsingReplicate(prompt);
	}

	createModelUsingReplicate(prompt: string, payload: any): void {
		this.apiService.post(prompt, payload).subscribe({
			next: async (resp: Prediction) => {
				this.prediction = resp;
	
				while (this.prediction.status !== "succeeded" && this.prediction.status !== "failed") 
				{
					await this.sleep(2000);
	
					this.apiService.setPrediction(this.prediction.id).subscribe((resp: Prediction) => {
						this.prediction = resp;
					});
				}
	
				this.disableCreateBtn = false;
			},
			error: (error) => {
				console.error(error);
				this.disableCreateBtn = false;
			}
		});
	}

	sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
}
