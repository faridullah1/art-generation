import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  	title = 'night-cafe-clone';

	constructor(private apiService: ApiService,
				private authService: AuthService,
				private configService: ConfigService,
				private router: Router) 
	{ }

	ngOnInit(): void {
		if (this.authService.getToken()) {
			this.getUserInfo();
		}

		this.handleRedirect();

		if (!this.authService.isLoggedIn) {
			this.router.navigateByUrl('login');
		}
	}

	getUserInfo(): void {
		this.apiService.get('/users/me').subscribe({
			next: (resp: any) => this.configService.user = resp.data.loggedInUser
		});
	}

	handleRedirect(): void {
		const redirectUrl = localStorage.getItem('redirectUrl');
		if (redirectUrl) {
			localStorage.removeItem('redirectUrl');
			this.router.navigateByUrl(redirectUrl);
			return;
		}
	}
}
