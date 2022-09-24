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

	post(prompt: string): Observable<Prediction> {
		const body = {
			input: { text: prompt, grid_size: 1 },
		}
		return this.http.post<Prediction>(this.baseUrl, body);
	}

	setPrediction(id: string): Observable<Prediction> {
		return this.http.get<Prediction>(this.baseUrl + `/${id}`);
	}
}
