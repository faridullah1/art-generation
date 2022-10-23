import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  	title = 'night-cafe-clone';

	constructor(private authService: AuthService,
				private router: Router) { }

	ngOnInit(): void {
		if (!this.authService.isLoggedIn) {
			this.router.navigateByUrl('login');
		}
	}
}
