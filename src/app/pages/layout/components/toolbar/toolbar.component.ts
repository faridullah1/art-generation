import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/pages/models';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
	title: string = environment.appName;
	profile!: UserProfile;
	isLoggedIn: boolean = false;
	toggleProfileMenu = false;
	showMobileMenu = false;

	constructor(private authService: AuthService, 
				private router: Router)
	{ }

	ngOnInit(): void {
		this.authService.loadUserProfile();

		this.authService.userProfileSubject.subscribe(profile => {
			this.profile = profile;
			this.isLoggedIn = this.authService.isLoggedIn;
		});
	}

	onLogin(): void {
		this.toggleProfileMenu = false;
		this.isLoggedIn ? this.authService.logout() : this.router.navigateByUrl('login');
	}

	onGotoSubscription(): void {
		this.toggleProfileMenu = false;
		this.router.navigateByUrl('subscription');
	}

	toggleMenu(ev: MouseEvent): void {
		ev.stopPropagation();
		
		this.showMobileMenu = !this.showMobileMenu;
	}
}
