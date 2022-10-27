import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { Creation, CreationLike, HeaderAction, LayoutType, Pricing } from 'src/app/pages/models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

	priceData : Pricing[] = []
	constructor() 
	{ }
	ngOnInit(): void {

	}

}