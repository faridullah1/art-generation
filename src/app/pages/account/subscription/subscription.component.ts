import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { SubscriptionPlan } from '../../models';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
	plans: SubscriptionPlan[] = [];
	loading = false;

	constructor(private apiService: ApiService) { }

	ngOnInit(): void {
		this.getAllPlans();
	}

	getAllPlans(): void {
		this.loading = true;

		this.apiService.get('/plans').subscribe({
			next: (resp: any) => {
				this.plans = resp.data.plans.map((plan: any) => {
					plan.benefits = plan.benefits.split(',');
					console.log(plan);
					return plan;
				});

				this.loading = false;
			},
			error: () => this.loading = false
		});
	}
}
