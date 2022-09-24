import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

	constructor(private apiService: ApiService) { }

	ngOnInit(): void {
	}

	onCreate(): void {
		this.disableCreateBtn = true;
		const prompt = this.prompt.value as string;

		this.apiService.post(prompt).subscribe({
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
		})
	}

	sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
}
