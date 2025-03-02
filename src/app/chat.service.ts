import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  sendMessage(text: string) {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.API_URL}/analyze`, { text });
  }
}
