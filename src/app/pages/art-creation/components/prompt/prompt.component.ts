import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Prediction } from 'src/app/pages/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
	prompt = new FormControl('', Validators.required);
	prediction: Prediction | null = null;
	disableCreateBtn = false;
	modelType: string = '';

	constructor(private apiService: ApiService, 
				private authService: AuthService,
				private route: ActivatedRoute,
				private router: Router) 
	{ }

	ngOnInit(): void {
		this.modelType = this.route.snapshot.params['prompt'];
	}

	onCreate(): void {
		if (!this.authService.isLoggedIn) {
			this.router.navigateByUrl('login');
			return;
		}
		
		this.disableCreateBtn = true;
		const payload = {
			prompt: this.prompt.value,
			modelType: this.modelType
		}

		this.apiService.post('/creations', payload).subscribe({
			next: () => this.router.navigateByUrl('/my-creations'),
			error: () => this.disableCreateBtn = false
		});
	}
}
