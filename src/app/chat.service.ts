import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  sendMessage(text: string) {
    return this.http.post(`${this.API_URL}/analyze`, { text });
  }
}
