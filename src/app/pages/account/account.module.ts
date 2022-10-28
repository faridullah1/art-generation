import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription/subscription.component';


@NgModule({
  declarations: [
    SubscriptionComponent
  ],
  imports: [
    CommonModule,
	SharedModule,
	MaterialModule
  ]
})
export class AccountModule { }
