import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = environment.production
    ? 'https://document-analyzer-brown.vercel.app'
    : '';

  constructor(private http: HttpClient) {}

  sendMessage(text: string) {
    return this.http.post(`${this.baseUrl}/analyze`, { text });
  }
}
