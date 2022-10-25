import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '@services/api.service';


@Component({
  selector: 'app-publish-creation',
  templateUrl: './publish-creation.component.html',
  styleUrls: ['./publish-creation.component.scss']
})
export class PublishCreationComponent implements OnInit{
	creationId!: number;
	prompt!: string;

	theForm: FormGroup;
	disableSubmitBtn = false;

	constructor(private apiService: ApiService, 
				private dialogRef: MatDialogRef<PublishCreationComponent>) 
	{
		this.theForm = new FormGroup({
			title: new FormControl('', Validators.required),
			description: new FormControl('')
		});
	}

	ngOnInit(): void {
		this.theForm.get('title')?.setValue(this.prompt);
	}

	onSubmit(): void {
		this.disableSubmitBtn = true;
		const payload = this.theForm.value;
		payload.creationId = this.creationId;

		this.apiService.post('/creations/publish', payload).subscribe({
			next: (resp: any) => {
				this.disableSubmitBtn = false;
				this.dialogRef.close(resp)
			},
			error: () => this.disableSubmitBtn = false
		});
	}
}
