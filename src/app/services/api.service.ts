import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prediction } from '../pages/models';
import { OAuthService } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
	private baseUrl = environment.baseURL;
	private headers = new HttpHeaders();

  	constructor(private http: HttpClient, private router: Router, private oAuthService: OAuthService) {
		this.headers = this.headers.set('Authorization', 'Bearer ' + this.oAuthService.getIdToken());
	}

	post(slug: string, payload: any): Observable<Prediction> {
		return this.http.post<Prediction>(this.baseUrl + slug, payload, { headers: this.headers })
			.pipe(catchError((error) => this.handleError(error)));
	}

	get(slug: string): Observable<any> {
		return this.http.get<any>(this.baseUrl + slug, { headers: this.headers })
			.pipe(catchError((error) => this.handleError(error)));;
	}

	private handleError(err: any) {
		if (err.status === 401) this.router.navigateByUrl('login');

		return throwError(() => new Error(err.error.message));
	}
}
