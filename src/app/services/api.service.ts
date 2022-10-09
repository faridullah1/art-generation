import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prediction } from '../pages/models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
	private baseUrl = environment.baseURL;

  	constructor(private http: HttpClient) {}

	post(slug: string, payload: any): Observable<Prediction> {
		console.log(this.baseUrl + slug);
		return this.http.post<Prediction>(this.baseUrl + slug, payload);
	}

	get(slug: string): Observable<any> {
		return this.http.get<any>(this.baseUrl + slug);
	}

	setPrediction(id: string): Observable<Prediction> {
		return this.http.get<Prediction>(this.baseUrl + `/${id}`);
	}
}
